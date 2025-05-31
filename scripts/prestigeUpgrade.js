document.addEventListener('DOMContentLoaded', function() {
    const upgradesTreeButton = document.getElementById('upgradesTreeButton');
    const upgradesTreeContainer = document.getElementById('upgradesTreeContainer');
    const closeUpgradesTreeButton = document.getElementById('closeUpgradesTree');
    const upgradesListInner = document.getElementById('upgradesListInner');
    const upgradeDescriptionContainer = document.getElementById('upgradeDescriptionContainer');
    const prestigeDisplay = document.getElementById('prestigeDisplay');

    function buyPrestigeUpgrade(upgradeId) {
        const upgrade = window.allUpgradesData.find(u => u.id === upgradeId);

        // Перевіряємо, чи покращення доступне для покупки (враховуючи залежності)
        if (!isPrestigeUpgradeAvailable(upgrade)) {
            return;
        }

        if (window.playerPrestige >= upgrade.cost) {
            window.playerPrestige -= upgrade.cost;
            upgrade.researched = true;

            if (typeof applyPrestigeUpgradeEffect === 'function') {
                applyPrestigeUpgradeEffect(upgrade.id);
            }

            if (typeof updatePrestigeDisplay === 'function') {
                updatePrestigeDisplay();
            }
            renderUpgrades();
            updatePrestigePointsDisplay();
        }
    }

    function updatePrestigeDisplay() {
        const topLeftPrestigeDisplay = document.querySelector('.top-left-container .upper-text:nth-child(5)');
        if (topLeftPrestigeDisplay) {
            topLeftPrestigeDisplay.textContent = formatPrice(playerPrestige);
        }
    }

    function renderUpgrades() {
        const upgradesListInner = document.getElementById('upgradesListInner');
        const upgradeDescriptionContainer = document.getElementById('upgradeDescriptionContainer');
        const prestigeDisplay = document.getElementById('prestigeDisplay');

        if (!upgradesListInner) return;
        upgradesListInner.innerHTML = '';
        upgradesListInner.style.flexDirection = 'row';

        const upgradesByLevel = window.allUpgradesData.reduce((acc, upgrade) => {
            acc[upgrade.level] = acc[upgrade.level] || [];
            acc[upgrade.level].push(upgrade);
            return acc;
        }, {});

        const sortedLevels = Object.keys(upgradesByLevel).sort((a, b) => parseInt(a) - parseInt(b));

        sortedLevels.forEach(level => {
            const levelContainer = document.createElement('div');
            levelContainer.classList.add('upgrade-level-column');

            upgradesByLevel[level].forEach(upgrade => {
                const upgradeElement = document.createElement('div');
                upgradeElement.classList.add('upgrade-item');

                const button = document.createElement('button');
                button.classList.add('upgrade-button');
                button.dataset.tooltipDescription = upgrade.description;
                button.dataset.tooltipCost = upgrade.cost;
                button.dataset.tooltipResearched = upgrade.researched;
                button.dataset.tooltipName = upgrade.name;
                button.dataset.upgradeId = upgrade.id;

                const available = isPrestigeUpgradeAvailable(upgrade);

                if (upgrade.researched) {
                    button.classList.add('researched');
                } else if (available) {
                    button.classList.add('available');
                } else {
                    button.classList.add('locked');
                }

                const img = document.createElement('img');
                img.src = upgrade.image;
                img.alt = upgrade.name;

                button.addEventListener('mouseover', function(event) {
                    const description = this.dataset.tooltipDescription;
                    let tooltipText = `<p>${description}</p>`;
                    const cost = parseInt(this.dataset.tooltipCost);

                    if (this.dataset.tooltipResearched === 'true') {
                        tooltipText += `<p>Вже досліджено</p>`;
                    } else if (!isNaN(cost)) {
                        tooltipText += `<p>Вартість: ${formatPrice(cost)} престижу</p>`; 
                        const currentUpgrade = window.allUpgradesData.find(u => u.id === this.dataset.upgradeId);
                        if (currentUpgrade && !isUpgradeRequirementsMet(currentUpgrade)) {
                            const missingParents = currentUpgrade.parents.filter(parentId => {
                                const parentUpgrade = window.allUpgradesData.find(u => u.id === parentId);
                                return parentUpgrade && !parentUpgrade.researched;
                            }).map(parentId => {
                                const parentUpgrade = window.allUpgradesData.find(u => u.id === parentId);
                                return parentUpgrade ? `"${parentUpgrade.name}"` : `Невідоме покращення (ID:${parentId})`;
                            });
                            if (missingParents.length > 0) {
                                tooltipText += `<p>Заблоковано</p>`;
                            }
                        }
                    }

                    upgradeDescriptionContainer.innerHTML = tooltipText;
                    upgradeDescriptionContainer.classList.add('visible');
                });

                button.addEventListener('mouseout', function() {
                    upgradeDescriptionContainer.classList.remove('visible');
                    upgradeDescriptionContainer.innerHTML = '';
                });

                button.addEventListener('click', function() {
                    const upgradeId = this.dataset.upgradeId;
                    const upgradeObject = window.allUpgradesData.find(up => up.id === upgradeId);


                    if (isPrestigeUpgradeAvailable(upgradeObject)) {
                        if (playerPrestige >= upgradeObject.cost) {
                            playerPrestige -= upgradeObject.cost;
                            upgradeObject.researched = true;

                            applyPrestigeUpgradeEffect(upgradeObject.id);
                            updatePrestigeDisplay();
                            renderUpgrades();
                        } else {
                            console.log(`Недостатньо престижу для покупки покращення "${upgradeObject.name}".`);
                        }
                    } else if (upgradeObject.researched) {
                        console.log(`Покращення "${upgradeObject.name}" вже досліджено.`);
                    } else {
                        console.log(`Покращення "${upgradeObject.name}" заблоковано.`);
                    }
                });

                button.appendChild(img);
                upgradeElement.appendChild(button);
                levelContainer.appendChild(upgradeElement);
            });

            upgradesListInner.appendChild(levelContainer);
        });

        setTimeout(drawConnections, 100);
    }

    function drawConnections() {
        const upgradesTreeContainer = document.getElementById('upgradesTreeContainer');
        const connectionsContainer = document.querySelector('#connections-container') || document.createElementNS("http://www.w3.org/2000/svg", "svg");
        connectionsContainer.id = 'connections-container';
        connectionsContainer.style.position = 'absolute';
        connectionsContainer.style.top = 0;
        connectionsContainer.style.left = 0;
        connectionsContainer.style.width = '100%';
        connectionsContainer.style.height = '100%';
        connectionsContainer.style.pointerEvents = 'none';

        connectionsContainer.innerHTML = '';

        if (!window.allUpgradesData || !Array.isArray(window.allUpgradesData)) return;

        window.allUpgradesData.forEach(childUpgrade => {
            if (childUpgrade.parents && childUpgrade.parents.length > 0) {
                const childElement = document.querySelector(`.upgrade-item button[data-upgrade-id="${childUpgrade.id}"]`);
                if (childElement) {
                    const childRect = childElement.getBoundingClientRect();
                    const childLeft = childRect.left;
                    const childCenterY = childRect.top + childRect.height / 2;

                    childUpgrade.parents.forEach(parentId => {
                        const parentElement = document.querySelector(`.upgrade-item button[data-upgrade-id="${parentId}"]`);
                        if (parentElement) {
                            const parentRect = parentElement.getBoundingClientRect();
                            const parentRight = parentRect.right;
                            const parentCenterY = parentRect.top + parentRect.height / 2;

                            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                            // Координати відносно контейнера дерева
                            line.setAttribute('x1', parentRight - upgradesTreeContainer.getBoundingClientRect().left);
                            line.setAttribute('y1', parentCenterY - upgradesTreeContainer.getBoundingClientRect().top);
                            line.setAttribute('x2', childLeft - upgradesTreeContainer.getBoundingClientRect().left);
                            line.setAttribute('y2', childCenterY - upgradesTreeContainer.getBoundingClientRect().top);

                            // Колір лінії в залежності від стану покращень
                            const parentUpgradeObject = window.allUpgradesData.find(u => u.id === parentId);
                            if (parentUpgradeObject && parentUpgradeObject.researched && childUpgrade.researched) {
                                line.setAttribute('stroke', 'green');
                            } else if (parentUpgradeObject && parentUpgradeObject.researched && !childUpgrade.researched && isUpgradeRequirementsMet(childUpgrade)) {
                                line.setAttribute('stroke', 'blue'); // Батьківський досліджений, дочірній доступний (але ще не куплений)
                            } else {
                                line.setAttribute('stroke', 'gray'); // Заблоковані або не всі вимоги виконані
                            }
                            line.setAttribute('stroke-width', '2');
                            connectionsContainer.appendChild(line);
                        }
                    });
                }
            }
        });

        if (!upgradesTreeContainer.querySelector('#connections-container')) {
            upgradesTreeContainer.appendChild(connectionsContainer);
        }
    }

    function scrollToFirstUpgrade() {
        const upgradesListInner = document.getElementById('upgradesListInner');
        if (upgradesListInner && upgradesListInner.children.length > 0) {
            const firstLevelColumn = upgradesListInner.children[0];
            if (firstLevelColumn && firstLevelColumn.children.length > 0) {
                const firstUpgradeElement = firstLevelColumn.children[0];
                const containerWidth = upgradesListInner.offsetWidth;
                const elementWidth = firstUpgradeElement.offsetWidth;

                const scrollPosition = (containerWidth / 4) - (elementWidth / 2);

                upgradesListInner.scrollLeft = Math.max(0, scrollPosition);
            } else {
                upgradesListInner.scrollLeft = 0;
            }
        } else {
            upgradesListInner.scrollLeft = 0;
        }
    }


    function isUpgradeRequirementsMet(upgrade) {
        if (!upgrade.parents || upgrade.parents.length === 0) {
            return true; // Якщо немає батьківських покращень, то вимоги виконані
        }

        // Перевіряємо, чи всі батьківські покращення (за їхніми ID) були досліджені
        return upgrade.parents.every(parentId => {
            const parentUpgrade = window.allUpgradesData.find(u => u.id === parentId);
            return parentUpgrade && parentUpgrade.researched;
        });
    }

    // Функція для перевірки, чи доступне престижне покращення для покупки
    function isPrestigeUpgradeAvailable(upgrade) {
        // Якщо покращення вже досліджене, воно не доступне для покупки
        if (upgrade.researched) {
            return false;
        }

        // Перевіряємо, чи виконані всі попередні вимоги (батьківські покращення)
        if (!isUpgradeRequirementsMet(upgrade)) {
            return false;
        }

        // Якщо воно не досліджене і вимоги виконані, воно доступне для відображення та покупки
        return true;
    }

    if (upgradesTreeButton && upgradesTreeContainer && closeUpgradesTreeButton && upgradesListInner) {
        upgradesTreeButton.addEventListener('click', function() {
            upgradesTreeContainer.style.display = 'grid';
            upgradesListInner.scrollLeft = 0;
            renderUpgrades();
            updatePrestigeDisplay();
            setTimeout(scrollToFirstUpgrade, 100);
            if (upgradesListInner) {
                upgradesListInner.addEventListener('scroll', drawConnections);
            }
        });

        closeUpgradesTreeButton.addEventListener('click', function() {
            upgradesTreeContainer.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === upgradesTreeContainer) {
                upgradesTreeContainer.style.display = 'none';
            }
        });

        updatePrestigeDisplay();
    }


});
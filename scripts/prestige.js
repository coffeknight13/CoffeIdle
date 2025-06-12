    function updatePrestigePointsDisplay() {
        const prestigePointsDisplayElement = document.querySelector('.top-left-container .upper-text:nth-child(5)');
        if (prestigePointsDisplayElement) {
            prestigePointsDisplayElement.textContent = window.playerPrestige;
        }
    }
    function updatePrestigeTotalDisplay() {
        const prestigeTotalDisplayElement = document.querySelector('.top-left-container .upper-text:nth-child(7)');
        if (prestigeTotalDisplayElement) {
            prestigeTotalDisplayElement.textContent = window.playerTotalPrestige;
        }
    }

document.addEventListener('DOMContentLoaded', function() {
    const prestigeButtonMain = document.getElementById('prestigeButtonMain');
    const prestigeModal = document.getElementById('prestigeModal');
    const closeButton = document.querySelector('.close-button');
    const prestigeModalButton = document.getElementById('prestigeButton');
    const prestigeCostDisplay = document.getElementById('prestigeCost');
    const prestigePointsDisplay = document.querySelector('.top-left-container .upper-text:nth-child(5)');
    const prestigeTotalDisplay = document.querySelector('.top-left-container .upper-text:nth-child(7)');

    function getPrestigeCost(prestigeCount) {
        const firstPrestigeCosts = [
            1000, 5000, 10000, 25000, 
            50000, 100000, 250000, 500000, 
            1000000, 2500000, 5000000, 10000000, 
            25000000, 50000000, 100000000, 250000000, 
            500000000, 1000000000, 2500000000, 5000000000, 
            10000000000, 25000000000, 50000000000, 100000000000, 
            250000000000, 500000000000, 1000000000000, 2500000000000, 
            5000000000000, 10000000000000, 25000000000000, 50000000000000, 
            100000000000000, 250000000000000, 500000000000000, 1000000000000000, 
            2500000000000000, 5000000000000000, 10000000000000000, 25000000000000000, 
            50000000000000000, 100000000000000000, 250000000000000000, 500000000000000000, 
            1000000000000000000, 2500000000000000000, 5000000000000000000, 10000000000000000000, 
            25000000000000000000, 50000000000000000000, 100000000000000000000, 250000000000000000000, 
            500000000000000000000, 1000000000000000000000, 2500000000000000000000, 5000000000000000000000, 
            10000000000000000000000, 25000000000000000000000, 50000000000000000000000, 100000000000000000000000, 
            250000000000000000000000, 500000000000000000000000, 1000000000000000000000000, 2500000000000000000000000, 
            5000000000000000000000000, 10000000000000000000000000, 25000000000000000000000000, 50000000000000000000000000, 
            100000000000000000000000000, 250000000000000000000000000, 500000000000000000000000000, 1000000000000000000000000000, 
            2500000000000000000000000000, 5000000000000000000000000000, 10000000000000000000000000000, 250000000000000000000000000000,
            50000000000000000000000000000, 100000000000000000000000000000, 2500000000000000000000000000000, 
            500000000000000000000000000000, 1000000000000000000000000000000, 25000000000000000000000000000000, 
            5000000000000000000000000000000, 10000000000000000000000000000000, 250000000000000000000000000000000, 
            50000000000000000000000000000000, 100000000000000000000000000000000, 2500000000000000000000000000000000, 
            500000000000000000000000000000000, 1000000000000000000000000000000000, 25000000000000000000000000000000000, 
            5000000000000000000000000000000000, 10000000000000000000000000000000000, 250000000000000000000000000000000000, 
            50000000000000000000000000000000000, 100000000000000000000000000000000000, 2500000000000000000000000000000000000, 
            500000000000000000000000000000000000, 1000000000000000000000000000000000000, 25000000000000000000000000000000000000,
            1e37, 1e38, 1e39

        ];

        if (prestigeCount < firstPrestigeCosts.length) {
            return firstPrestigeCosts[prestigeCount];
        } else {
            return 1e40;
        }
    }

    function updatePrestigeCostDisplay() {
        const nextPrestigeCost = getPrestigeCost(window.playerTotalPrestige);
        prestigeCostDisplay.textContent = formatPrice(nextPrestigeCost) + ' coins';
    }


    function resetMoney() {
        window.playerMoney = 10;
        updateMoneyUI();
    }

    function resetUpgrades() {
        window.coffeeTypes.forEach(coffee => {
            coffee.level = 0;
            coffee.currentPrice = coffee.basePrice * (1 - (window.upgradeCostReduction || 0));
            coffee.productionRate = 0;
            updateCoffeeUI(coffee);
        });
        window.upgradeCostReduction = 0;
        window.profitMultiplier = 1;
        window.profitBoostActive = false;
        clearTimeout(window.profitBoostTimeout);
        window.maxLevelIncrease = 0;
        const upgradesListContainer = document.getElementById('upgradesList');
        if (upgradesListContainer) {
            const researchedSpans = upgradesListContainer.querySelectorAll('.researched');
            researchedSpans.forEach(span => {
                const upgradeItem = span.parentNode;
                const upgradeId = upgradeItem.dataset.upgradeId;
                const upgradeData = window.allUpgradesData.find(u => u.id === upgradeId);
                if (upgradeData) {
                    upgradeData.researched = false;
                }
                span.remove();
                const researchButton = document.createElement('button');
                researchButton.classList.add('research-button');
                researchButton.dataset.upgradeId = upgradeId;
                researchButton.textContent = 'Дослідити';
                researchButton.addEventListener('click', function() {
                    const id = this.dataset.upgradeId;  
                    const upgrade = window.allUpgradesData.find(u => u.id === id);

                    if (upgrade && !upgrade.researched && window.playerPrestige >= upgrade.cost) {
                        window.playerPrestige -= upgrade.cost;
                        upgrade.researched = true;
                        window.applyUpgradeEffect(upgrade);
                        window.updatePrestigePointsDisplay();
                        window.updatePrestigeTotalDisplay();
                        const parent = this.parentNode;
                        this.remove();
                        const researchedSpan = document.createElement('span');
                        researchedSpan.classList.add('researched');
                        researchedSpan.textContent = 'Досліджено';
                        parent.appendChild(researchedSpan);
                        
                    }
                });
                upgradeItem.appendChild(researchButton);
            });
        }
        window.coffeeTypes.forEach(updateCoffeeUI);
    }

    if (prestigeButtonMain) {
        prestigeButtonMain.addEventListener('click', function() {
            prestigeModal.style.display = "block";
            updatePrestigeCostDisplay();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            prestigeModal.style.display = "none";
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == prestigeModal) {
            prestigeModal.style.display = "none";
        }
    });

    if (prestigeModalButton) {
        prestigeModalButton.addEventListener('click', function() {
            const currentPrestigeCost = getPrestigeCost(window.playerTotalPrestige);

            if (typeof window.playerMoney !== 'undefined' && window.playerMoney >= currentPrestigeCost) {
                window.playerMoney -= currentPrestigeCost;
                window.playerPrestige++;
                window.playerTotalPrestige++;
                updatePrestigePointsDisplay();
                updatePrestigeTotalDisplay();
                resetMoney();
                resetUpgrades();
                updatePrestigeCostDisplay();
                prestigeModal.style.display = "none";
            }
        });
    }

    function formatPrice(price) {
        if (price >= 1e15) {
            return price.toExponential(0);
        } else {
            return price.toFixed(0);
        }
    }

    updatePrestigeCostDisplay();
    updatePrestigePointsDisplay();
    updatePrestigeTotalDisplay();
    updateMoneyUI();
});
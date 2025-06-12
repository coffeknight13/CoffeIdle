document.addEventListener('DOMContentLoaded', function() {
    const loginRegisterButton = document.getElementById('loginRegisterButton');
    const loginRegisterModal = document.getElementById('loginRegisterModal');
    const loginRegisterCloseButton = loginRegisterModal.querySelector('.login-register-close-button');
    const nicknameInput = document.getElementById('nicknameInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const authMessage = document.getElementById('authMessage');

    // Функція для оновлення тексту кнопки Вхід/Вихід
    function updateAuthButtonUI() {
        if (loginRegisterButton) {
            if (window.isAuthenticated) {
                loginRegisterButton.textContent = 'Вихід';

            } else {
                loginRegisterButton.textContent = 'Вхід/Реєстрація';

            }
        }
    }

    function openLoginRegisterModal() {
        loginRegisterModal.style.display = 'flex';
        authMessage.textContent = '';
        nicknameInput.value = '';
        passwordInput.value = '';
    }

    function closeLoginRegisterModal() {
        loginRegisterModal.style.display = 'none';
    }

    // Допоміжна функція для обробки успішного входу
    async function handleLoginSuccess(userData) {
        window.userNickname = userData.nickname;
        window.isAuthenticated = true;

        window.playerMoney = userData.coins;
        window.playerPrestige = userData.prestigePoints;
        window.playerTotalPrestige = userData.prestigeLevel;

        // Завантаження та оновлення даних для allUpgradesData
        if (window.allUpgradesData && Array.isArray(window.allUpgradesData) && userData.upgradesPurchased) {
            window.allUpgradesData.forEach(upgrade => {
                if (userData.upgradesPurchased.hasOwnProperty(upgrade.id)) {
                    upgrade.researched = userData.upgradesPurchased[upgrade.id];
                } else {
                    upgrade.researched = false;
                }
            });

            // Завантаження покращень з дерева покращень
            window.allUpgradesData.forEach(upgrade => {
                if (upgrade.researched) {
                    if (typeof window.applyUpgradeEffect === 'function') {
                        window.applyUpgradeEffect(upgrade);
                    }
                }
            });
        }

        // Завантаження та оновлення даних для coffeeTypes
        if (window.coffeeTypes && Array.isArray(window.coffeeTypes) && userData.coffeeUpgradesCount) {
            window.coffeeTypes.forEach(coffee => {
                const savedCoffeeData = userData.coffeeUpgradesCount[coffee.name];

                if (savedCoffeeData) {
                    coffee.level = savedCoffeeData.level;
                    coffee.currentPrice = savedCoffeeData.currentPrice;
                    coffee.productionRate = savedCoffeeData.productionRate;
                    coffee.unlocked = savedCoffeeData.unlocked;
                } else {
                    coffee.level = 0;
                    coffee.currentPrice = coffee.basePrice;
                    coffee.productionRate = 0;
                    coffee.unlocked = (coffee.name === "Bicerin");
                }
                if (typeof updateCoffeeUI === 'function') {
                    updateCoffeeUI(coffee);
                }
            });
        }

        // Оновлення основних UI елементів
        if (typeof updateMoneyUI === 'function') updateMoneyUI();
        if (typeof updatePrestigePointsDisplay === 'function') updatePrestigePointsDisplay();
        if (typeof updatePrestigeTotalDisplay === 'function') updatePrestigeTotalDisplay();

        // Запуск автозбереження
        if (window.startAutoSave) {
            window.startAutoSave();
        }

        updateAuthButtonUI();
        closeLoginRegisterModal();
    }

    // Функція для виходу з акаунту
    function handleLogout() {
        // Очистити дані сесії/авторизації на клієнті
        window.isAuthenticated = false;
        window.userNickname = null;
        if (window.stopAutoSave) {
            window.stopAutoSave();
        }
        location.reload(); 
    }

    // Реєстрація
    async function handleRegistration() {
        const nickname = nicknameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!nickname || !password) {
            authMessage.textContent = 'Будь ласка, введіть нікнейм та пароль.';
            authMessage.classList.remove('success');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname, password })
            });

            const result = await response.json();

            if (result.success) {
                authMessage.textContent = result.message + ' Тепер ви можете увійти.';
                authMessage.classList.add('success');
                nicknameInput.value = '';
                passwordInput.value = '';
            } else {
                authMessage.textContent = result.message;
                authMessage.classList.remove('success');
            }
        } catch (error) {
            authMessage.textContent = 'Помилка реєстрації. Спробуйте ще раз.';
            authMessage.classList.remove('success');
        }
    }

    // Вхід
    async function handleLogin() {
        const nickname = nicknameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!nickname || !password) {
            authMessage.textContent = 'Будь ласка, введіть нікнейм та пароль.';
            authMessage.classList.remove('success');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname, password })
            });

            const result = await response.json();

            if (result.success) {
                authMessage.textContent = result.message;
                authMessage.classList.add('success');
                await handleLoginSuccess(result.playerData);

            } else {
                authMessage.textContent = result.message;
                authMessage.classList.remove('success');
            }
        } catch (error) {
            authMessage.textContent = 'Помилка входу. Спробуйте ще раз.';
            authMessage.classList.remove('success');
        }
    }

    // Слухачі подій
    if (loginRegisterButton) {
        loginRegisterButton.addEventListener('click', function() {
            if (window.isAuthenticated) {
                handleLogout();
            } else {
                openLoginRegisterModal();
            }
        });
    }
    
    if (loginRegisterCloseButton) {
        loginRegisterCloseButton.addEventListener('click', closeLoginRegisterModal);
    }
    if (loginRegisterModal) {
        window.addEventListener('click', function(event) {
            if (event.target === loginRegisterModal) {
                closeLoginRegisterModal();
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', handleRegistration);
    }
    updateAuthButtonUI();
});

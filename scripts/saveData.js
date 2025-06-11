let saveIntervalId = null;

// Асинхронна функція для збереження данных гри на сервер.
async function saveGame() {
    if (!window.isAuthenticated || !window.userNickname) {
        return;
    }
    const coffeeUpgradesCountForSave = {};
    if (window.coffeeTypes && Array.isArray(window.coffeeTypes)) {
        window.coffeeTypes.forEach(coffee => {
            if (coffee && typeof coffee.name === 'string') {
                coffeeUpgradesCountForSave[coffee.name] = {
                    level: coffee.level || 0,
                    currentPrice: coffee.currentPrice || coffee.basePrice || 0,
                    productionRate: coffee.productionRate || 0,
                    unlocked: coffee.unlocked !== undefined ? coffee.unlocked : false
                };
            }
        });
    }

    const upgradesPurchasedForSave = {};
    if (window.allUpgradesData && Array.isArray(window.allUpgradesData)) {
        window.allUpgradesData.forEach(upgrade => {
            if (upgrade && typeof upgrade.id === 'string') {
                upgradesPurchasedForSave[upgrade.id] = upgrade.researched !== undefined ? upgrade.researched : false;
            }
        });
    }

    const playerDataToSave = {
        nickname: window.userNickname,
        playerMoney: window.playerMoney,
        playerPrestige: window.playerPrestige,
        playerTotalPrestige: window.playerTotalPrestige,
        coffeeTypes: coffeeUpgradesCountForSave,
        allUpgradesData: upgradesPurchasedForSave
    };

    try {
        const response = await fetch('/api/save-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerDataToSave)
        });

        if (response.ok) {
            const result = await response.json();
        } else {
            const errorText = await response.text();

            if (response.status === 401) {
                stopAutoSave();
            }
        }
    } catch (error) {
        console.error('Автозбереження: помилка під час запросу на збереження гри:', error);
    }
}

// Функція автозбережння кожні 30 секунд
function startAutoSave() {
    if (saveIntervalId) {
        clearInterval(saveIntervalId);
    }
    saveGame();
    saveIntervalId = setInterval(saveGame, 30 * 1000);

}

function stopAutoSave() {
    if (saveIntervalId) {
        clearInterval(saveIntervalId);
        saveIntervalId = null;
    }
}

window.startAutoSave = startAutoSave;
window.stopAutoSave = stopAutoSave;

window.addEventListener('beforeunload', () => {
    saveGame();
});

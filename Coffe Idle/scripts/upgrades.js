const coffeeTypes = [
    {
        name: 'Bicerin',
        buttonSelector: '.game-container .inner-container:nth-child(1) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(1) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(1) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(1) .item-level',
        level: 0,
        basePrice: 10,
        currentPrice: 10,
        productionRate: 0,
        productionBaseRate: 1,
        index: 0,
        unlocked: true,
        maxLevel: 25
    },
    {
        name: 'Morocchino',
        buttonSelector: '.game-container .inner-container:nth-child(2) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(2) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(2) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(2) .item-level',
        level: 0,
        basePrice: 100,
        currentPrice: 100,
        productionRate: 0,
        productionBaseRate: 10,
        index: 1,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Glace',
        buttonSelector: '.game-container .inner-container:nth-child(3) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(3) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(3) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(3) .item-level',
        level: 0,
        basePrice: 1000,
        currentPrice: 1000,
        productionRate: 0,
        productionBaseRate: 100,
        index: 2,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'MeadRaf',
        buttonSelector: '.game-container .inner-container:nth-child(4) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(4) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(4) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(4) .item-level',
        level: 0,
        basePrice: 10000,
        currentPrice: 10000,
        productionRate: 0,
        productionBaseRate: 1000,
        index: 3,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Romano',
        buttonSelector: '.game-container .inner-container:nth-child(5) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(5) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(5) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(5) .item-level',
        level: 0,
        basePrice: 100000,
        currentPrice: 100000,
        productionRate: 0,
        productionBaseRate: 10000,
        index: 4,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'RafCoffe',
        buttonSelector: '.game-container .inner-container:nth-child(6) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(6) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(6) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(6) .item-level',
        level: 0,
        basePrice: 1000000,
        currentPrice: 1000000,
        productionRate: 0,
        productionBaseRate: 100000,
        index: 5,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Fredo',
        buttonSelector: '.game-container .inner-container:nth-child(7) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(7) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(7) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(7) .item-level',
        level: 0,
        basePrice: 10000000,
        currentPrice: 10000000,
        productionRate: 0,
        productionBaseRate: 1000000,
        index: 6,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'LatteMacchiato',
        buttonSelector: '.game-container .inner-container:nth-child(8) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(8) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(8) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(8) .item-level',
        level: 0,
        basePrice: 100000000,
        currentPrice: 100000000,
        productionRate: 0,
        productionBaseRate: 10000000,
        index: 7,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Breve',
        buttonSelector: '.game-container .inner-container:nth-child(9) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(9) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(9) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(9) .item-level',
        level: 0,
        basePrice: 1000000000,
        currentPrice: 1000000000,
        productionRate: 0,
        productionBaseRate: 100000000,
        index: 8,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'ConPanna',
        buttonSelector: '.game-container .inner-container:nth-child(10) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(10) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(10) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(10) .item-level',
        level: 0,
        basePrice: 10000000000,
        currentPrice: 10000000000,
        productionRate: 0,
        productionBaseRate: 1000000000,
        index: 9,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Latte',
        buttonSelector: '.game-container .inner-container:nth-child(11) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(11) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(11) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(11) .item-level',
        level: 0,
        basePrice: 100000000000,
        currentPrice: 100000000000,
        productionRate: 0,
        productionBaseRate: 10000000000,
        index: 10,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Macchiato',
        buttonSelector: '.game-container .inner-container:nth-child(12) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(12) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(12) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(12) .item-level',
        level: 0,
        basePrice: 1000000000000,
        currentPrice: 1000000000000,
        productionRate: 0,
        productionBaseRate: 100000000000,
        index: 11,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Cappuccino',
        buttonSelector: '.game-container .inner-container:nth-child(13) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(13) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(13) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(13) .item-level',
        level: 0,
        basePrice: 10000000000000,
        currentPrice: 10000000000000,
        productionRate: 0,
        productionBaseRate: 1000000000000,
        index: 12,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'FlatWhite',
        buttonSelector: '.game-container .inner-container:nth-child(14) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(14) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(14) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(14) .item-level',
        level: 0,
        basePrice: 100000000000000,
        currentPrice: 100000000000000,
        productionRate: 0,
        productionBaseRate: 10000000000000,
        index: 13,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Americano',
        buttonSelector: '.game-container .inner-container:nth-child(15) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(15) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(15) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(15) .item-level',
        level: 0,
        basePrice: 1000000000000000,
        currentPrice: 1000000000000000,
        productionRate: 0,
        productionBaseRate: 100000000000000,
        index: 14,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Lungo',
        buttonSelector: '.game-container .inner-container:nth-child(16) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(16) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(16) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(16) .item-level',
        level: 0,
        basePrice: 10000000000000000,
        currentPrice: 10000000000000000,
        productionRate: 0,
        productionBaseRate: 1000000000000000,
        index: 15,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Ritretto',
        buttonSelector: '.game-container .inner-container:nth-child(17) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(17) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(17) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(17) .item-level',
        level: 0,
        basePrice: 100000000000000000,
        currentPrice: 100000000000000000,
        productionRate: 0,
        productionBaseRate: 10000000000000000,
        index: 16,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Tripplo',
        buttonSelector: '.game-container .inner-container:nth-child(18) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(18) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(18) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(18) .item-level',
        level: 0,
        basePrice: 1000000000000000000,
        currentPrice: 1000000000000000000,
        productionRate: 0,
        productionBaseRate: 100000000000000000,
        index: 17,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Doppio',
        buttonSelector: '.game-container .inner-container:nth-child(19) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(19) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(19) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(19) .item-level',
        level: 0,
        basePrice: 10000000000000000000,
        currentPrice: 10000000000000000000,
        productionRate: 0,
        productionBaseRate: 1000000000000000000,
        index: 18,
        unlocked: false,
        maxLevel: 25
    },
    {
        name: 'Espresso',
        buttonSelector: '.game-container .inner-container:nth-child(20) .inner-button',
        priceDisplaySelector: '.game-container .inner-container:nth-child(20) .item-price',
        productionRateDisplaySelector: '.game-container .inner-container:nth-child(20) .production-rate',
        levelDisplaySelector: '.game-container .inner-container:nth-child(20) .item-level',
        level: 0,
        basePrice: 100000000000000000000,
        currentPrice: 100000000000000000000,
        productionRate: 0,
        productionBaseRate: 10000000000000000000,
        index: 19,
        unlocked: false,
        maxLevel: 25
    }
];

function updateCoffeeUI(coffee) {
    const container = document.querySelector(coffee.buttonSelector)?.closest('.inner-container');
    const button = document.querySelector(coffee.buttonSelector);
    const priceDisplay = document.querySelector(coffee.priceDisplaySelector);
    const productionRateDisplay = document.querySelector(coffee.productionRateDisplaySelector);
    const levelDisplay = document.querySelector(coffee.levelDisplaySelector);

    if (container) {
        container.style.display = coffee.unlocked ? 'flex' : 'none';
    }

    if (coffee.unlocked) {
        priceDisplay.textContent = formatPrice(coffee.currentPrice * (1 - (window.upgradeCostReduction || 0)));
        productionRateDisplay.textContent = formatPrice(coffee.productionRate) + ' / с';
        levelDisplay.textContent = `(Рівень ${coffee.level}/${coffee.maxLevel + (window.maxLevelIncrease || 0)})`;

        if (coffee.level >= coffee.maxLevel + (window.maxLevelIncrease || 0)) {
            button.disabled = true;
            button.textContent = 'Максимум';
        } else {
            button.disabled = false;
            button.textContent = 'Покращити';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    function buyCoffeeUpgrade(coffee) {
        if (coffee.level < coffee.maxLevel + (window.maxLevelIncrease || 0)) {
            if (playerMoney >= coffee.currentPrice) {
                playerMoney -= coffee.currentPrice;
                coffee.level++;
                coffee.productionRate = coffee.level * coffee.productionBaseRate;
                coffee.currentPrice *= 1.1; // Підвищення на 10%

                updateMoneyUI();
                updateCoffeeUI(coffee);
            }
        }
    }

    coffeeTypes.forEach(coffee => {
        const button = document.querySelector(coffee.buttonSelector);
        if (button) {
            button.addEventListener('click', () => buyCoffeeUpgrade(coffee));
        }
        updateCoffeeUI(coffee);
    });

    function gameTick() {
        coffeeTypes.forEach(coffee => {
            playerMoney += coffee.productionRate;
        });
        updateMoneyUI();
    }

    setInterval(gameTick, 1000);
});


function updateMoneyUI() {
    const moneyDisplay = document.querySelector('.top-left-container .upper-text:nth-child(3)');
    if (moneyDisplay) {
        moneyDisplay.textContent = formatPrice(playerMoney);
    }
}

function formatPrice(price) {
    if (price >= 1e15) {
        return price.toExponential(0);
    } else {
        return price.toFixed(0);
    }
}
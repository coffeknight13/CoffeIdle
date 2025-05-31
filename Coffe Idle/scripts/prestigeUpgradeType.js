function applyPrestigeUpgradeEffect(upgradeId) {
    switch (upgradeId) {
        // Нові типи кави
        case '1':
            unlockNewCoffee('Morocchino');
            break;
        case '5':
            unlockNewCoffee('Glace');
            break;
        case '9':
            unlockNewCoffee('MeadRaf');
            break;
        case '13':
            unlockNewCoffee('Romano');
            break;
        case '17':
            unlockNewCoffee('RafCoffe');
            break;
        case '21':
            unlockNewCoffee('Fredo');
            break;
        case '25':
            unlockNewCoffee('LatteMacchiato');
            break;
        case '29':
            unlockNewCoffee('Breve');
            break;
        case '33':

            unlockNewCoffee('ConPanna');
            break;
        case '37':
            unlockNewCoffee('Latte');
            break;
        case '41':
            unlockNewCoffee('Macchiato');
            break;
        case '45':
            unlockNewCoffee('Cappuccino');
            break;
        case '49':
            unlockNewCoffee('FlatWhite');
            break;
        case '53':
            unlockNewCoffee('Americano');
            break;
        case '57':
            unlockNewCoffee('Lungo');
            break;
        case '61':
            unlockNewCoffee('Ritretto');
            break;
        case '65':
            unlockNewCoffee('Tripplo');
            break;
        case '69':
            unlockNewCoffee('Doppio');
            break;
        case '73':
            unlockNewCoffee('Espresso');
            break;

        // Збільшення максимального рівня на 25 для конкретних типів кави
        case '4':
            increaseMaxLevelForCoffee('Bicerin', 25);
            increaseMaxLevelForCoffee('Morocchino', 25);
            break;
        case '8':
            increaseMaxLevelForCoffee('Glace', 25);
            break;
        case '12':
            increaseMaxLevelForCoffee('MeadRaf', 25);
            break;
        case '16':
            increaseMaxLevelForCoffee('Romano', 25);
            break;
        case '20':
            increaseMaxLevelForCoffee('RafCoffe', 25);
            break;
        case '24':
            increaseMaxLevelForCoffee('Fredo', 25);
            break;
        case '28':
            increaseMaxLevelForCoffee('LatteMacchiato', 25);
            break;
        case '32':
            increaseMaxLevelForCoffee('Breve', 25);
            break;
        case '36':
            increaseMaxLevelForCoffee('ConPanna', 25);
            break;
        case '40':
            increaseMaxLevelForCoffee('Latte', 25);
            break;
        case '44':
            increaseMaxLevelForCoffee('Macchiato', 25);
            break;
        case '48':
            increaseMaxLevelForCoffee('Cappuccino', 25);
            break;
        case '52':
            increaseMaxLevelForCoffee('FlatWhite', 25);
            break;
        case '56':
            increaseMaxLevelForCoffee('Americano', 25);
            break;
        case '60':
            increaseMaxLevelForCoffee('Lungo', 25);
            break;
        case '64':
            increaseMaxLevelForCoffee('Ritretto', 25);
            break;
        case '68':
            increaseMaxLevelForCoffee('Tripplo', 25);
            break;
        case '72':
            increaseMaxLevelForCoffee('Doppio', 25);
            break;
        case '76':
            increaseMaxLevelForCoffee('Espresso', 25);
            break;

        // Знижка на покращення
        case '2':
        case '6':
        case '10':
        case '14':
        case '18':
        case '22':
        case '26':
        case '30':
        case '34':
        case '38':
            console.log('Ефект: Вартість покращень кави знижено на 5%.');
            coffeeTypes.forEach(coffee => {
                coffee.basePrice *= 0.95;
                coffee.currentPrice *= 0.95;
                const priceDisplay = document.querySelector(coffee.priceDisplaySelector);
                if (priceDisplay) {
                    priceDisplay.textContent = formatPrice(coffee.currentPrice);
                }
            });
            break;

        case '42':
        case '46':
        case '50':
        case '54':
        case '58':
        case '62':
        case '66':
        case '70':
        case '74':
            console.log('Ефект: Вартість покращень кави знижено на 10%.');
            coffeeTypes.forEach(coffee => {
                coffee.basePrice *= 0.90;
                coffee.currentPrice *= 0.90;
                const priceDisplay = document.querySelector(coffee.priceDisplaySelector);
                if (priceDisplay) {
                    priceDisplay.textContent = formatPrice(coffee.currentPrice);
                }
            });
            break;

        case '77':
        case '80':
        case '83':
        case '86':
        case '89':
        case '92':
        case '95':
        case '98':
            console.log('Ефект: Вартість покращень кави знижено на 25%.');
            coffeeTypes.forEach(coffee => {
                coffee.basePrice *= 0.75;
                coffee.currentPrice *= 0.75;
                const priceDisplay = document.querySelector(coffee.priceDisplaySelector);
                if (priceDisplay) {
                    priceDisplay.textContent = formatPrice(coffee.currentPrice);
                }
            });
            break;

        case '3':
        case '7':
        case '11':
        case '15':
        case '19':
        case '23':
        case '27':
        case '31':
        case '35':
        case '39':
        case '43':
        case '47':
        case '51':
        case '55':
        case '59':
        case '63':
        case '67':
        case '71':
        case '75':
            console.log('Ефект: Прибуток від усієї кави збільшено в 2 рази.');
            coffeeTypes.forEach(coffee => {
                coffee.productionBaseRate *= 2;
                if (coffee.level > 0) {
                    coffee.productionRate = coffee.productionBaseRate * coffee.level;
                    const productionDisplay = document.querySelector(coffee.productionRateDisplaySelector);
                    if (productionDisplay) {
                        productionDisplay.textContent = coffee.productionRate.toFixed(2);
                    }
                }
            });
            break;

        case '78':
        case '81':
        case '84':
        case '87':
        case '90':
        case '93':
        case '96':
        case '99':
            console.log('Ефект: Прибуток від усієї кави збільшено в 10 разів.');
            coffeeTypes.forEach(coffee => {
                coffee.productionBaseRate *= 10;
                if (coffee.level > 0) {
                    coffee.productionRate = coffee.productionBaseRate * coffee.level;
                    const productionDisplay = document.querySelector(coffee.productionRateDisplaySelector);
                    if (productionDisplay) {
                        productionDisplay.textContent = coffee.productionRate.toFixed(2);
                    }
                }
            });
            break;



        // Збільшення максимального рівня на 25 для всіх типів кави
        case '79':
        case '82':
        case '85':
        case '88':
        case '91':
        case '94':
        case '97':
            console.log('Ефект: Максимальний рівень для всієї кави збільшено на 25.');
            coffeeTypes.forEach(coffee => {
                coffee.maxLevel += 25;
                const levelDisplay = document.querySelector(coffee.levelDisplaySelector);
                if (levelDisplay) {
                    levelDisplay.textContent = coffee.level + '/' + coffee.maxLevel;
                }
            });
            break;

        // Максимальний рівень всіх видів кави = 500
        case '100':
            console.log('Ефект: Максимальний рівень для всієї кави встановлено на 500.');
            coffeeTypes.forEach(coffee => {
                coffee.maxLevel = 500;
                const levelDisplay = document.querySelector(coffee.levelDisplaySelector);
                if (levelDisplay) {
                    levelDisplay.textContent = coffee.level + '/' + coffee.maxLevel;
                }
            });
            break;

        default:
            console.warn(`Невідомий ID покращення: ${upgradeId}`);
            break;
    }
}

function findCoffeeByName(coffeeName) {
    for (let i = 0; i < coffeeTypes.length; i++) {
        if (coffeeTypes[i].name === coffeeName) {
            return coffeeTypes[i];
        }
    }
    return null;
}

function unlockNewCoffee(coffeeName) {
    console.log(`Ефект: Розблоковано вид кави "${coffeeName}".`);
    const coffeeToUnlock = findCoffeeByName(coffeeName);
    if (coffeeToUnlock) {
        if (!coffeeToUnlock.unlocked) {
            coffeeToUnlock.unlocked = true;
            console.log(`${coffeeName} розблоковано.`);
            updateCoffeeUI(coffeeToUnlock);
        } else {
            console.log(`Вид кави "${coffeeName}" вже розблоковано.`);
        }
    }
}

function increaseMaxLevelForCoffee(coffeeName, amount) {
    const targetCoffee = findCoffeeByName(coffeeName);
    if (targetCoffee) {
        targetCoffee.maxLevel += amount;
        const levelDisplay = document.querySelector(targetCoffee.levelDisplaySelector);
        if (levelDisplay) {
            levelDisplay.textContent = targetCoffee.level + '/' + targetCoffee.maxLevel;
        }
        console.log(`Ефект: Максимальний рівень для "${coffeeName}" збільшено на ${amount}.`);
    }
}
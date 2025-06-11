window.allUpgradesData = [
        {
            id: "1",
            name: "Відкрити Morocchino",
            level: 1,
            image: "img/TypeCoffe/Morocchino.png",
            description: "Дозволяє виробляти каву Morocchino.",
            cost: 1,
            researched: false
        },
        {
            id: "2",
            name: "Економія на сировині 1",
            level: 2,
            parents: ["1"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "3",
            name: "Збільшення прибутку 1",
            level: 2,
            parents: ["1"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "4",
            name: "Розширення лімітів 1",
            level: 2,
            parents: ["1"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Bicerin та Morocchino на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "5",
            name: "Відкрити Glace",
            level: 3,
            parents: ["2", "3", "4"],
            image: "img/TypeCoffe/Glace.png",
            description: "Дозволяє виробляти каву Glace.",
            cost: 1,
            researched: false
        },
        {
            id: "6",
            name: "Економія на сировині 2",
            level: 4,
            parents: ["5"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "7",
            name: "Збільшення прибутку 2",
            level: 4,
            parents: ["5"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "8",
            name: "Розширення лімітів 2",
            level: 4,
            parents: ["5"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Glace на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "9",
            name: "Відкрити MeadRaf",
            level: 5,
            parents: ["6", "7", "8"],
            image: "img/TypeCoffe/MeadRaf.png",
            description: "Дозволяє виробляти каву MeadRaf.",
            cost: 1,
            researched: false
        },
        {
            id: "10",
            name: "Економія на сировині 3",
            level: 6,
            parents: ["9"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "11",
            name: "Збільшення прибутку 3",
            level: 6,
            parents: ["9"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "12",
            name: "Розширення лімітів 3",
            level: 6,
            parents: ["9"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень MeadRaf на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "13",
            name: "Відкрити Romano",
            level: 7,
            parents: ["10", "11", "12"],
            image: "img/TypeCoffe/Romano.png",
            description: "Дозволяє виробляти каву Romano.",
            cost: 1,
            researched: false
        },
        {
            id: "14",
            name: "Економія на сировині 4",
            level: 8,
            parents: ["13"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "15",
            name: "Збільшення прибутку 4",
            level: 8,
            parents: ["13"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "16",
            name: "Розширення лімітів 4",
            level: 8,
            parents: ["13"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Romano на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "17",
            name: "Відкрити RafCoffe",
            level: 9,
            parents: ["14", "15", "16"],
            image: "img/TypeCoffe/RafCoffe.png",
            description: "Дозволяє виробляти каву RafCoffe.",
            cost: 1,
            researched: false
        },
        {
            id: "18",
            name: "Економія на сировині 5",
            level: 10,
            parents: ["17"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "19",
            name: "Збільшення прибутку 5",
            level: 10,
            parents: ["17"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "20",
            name: "Розширення лімітів 5",
            level: 10,
            parents: ["17"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень RafCoffe на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "21",
            name: "Відкрити Fredo",
            level: 11,
            parents: ["18", "19", "20"],
            image: "img/TypeCoffe/Fredo.png",
            description: "Дозволяє виробляти каву Fredo.",
            cost: 1,
            researched: false
        },
        {
            id: "22",
            name: "Економія на сировині 6",
            level: 12,
            parents: ["21"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "23",
            name: "Збільшення прибутку 6",
            level: 12,
            parents: ["21"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "24",
            name: "Розширення лімітів 6",
            level: 12,
            parents: ["21"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Fredo на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "25",
            name: "Відкрити LatteMacchiato",
            level: 13,
            parents: ["22", "23", "24"],
            image: "img/TypeCoffe/LatteMacchiato.png",
            description: "Дозволяє виробляти каву LatteMacchiato.",
            cost: 1,
            researched: false
        },
        {
            id: "26",
            name: "Економія на сировині 7",
            level: 14,
            parents: ["25"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "27",
            name: "Збільшення прибутку 7",
            level: 14,
            parents: ["25"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "28",
            name: "Розширення лімітів 7",
            level: 14,
            parents: ["25"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень LatteMacchiato на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "29",
            name: "Відкрити Breve",
            level: 15,
            parents: ["26", "27", "28"],
            image: "img/TypeCoffe/Breve.png",
            description: "Дозволяє виробляти каву Breve.",
            cost: 1,
            researched: false
        },
        {
            id: "30",
            name: "Економія на сировині 8",
            level: 16,
            parents: ["29"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "31",
            name: "Збільшення прибутку 8",
            level: 16,
            parents: ["29"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "32",
            name: "Розширення лімітів 8",
            level: 16,
            parents: ["29"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Breve на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "33",
            name: "Відкрити ConPanna",
            level: 17,
            parents: ["30", "31", "32"],
            image: "img/TypeCoffe/ConPanna.png",
            description: "Дозволяє виробляти каву ConPanna.",
            cost: 1,
            researched: false
        },
        {
            id: "34",
            name: "Економія на сировині 9",
            level: 18,
            parents: ["33"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "35",
            name: "Збільшення прибутку 9",
            level: 18,
            parents: ["33"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "36",
            name: "Розширення лімітів 9",
            level: 18,
            parents: ["33"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень ConPanna на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "37",
            name: "Відкрити Latte",
            level: 19,
            parents: ["34", "35", "36"],
            image: "img/TypeCoffe/Latte.png",
            description: "Дозволяє виробляти каву Latte.",
            cost: 1,
            researched: false
        },
        {
            id: "38",
            name: "Економія на сировині 10",
            level: 20,
            parents: ["37"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 5%.",
            cost: 1,
            researched: false
        },
        {
            id: "39",
            name: "Збільшення прибутку 10",
            level: 20,
            parents: ["37"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "40",
            name: "Розширення лімітів 10",
            level: 20,
            parents: ["37"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Latte на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "41",
            name: "Відкрити Macchiato",
            level: 21,
            parents: ["38", "39", "40"],
            image: "img/TypeCoffe/Macchiato.png",
            description: "Дозволяє виробляти каву Macchiato.",
            cost: 1,
            researched: false
        },
        {
            id: "42",
            name: "Економія на сировині 11",
            level: 22,
            parents: ["41"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "43",
            name: "Збільшення прибутку 11",
            level: 22,
            parents: ["41"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "44",
            name: "Розширення лімітів 11",
            level: 22,
            parents: ["41"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Macchiato на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "45",
            name: "Відкрити Cappuccino",
            level: 23,
            parents: ["42", "43", "44"],
            image: "img/TypeCoffe/Cappuccino.png",
            description: "Дозволяє виробляти каву Cappuccino.",
            cost: 1,
            researched: false
        },
        {
            id: "46",
            name: "Економія на сировині 12",
            level: 24,
            parents: ["45"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "47",
            name: "Збільшення прибутку 12",
            level: 24,
            parents: ["45"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "48",
            name: "Розширення лімітів 12",
            level: 24,
            parents: ["45"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Cappuccino на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "49",
            name: "Відкрити FlatWhite",
            level: 25,
            parents: ["46", "47", "48"],
            image: "img/TypeCoffe/FlatWhite.png",
            description: "Дозволяє виробляти каву FlatWhite.",
            cost: 1,
            researched: false
        },
        {
            id: "50",
            name: "Економія на сировині 13",
            level: 26,
            parents: ["49"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "51",
            name: "Збільшення прибутку 13",
            level: 26,
            parents: ["49"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "52",
            name: "Розширення лімітів 13",
            level: 26,
            parents: ["49"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень FlatWhite на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "53",
            name: "Відкрити Americano",
            level: 27,
            parents: ["50", "51", "52"],
            image: "img/TypeCoffe/Americano.png",
            description: "Дозволяє виробляти каву Americano.",
            cost: 1,
            researched: false
        },
        {
            id: "54",
            name: "Економія на сировині 14",
            level: 28,
            parents: ["53"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "55",
            name: "Збільшення прибутку 14",
            level: 28,
            parents: ["53"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "56",
            name: "Розширення лімітів 14",
            level: 28,
            parents: ["53"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Americano на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "57",
            name: "Відкрити Lungo",
            level: 29,
            parents: ["54", "55", "56"],
            image: "img/TypeCoffe/Lungo.png",
            description: "Дозволяє виробляти каву Lungo.",
            cost: 1,
            researched: false
        },
        {
            id: "58",
            name: "Економія на сировині 15",
            level: 30,
            parents: ["57"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "59",
            name: "Збільшення прибутку 15",
            level: 30,
            parents: ["57"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "60",
            name: "Розширення лімітів 15",
            level: 30,
            parents: ["57"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Lungo на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "61",
            name: "Відкрити Ritretto",
            level: 31,
            parents: ["58", "59", "60"],
            image: "img/TypeCoffe/Ritretto.png",
            description: "Дозволяє виробляти каву Ritretto.",
            cost: 1,
            researched: false
        },
        {
            id: "62",
            name: "Економія на сировині 16",
            level: 32,
            parents: ["61"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "63",
            name: "Збільшення прибутку 16",
            level: 32,
            parents: ["61"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "64",
            name: "Розширення лімітів 16",
            level: 32,
            parents: ["61"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Ritretto на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "65",
            name: "Відкрити Tripplo",
            level: 33,
            parents: ["62", "63", "64"],
            image: "img/TypeCoffe/Tripplo.png",
            description: "Дозволяє виробляти каву Tripplo.",
            cost: 1,
            researched: false
        },
        {
            id: "66",
            name: "Економія на сировині 17",
            level: 34,
            parents: ["65"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "67",
            name: "Збільшення прибутку 17",
            level: 34,
            parents: ["65"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "68",
            name: "Розширення лімітів 17",
            level: 34,
            parents: ["65"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Tripplo на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "69",
            name: "Відкрити Doppio",
            level: 35,
            parents: ["66", "67", "68"],
            image: "img/TypeCoffe/Doppio.png",
            description: "Дозволяє виробляти каву Doppio.",
            cost: 1,
            researched: false
        },
        {
            id: "70",
            name: "Економія на сировині 18",
            level: 36,
            parents: ["69"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "71",
            name: "Збільшення прибутку 18",
            level: 36,
            parents: ["69"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "72",
            name: "Розширення лімітів 18",
            level: 36,
            parents: ["69"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Doppio на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "73",
            name: "Відкрити Espresso",
            level: 37,
            parents: ["70", "71", "72"],
            image: "img/TypeCoffe/Espresso.png",
            description: "Дозволяє виробляти каву Espresso.",
            cost: 1,
            researched: false
        },
        {
            id: "74",
            name: "Економія на сировині 19",
            level: 38,
            parents: ["73"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 10%.",
            cost: 1,
            researched: false
        },
        {
            id: "75",
            name: "Збільшення прибутку 19",
            level: 38,
            parents: ["73"],
            image: "img/profit.png",
            description: "2x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "76",
            name: "Розширення лімітів 19",
            level: 38,
            parents: ["73"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень Espresso на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "77",
            name: "Економія на сировині 20",
            level: 39,
            parents: ["74"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "78",
            name: "Збільшення прибутку 20",
            level: 39,
            parents: ["75"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "79",
            name: "Розширення лімітів 20",
            level: 39,
            parents: ["76"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "80",
            name: "Економія на сировині 21",
            level: 40,
            parents: ["77"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "81",
            name: "Збільшення прибутку 21",
            level: 40,
            parents: ["78"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "82",
            name: "Розширення лімітів 21",
            level: 40,
            parents: ["79"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "83",
            name: "Економія на сировині 22",
            level: 41,
            parents: ["80"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "84",
            name: "Збільшення прибутку 22",
            level: 41,
            parents: ["81"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "85",
            name: "Розширення лімітів 22",
            level: 41,
            parents: ["82"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "86",
            name: "Економія на сировині 23",
            level: 42,
            parents: ["83"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "87",
            name: "Збільшення прибутку 23",
            level: 42,
            parents: ["84"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "88",
            name: "Розширення лімітів 23",
            level: 42,
            parents: ["85"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "89",
            name: "Економія на сировині 24",
            level: 43,
            parents: ["86"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "90",
            name: "Збільшення прибутку 24",
            level: 43,
            parents: ["87"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "91",
            name: "Розширення лімітів 24",
            level: 43,
            parents: ["88"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "92",
            name: "Економія на сировині 25",
            level: 44,
            parents: ["89"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "93",
            name: "Збільшення прибутку 25",
            level: 44,
            parents: ["90"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "94",
            name: "Розширення лімітів 25",
            level: 44,
            parents: ["91"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "95",
            name: "Економія на сировині 26",
            level: 45,
            parents: ["92"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "96",
            name: "Збільшення прибутку 26",
            level: 45,
            parents: ["93"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "97",
            name: "Розширення лімітів 26",
            level: 45,
            parents: ["94"],
            image: "img/limit.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави на 25.",
            cost: 1,
            researched: false
        },



        {
            id: "98",
            name: "Економія на сировині 27",
            level: 46,
            parents: ["95"],
            image: "img/discount.png",
            description: "Знижує вартість покращень кави на 25%.",
            cost: 1,
            researched: false
        },
        {
            id: "99",
            name: "Збільшення прибутку 27",
            level: 46,
            parents: ["96"],
            image: "img/profit.png",
            description: "10x до прибутку усіх видів кави.",
            cost: 1,
            researched: false
        },
        {
            id: "100",
            name: "Розширення лімітів 27",
            level: 46,
            parents: ["97"],
            image: "img/limit500.png",
            description: "Збільшує максимальний рівень покращень усіх видів кави до 500.",
            cost: 1,
            researched: false
        },
    ];

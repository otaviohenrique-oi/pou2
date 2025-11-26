const pou = {
    stats: {
        health: 100,
        hunger: 100,
        energy: 100,
        fun: 100,
        cleanliness: 100,
        coins: 100,
        stress: 0,
        level: 1,
        xp: 0,
        xpToNext: 100
    },
    multipliers: {
        exp: 1,
        coins: 1,
        hungerGain: 1,
        foodCost: 1
    },
    skills: [], //skilly
    statusEffects: [] //debuffy
};




const healthEl = document.getElementById("health");
const hungerEl = document.getElementById("hunger");
const energyEl = document.getElementById("energy");
const cleanlinessEl = document.getElementById("cleanliness");
const coinsEl = document.getElementById("coins");
const stressEl = document.getElementById("stress");
const levelEl = document.getElementById("level");

// --- pomocné funkcie ---
function clampStats() {
    for (let key in pou.stats) {
        if (typeof pou.stats[key] === "number") {
            pou.stats[key] = Math.max(0, Math.min(100, pou.stats[key]));
        }
    }
}

function addXP(amount) {
    pou.stats.xp += amount * pou.multipliers.exp;
    while (pou.stats.xp >= pou.stats.xpToNext) {
        pou.stats.xp -= pou.stats.xpToNext;
        pou.stats.level++;
        pou.stats.xpToNext = Math.floor(pou.stats.xpToNext * 1.2);
        console.log(`Level up! Teraz level ${pou.stats.level}`);
    }
}

// --- hlavné akcie ---
function feed() {
    const cost = 5 * pou.multipliers.foodCost;
    if (pou.stats.coins < cost) {
        console.log("Nedostatok Ficúnov!");
        return;
    }
    pou.stats.coins -= cost;
    pou.stats.hunger += 20 * pou.multipliers.hungerGain;
    addXP(10);
    clampStats();
    console.log("FicoPou sa najedol!");
}

function drink() {
    const cost = 3;
    if (pou.stats.coins < cost) {
        console.log("Need 3 Ficúny!");
        return;
    }
    pou.stats.coins -= cost;
    pou.stats.energy += 15;
    addXP(6);
    clampStats();
    console.log("FicoPou si dal drink!");
}

function chill() {
    const cost = 20;
    if (pou.stats.coins < cost) {
        console.log("Nedostatok Ficúnov na relax!");
        return;
    }
    pou.stats.coins -= cost;
    pou.stats.stress -= 50;
    addXP(10);
    clampStats();
    console.log("FicoPou relaxuje (stres znížený)!");
}

function clean() {
    const cost = 8;
    if (pou.stats.coins < cost) {
        console.log("Nedostatok Ficúnov na hygienu!");
        return;
    }
    pou.stats.coins -= cost;
    pou.stats.cleanliness = 100;
    addXP(10);
    clampStats();
    console.log("FicoPou je čistý!");
}

function sleep() {
    if (pou.stats.cleanliness < 50) {
        console.log("Nemôže spať špinavý!");
        return;
    }
    pou.stats.energy = 100;
    pou.stats.cleanliness -= 50;
    clampStats();
    console.log("FicoPou spal a doplnil energiu!");
}

// --- render / zobrazovanie ---
function render() {
    console.log(`Hunger: ${pou.stats.hunger}, Energy: ${pou.stats.energy}, Fun: ${pou.stats.fun}, Clean: ${pou.stats.cleanliness}, Coins: ${pou.stats.coins}, Stress: ${pou.stats.stress}, Level: ${pou.stats.level}, XP: ${pou.stats.xp}/${pou.stats.xpToNext}`);
}

// --- test ---
render();
feed();
drink();
chill();
clean();
sleep();
render();
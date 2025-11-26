import { PlayerStats } from "./PlayerStats.js";

// Shared player instance
export const player = new PlayerStats();

// Calculate passive earnings
function calculateEarnedMoney() {
    let corruption = player.corruption;
    let level = player.level;

    // Example formula for money
    let moneyToEarn = corruption * corruption * level; // use * instead of ^
    return moneyToEarn;
}

function living() {
    player.addCorruption(-2);
    player.addMoney(calculateEarnedMoney());
    player.addXP(1);

    // Example decay
    player.addHunger(-2);   // Hunger goes down 2 every 5s
    if (player.hunger <= 0) player.addHealth(-1); // Health decreases if hunger is 0

    render();
    setTimeout(living, 5000);
}


export function render() {
    // Money
    document.getElementById("moneyAmount").textContent = player.money;

    // Level
    document.getElementById("playerLevel").textContent = player.level;

    // XP remaining
    const xpRemaining = player.xpToNextLevel - player.xp;
    document.getElementById("xpRemaining").textContent = xpRemaining;

    // Corruption
    const corruptionPercent = (player.corruption / player.maxCorruption) * 100;
    document.getElementById("corruptionBar").style.width = corruptionPercent + "%";
    document.getElementById("corruptionValue").textContent = Math.floor(corruptionPercent) + "%";

    // Health
    const healthPercent = (player.health / player.maxHealth) * 100;
    document.getElementById("healthBar").style.width = healthPercent + "%";
    document.getElementById("healthValue").textContent = Math.floor(healthPercent) + "%";

    // Hunger
    const hungerPercent = (player.hunger / player.maxHunger) * 100;
    document.getElementById("hungerBar").style.width = hungerPercent + "%";
    document.getElementById("hungerValue").textContent = Math.floor(hungerPercent) + "%";
}

// Start passive loop
living();

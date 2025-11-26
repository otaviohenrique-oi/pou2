import { player, render } from "./pouLifetime.js";

// Open / Close corruption menu
export function openCorruptionMenu() {
    document.getElementById("gameUI").style.display = "none";
    document.getElementById("corruptionMenu").style.display = "flex";
    renderCorruptionActions();
}

export function closeCorruptionMenu() {
    document.getElementById("corruptionMenu").style.display = "none";
    document.getElementById("gameUI").style.display = "flex";
}

// Corruption actions
const corruptionActionsList = [
    { name: "Gamble in Casino", corruption: 5, cost: { money: 50 } },
    { name: "Dark Ritual", corruption: 20, cost: { money: 100, health: 10 } },
    { name: "Forbidden Food", corruption: 10, cost: { hunger: 15 } },
    { name: "Cheat Task", corruption: 15, cost: { xp: 5 } }
];

function renderCorruptionActions() {
    const container = document.getElementById("corruptionActions");
    container.innerHTML = "";

    corruptionActionsList.forEach((action) => {
        const btn = document.createElement("button");
        let costText = "";
        if (action.cost.money) costText += `${action.cost.money}💰 `;
        if (action.cost.health) costText += `${action.cost.health}❤️ `;
        if (action.cost.hunger) costText += `${action.cost.hunger}🍗 `;
        if (action.cost.xp) costText += `${action.cost.xp}🧠`;

        btn.textContent = `${action.name} (+${action.corruption} corruption) - ${costText}`;
        btn.addEventListener("click", () => performCorruptionAction(action));
        container.appendChild(btn);
    });
}

// Perform selected action
function performCorruptionAction(action) {
    if (action.cost.money && player.money < action.cost.money) {
        alert("You don’t have enough money!");
        return;
    }
    if (action.cost.health && player.health < action.cost.health) {
        alert("You don’t have enough health!");
        return;
    }
    if (action.cost.hunger && player.hunger < action.cost.hunger) {
        alert("You are too hungry!");
        return;
    }
    if (action.cost.xp && player.xp < action.cost.xp) {
        alert("You don’t have enough XP!");
        return;
    }

    // Deduct costs
    if (action.cost.money) player.addMoney(-action.cost.money);
    if (action.cost.health) player.addHealth?.(-action.cost.health);
    if (action.cost.hunger) player.addHunger?.(-action.cost.hunger);
    if (action.cost.xp) player.addXP(-action.cost.xp);

    // Add corruption
    player.addCorruption(action.corruption);

    alert(`You gained +${action.corruption} corruption! Current: ${player.corruption}/200`);

    render();
}

window.openCorruptionMenu = openCorruptionMenu;
window.closeCorruptionMenu = closeCorruptionMenu;

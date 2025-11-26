import { player, render } from "./pouLifetime.js";

const symbols = ["🍒", "🍋", "⭐", "🍇", "🍉"];

// Show/hide casino
export function goCasino() {
    document.getElementById("gameUI").style.display = "none";
    document.getElementById("casino").style.display = "flex";
}

export function goHome() {
    document.getElementById("casino").style.display = "none";
    document.getElementById("gameUI").style.display = "flex";
}

// Get current bet
function getBet() {
    const betSelect = document.getElementById("betAmount");
    let bet = betSelect.value;

    if (bet === "all") return player.money;
    return Math.min(player.money, parseInt(bet));
}

// Slot machine
export function pullLever() {
    const bet = getBet();
    const msg = document.getElementById("msg");

    // Stop if player does NOT have enough money
    if (bet <= 0 || player.money < bet) {
        msg.textContent = "❌ Nemas dosť peňazí!";
        return;
    }
    startSpin(bet);
}

function startSpin(bet) {
    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");
    const msg = document.getElementById("msg");

    msg.textContent = "Točí sa...";

    let spins = 15;
    let count = 0;

    const interval = setInterval(() => {
        r1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        r2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        r3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        count++;
        if (count > spins) {
            clearInterval(interval);
            checkWin(bet);   // ⬅️ pass the locked bet
        }
    }, 100);
}


// Check if player won
function checkWin(bet) {
    const r1 = document.getElementById("r1").textContent;
    const r2 = document.getElementById("r2").textContent;
    const r3 = document.getElementById("r3").textContent;
    const msg = document.getElementById("msg");
    
    if (r1 === r2 && r2 === r3) {
        player.addMoney(bet);
        msg.textContent = `🎉 Vyhra! Dostávaš ${bet}💰! 🎉`;
    } else {
        player.addMoney(-bet);
        msg.textContent = "Robo prehral a podpísal papier hore nohami!";
    }

    render(); // Update UI
}

// Bind lever click
const lever = document.getElementById("lever");
if (lever) {
    lever.addEventListener("click", () => {
        lever.classList.remove("pulled");
        void lever.offsetWidth;
        lever.classList.add("pulled");
        pullLever();
    });
}

window.goCasino = goCasino;
window.pullLever = pullLever;
window.goHome = goHome;
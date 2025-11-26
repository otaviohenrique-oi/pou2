const symbols = ["🍒", "🍋", "⭐", "🍇", "🍉"];

// prepínanie scén
function goCasino() {
    document.getElementById("gameUI").style.display = "none";
    document.getElementById("casino").style.display = "flex";
}   
function goHome() {
    document.getElementById("casino").style.display = "none";
    document.getElementById("gameUI").style.display = "flex";
}

let balance = 1000; // počiatočný balance

function getBet() {
    const betSelect = document.getElementById("betAmount");
    let bet = betSelect.value;

    if (bet === "all") {
        return balance;
    } else {
        return Math.min(balance, parseInt(bet));
    }
}

function updateBalance(amount) {
    balance += amount;
    document.getElementById("currentBalance").textContent = `💰 Balance: ${balance}`;
}


// slot machine logika
function pullLever() {
    const msg = document.getElementById("msg");
    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    msg.textContent = "Točí sa...";

    let spins = 15;
    let i = 0;
    const interval = setInterval(() => {
        r1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        r2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        r3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        i++;
        if (i > spins) {
            clearInterval(interval);
            checkWin();
        }
    }, 100);
}

// predpokladáme, že v HTML je element s id="lever" a v ňom <span class="knob"></span>
const lever = document.getElementById("lever");
lever.addEventListener("click", () => {
  lever.classList.remove("pulled");
  // force reflow aby sa animácia znova spustila
  void lever.offsetWidth;
  lever.classList.add("pulled");

  // spusti mechaniku slotu (ak už máš pullLever funkciu)
  if (typeof pullLever === 'function') pullLever();
});


function checkWin() {
    const r1 = document.getElementById("r1").textContent;
    const r2 = document.getElementById("r2").textContent;
    const r3 = document.getElementById("r3").textContent;
    const msg = document.getElementById("msg");

    const bet = getBet();

    if (r1 === r2 && r2 === r3) {
        // výhra = 2x stávka
        updateBalance(bet);
        msg.textContent = `🎉 Vyhra! Dostávaš ${bet}💰! 🎉`;
    } else {
        // prehra = stratíš bet
        updateBalance(-bet);

        const fails = [
            "Robo podpísal papier hore nohami!"
        ];
        msg.textContent = fails[Math.floor(Math.random() * fails.length)];
    }
}

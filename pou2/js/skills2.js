let playerLevel = 3; // whatever your level system is

// Define all possible skills
let skills = [
    { name: "Quick Eat", level: 1 },
    { name: "Fast Heal", level: 2 },
    { name: "Super Jump", level: 4 },
    { name: "Lucky Spin", level: 6 },
    { name: "Ultra Strength", level: 10 }
];

function openSkills() {
    document.getElementById("gameUI").style.display = "none";
    document.getElementById("casino").style.display = "none";
    document.getElementById("skills").style.display = "flex";

    showSkills();
}

function closeSkills() {
    document.getElementById("skills").style.display = "none";
    document.getElementById("gameUI").style.display = "block";
}

// Generate skills list each time
function showSkills() {
    let container = document.getElementById("skillsList");
    container.innerHTML = ""; // clear old list

    skills.forEach(skill => {
        let div = document.createElement("div");

        if (playerLevel >= skill.level) {
            div.className = "skill unlocked";
            div.innerHTML = `${skill.name} ✔ (Unlocked)`;
        } else {
            div.className = "skill locked";
            div.innerHTML = `${skill.name} 🔒 (Unlocks at Level ${skill.level})`;
        }

        container.appendChild(div);
    });
}

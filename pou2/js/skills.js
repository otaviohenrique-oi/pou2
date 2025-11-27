// skills.js

let playerLevel = 3; // whatever your level system is

const skillsData = [
    {name:"Konsolidácia", description:"Zvyšuje získané peniaze o 20%", unlocked:false, reqLevel: 2},
    {name:"XP Magnet", description:"Zvyšuje získané XP o 20%", unlocked:false, reqLevel: 5},
    {name:"Health Saver", description:"Znižuje stratu zdravia o 20%", unlocked:false, reqLevel: 8},
    {name:"Hunger Saver", description:"Znižuje spotrebu hladu o 15%", unlocked:false, reqLevel: 10},
];

// Open skills menu
function openSkills() {
    document.getElementById("gameUI").style.display = "none";
    document.getElementById("casino").style.display = "none";
    document.getElementById("skills").style.display = "flex";

    renderSkills();
}

// Close skills menu
function closeSkills() {
    document.getElementById("skills").style.display = "none";
    document.getElementById("gameUI").style.display = "block";
}

// Generate skills list each time
function renderSkills() {
    const container = document.getElementById("skillsList");
    container.innerHTML = ""; // vyčisti staré

    skillsData.forEach((skill, i) => {
        const div = document.createElement("div");
        div.classList.add("skill");

        if (skill.unlocked) {
            div.classList.add("unlocked");
            div.textContent = `${skill.name} ✔ (Unlocked)`;
        } else {
            div.classList.add("locked");
            div.textContent = `${skill.name} 🔒 (Unlocks at Level ${skill.reqLevel})`;
        }

        // hover detail
        div.addEventListener("mouseenter", () => showSkillDetail(div, skill));
        div.addEventListener("mouseleave", hideSkillDetail);

        // kliknutie na odomknutie
        div.addEventListener("click", () => unlockSkill(skill));

        container.appendChild(div);
    });
}

function showSkillDetail(skillNode, skill) {
    const detail = document.getElementById("skills-detail");
    const nameEl = document.getElementById("detail-name");
    const descEl = document.getElementById("detail-desc");

    // nastavenie textu
    nameEl.textContent = skill.name;
    descEl.textContent = skill.description;

    // border podľa stavu odomknutia
    if(skill.unlocked){
        detail.classList.add("unlocked");
        detail.classList.remove("locked");
    } else {
        detail.classList.add("locked");
        detail.classList.remove("unlocked");
    }

    // pozícia okna nad skill node
    const rect = skillNode.getBoundingClientRect();
    detail.style.top = rect.top + window.scrollY - rect.height - 10 + "px";
    detail.style.left = rect.left + window.scrollX + rect.width/2 - 100 + "px";

    detail.style.display = "block";
}

function hideSkillDetail(){
    document.getElementById("skills-detail").style.display = "none";
}

const skillNodes = document.querySelectorAll(".skill-node");

skillNodes.forEach((node, i)=>{
    node.addEventListener("mouseenter", ()=>{
        showSkillDetail(node, skillsData[i]);
    });
    node.addEventListener("mouseleave", ()=>{
        hideSkillDetail();
    });
});

function unlockSkill(skill) {

    if (skill.unlocked) return;

    // jediná podmienka
    if (playerStats.level < skill.reqLevel) {
        alert("Tvoj level je príliš nízky!");
        return;
    }

    // úspešné odomknutie
    skill.unlocked = true;

    localStorage.setItem("skill-" + skill.name, "true");

    applySkillEffect(skill);
    renderSkills();
}

function applySkillEffect(skill) {
    switch(skill.name) {

        case "Konsolidácia":
            moneyMultiplier = 1.20;
            break;

        case "XP Magnet":
            xpMultiplier = 1.20;
            break;

        case "Health Saver":
            healthMultiplier = 0.80; 
            break;

        case "Hunger Saver":
            hungerMultiplier = 0.85;
            break;
    }
}



// Make functions accessible from HTML
window.openSkills = openSkills;
window.closeSkills = closeSkills;

renderSkills()

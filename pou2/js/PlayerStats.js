export class PlayerStats {
    constructor() {
        this.money = 100;
        this.xp = 0;
        this.level = 1;

        this.corruption = 10;
        this.maxCorruption = 10000;

        this.health = 100;   // add health
        this.maxHealth = 100;
        this.hunger = 100;   // add hunger
        this.maxHunger = 100;

        this.xpToNextLevel = 100;
    }

    addMoney(amount) { this.money += amount; }

    addXP(amount) {
        this.xp += amount;
        this.checkLevelUp();
    }

    checkLevelUp() {
        while (this.xp >= this.xpToNextLevel) {
            this.xp -= this.xpToNextLevel;
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xpToNextLevel = this.calculateNextXP(this.level);
    }

    calculateNextXP(level) {
        return 100 + (level - 1) * 50;
    }

    addCorruption(amount) {
        this.corruption = this.clamp(this.corruption + amount, 0, this.maxCorruption);
    }

    reduceCorruption(amount) {
        this.corruption = this.clamp(this.corruption - amount, 0, this.maxCorruption);
    }

    addHealth(amount) {
        this.health = this.clamp(this.health + amount, 0, this.maxHealth);
    }

    addHunger(amount) {
        this.hunger = this.clamp(this.hunger + amount, 0, this.maxHunger);
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

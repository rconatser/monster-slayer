new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        healImage: function() {
            document.getElementById("playerStatus").src = "images/heal.png";
            setTimeout("defaultImage()", 2000);
        },
        attackImagePlayer: function() {
            document.getElementById("playerStatus").src = "images/sword-edit.png";
            setTimeout("defaultImage()", 2000);
        },
        specialAttackImage: function() {
            document.getElementById("playerStatus").src = "images/power-sword.png";
            setTimeout("defaultImage()", 2000);
        },
        attackImageMonster: function() {
            document.getElementById("monsterStatus").src = "images/sword-edit.png";
            setTimeout("defaultImage()", 2000);
        },
        defaultImage: function() {
            document.getElementById("playerStatus").src = "images/dotdotdot.png";
            document.getElementById("monsterStatus").src = "images/dotdotdot.png";
        },
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.turns.length + ': Player hits Monster for ' + damage + " HP."
            });
            if (this.checkWin()) {
                return;
            }
            this.attackImagePlayer();
            this.monsterAttacks();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.turns.length + ': Player hits Monster hard for ' + damage + " HP."
            });
            if (this.checkWin()) {
                return;
            }
            this.specialAttackImage();
            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.turns.length + ': Player heals for 10 HP.'
            });
            this.healImage();
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Turn ' + this.turns.length + ': Monster hits Player for ' + damage + " HP."
            });
            this.attackImageMonster();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! Would you like to play again?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.gameOver();
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! Would you like to play again?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.gameOver();
                }
                return true;
            }
            return false;
        },
        gameOver: function () {
            window.open("game-over.html");
        }
    }
});

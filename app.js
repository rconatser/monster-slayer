new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
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
                text: this.turns.length + '. Player hits Monster for ' + damage + " HP."
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: this.turns.length + '. Player hits Monster hard for ' + damage + " HP."
            });
            if (this.checkWin()) {
                return;
            }
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
                text: this.turns.length + '. Player heals for 10 HP.'
            });
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
                text: this.turns.length + '. Monster hits Player for ' + damage + " HP."
            });
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




// Older Code, for Reference if Needed

// // register modal component
// Vue.component('modal', {
//     template: '#modal-template'
//     })

//     data: {
//         playerHealth: 100,
//         monsterHealth: 100,
//         gameIsRunning: false,
//         turns: [],
//         showModal: false,
//         response: "", // blank text, will be filled with responses as game progresses
//         modalTitle: "",
//         randomNum: 0;
//     },
//     methods: {
//         startGame: function () {
//             this.gameIsRunning = true;
//             this.playerHealth = 100;
//             this.monsterHealth = 100;
//             this.turns = [];
//             this.showModal = false;
//         },
//         poison: function () {
//             var isTrue = 3;
//             if(isTrue){
//                 if(this.turns.length)
//                 return true;
//             }else{
//                 return false;
//             }
//             return false;
//         },
//         giveUp: function () {
//             this.modalTitle = "Game Over!";
//             this.response = "Sorry to see you give up...";
//             this.showModal = true;
//         },
//         monsterAttacks: function() {
//             var damage = this.calculateDamage(5, 12);
//             this.playerHealth -= damage;
//             this.randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
//             poison(randomNum);

//             this.checkWin();
//             this.turns.unshift({
//                 isPlayer: false,
//                 text: this.turns.length + '. Monster hits Player for ' + damage + ' Points.'
//             });
//         },    
//         checkWin: function() {
//             if (this.monsterHealth <= 0) { // Player Wins!
//                 this.modalTitle = "Victory!";
//                 this.response = "Congratulations, You Win!";
//                 this.showModal = true; // Modal pops up
//                 return true;
//             } else if (this.playerHealth <= 0) { // Player Loses!
//                 this.modalTitle = "Game Over!";
//                 this.response = "Sorry, You Lost!";
//                 this.showModal = true; // Modal pops up
//                 return false;
//             }
//         },
//         gameOver: function() {
//             window.open("game-over.html");  
//         }
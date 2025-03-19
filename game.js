const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let player, cursors, ground, obstacles, coins, scoreText;
let score = 0;

function preload() {
    this.load.image('player', 'https://i.imgur.com/QM4cOZt.png');
    this.load.image('ground', 'https://i.imgur.com/Sz4zsUj.png');
    this.load.image('obstacle', 'https://i.imgur.com/3s3JbcQ.png');
    this.load.image('coin', 'https://i.imgur.com/sMiyIVk.png');
}

function create() {
    ground = this.physics.add.staticGroup();
    ground.create(400, 390, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 300, 'player').setScale(0.5);
    player.setCollideWorldBounds(true);

    obstacles = this.physics.add.group();
    this.time.addEvent({ delay: 2000, callback: spawnObstacle, callbackScope: this, loop: true });

    coins = this.physics.add.group();
    this.time.addEvent({ delay: 3000, callback: spawnCoin, callbackScope: this, loop: true });

    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, obstacles, gameOver, null, this);
    this.physics.add.overlap(player, coins, collectCoin, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' });
}

function update() {
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-350);
    }
}

function spawnObstacle() {
    let obstacle = obstacles.create(800, 350, 'obstacle');
    obstacle.setVelocityX(-200);
    obstacle.setImmovable(true);
}

function spawnCoin() {
    let coin = coins.create(800, Phaser.Math.Between(200, 350), 'coin');
    coin.setVelocityX(-150);
}

function collectCoin(player, coin) {
    coin.destroy();
    score += 10;
    scoreText.setText('Score: ' + score);
}

function gameOver() {
    this.physics.pause();
    player.setTint(0xff0000);
    scoreText.setText('Game Over! Score: ' + score);
}

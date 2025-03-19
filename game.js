const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player, ground, cursors, obstacles, coins, score = 0, scoreText;

function preload() {
    this.load.image('player', 'player.png');
    this.load.image('ground', 'ground.png');
    this.load.image('obstacle', 'obstacle.png');
    this.load.image('coin', 'coin.png');
}

function create() {
    this.add.image(400, 200, 'ground');

    player = this.physics.add.sprite(100, 300, 'player');
    player.setScale(0.5);
    player.setCollideWorldBounds(true);

    ground = this.physics.add.staticGroup();
    ground.create(400, 390, 'ground').setScale(2).refreshBody();

    obstacles = this.physics.add.group();
    coins = this.physics.add.group();

    this.time.addEvent({
        delay: 2000,
        callback: spawnObstacles,
        callbackScope: this,
        loop: true
    });

    this.time.addEvent({
        delay: 1500,
        callback: spawnCoins,
        callbackScope: this,
        loop: true
    });

    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, obstacles, gameOver, null, this);
    this.physics.add.overlap(player, coins, collectCoin, null, this);

    scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '20px', fill: '#fff' });

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }

    obstacles.children.iterate(obstacle => {
        if (obstacle && obstacle.x < 0) {
            obstacle.destroy();
        }
    });

    coins.children.iterate(coin => {
        if (coin && coin.x < 0) {
            coin.destroy();
        }
    });
}

function spawnObstacles() {
    let obstacle = obstacles.create(800, 350, 'obstacle');
    obstacle.setVelocityX(-200);
}

function spawnCoins() {
    let coin = coins.create(800, Phaser.Math.Between(200, 300), 'coin');
    coin.setVelocityX(-200);
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

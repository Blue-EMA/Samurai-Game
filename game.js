var player;
var cursors;
var gameOver;
var scoreText;
var keyEnter;
var keySlash;
var keyPeriod;
var keyA;
var keyS;
var keyD;
var keyW;
var keyE;
var keyF;
var keyQ;
var ESC;
var enemy;

class Example extends Phaser.Scene {
    constructor() {
        super({ key: 'Example' });
		this.enemyHealth = 100;
		this.playerHealth = 100;
    }

preload() {
        this.load.spritesheet('dude_jump', 'assets/Samurai/Jump.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('dude_walk', 'assets/Samurai/Walk.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('overhand', 'assets/Samurai/Attack_2.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('slash', 'assets/Samurai/Attack_1.png', { frameWidth: 128, frameHeight: 128 });
        
	this.load.image('ground', 'assets/nature_5/3.png');
        this.load.image('sky', 'assets/nature_5/1.png');
        this.load.image('cloud', 'assets/nature_5/2.png');
        this.load.image('field', 'assets/nature_5/4.png');
		
    }
dim() {
    this.dimOverlay = this.add.graphics();
    this.dimOverlay.fillStyle(0x000000, .5);
    this.dimOverlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
    this.dimOverlay.setDepth(1000);
    this.dimOverlay.setVisible(false);

	}
	

create() {
        
		//setting
	this.add.image(400, 300, 'sky').setScale(1.77);
	this.cloud = this.add.tileSprite(0, 0, 800, 600, 'cloud').setOrigin(0).setScale(1.75);
        this.field = this.add.image(400, 300, 'field').setScale(1.85);
        this.ground = this.add.tileSprite(0, 300, 800, 600, 'ground').setOrigin(0).setScale(1);
	this.dim();
		
		//player	
        player = this.physics.add.sprite(700, 50, 'dude_walk').setOrigin(0).setScale(1);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setOrigin(0.5, 1);
	player.flipX = true;
		
		//enemy
        enemy = this.physics.add.sprite(100, 50, 'dude_walk').setOrigin(0).setScale(1);
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
	enemy.setOrigin(0.5,1);
		

        // Create health bar
        const healthBarWidth = 200; // Width of the health bar
        const healthBarHeight = 20; // Height of the health bar
        const healthBarX = 125; // X position of the health bar
        const healthBarY = 20; // Y position of the health bar
        const healthBarColor = 0x1C8D30; // Color of the health bar (red)
		
		
        this.healthBarGraphics = this.add.graphics();
        this.healthBarGraphics.fillStyle(healthBarColor, 1);
        this.healthBarGraphics.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
		
		// cursor and key createion extrap.
		cursors = this.input.keyboard.createCursorKeys();
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        	keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		keyPeriod = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
		keySlash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);
		
		// movments 
	this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude_walk', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude_walk', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'slash',
            frames: this.anims.generateFrameNumbers('slash', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'overhand',
            frames: this.anims.generateFrameNumbers('overhand', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dude_jump', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });
		
		
        this.physics.add.collider(player, this.ground);
        this.physics.add.collider(enemy, this.ground);
        this.physics.world.setBounds(0, 0, 800, 600);
		
	this.dim();
        
		// Debug graphics
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xff0000);
        graphics.strokeRect(0, 0, 800, 600);
    }
	
	updateHealthBar(healthBarX, health ) {
        const maxHealth = 100;
        const healthBarWidth = 220;
        const healthBarHeight = 20;
        const healthBarY = 40;
        const healthBarColor = health > 70 ? 0x1C8D30 : health > 50 ? 0xffff00 : 0xff0000;

        
        this.healthBarGraphics.fillStyle(healthBarColor, 1);
        this.healthBarGraphics.fillRect(healthBarX, healthBarY, (health / maxHealth) * healthBarWidth, healthBarHeight);
    }


    update() {
    if (gameOver) {
        return;
	this.scene.pause();
		
    } else if (ESC.isDown) {
	this.dimOverlay.setVisible(true);
	this.scene.pause();
    }
	this.healthBarGraphics.clear();
    	this.updateHealthBar(100, this.playerHealth);
	this.updateHealthBar(500, this.enemyHealth);
	
    this.ground.tilePositionX -= 2;
    this.cloud.tilePositionX += 2;

    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        this.ground.tilePositionX += 4;
        player.flipX = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
        player.flipX = false;
    } else if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.anims.play('jump', true);
	} else if (keyPeriod.isDown) {
        player.anims.play('overhand', true);
	} else if (keySlash.isDown) {   
        player.anims.play('slash', true);
    } else {
        player.setVelocityX(0);
    }

    // Player2 movement
    if (keyD.isDown) {
        enemy.setVelocityX(160);
        enemy.anims.play('right', true);
        enemy.flipX = false;
    } else if (keyA.isDown) {
        enemy.setVelocityX(-160);
        enemy.anims.play('left', true);
        enemy.flipX = true;
        this.ground.tilePositionX += 4;
    } else if (keyW.isDown) {
        enemy.setVelocityY(-100);
        enemy.anims.play('jump', true);
	} else if (keyE.isDown) {
        enemy.anims.play('overhand', true);
	} else if (keyF.isDown) {
        enemy.anims.play('slash', true);
    } else {
        enemy.setVelocityX(0);
    }
}
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Example]
};

var game = new Phaser.Game(config);

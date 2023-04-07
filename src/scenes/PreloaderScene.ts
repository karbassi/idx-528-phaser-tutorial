export default class PreloaderScene extends Phaser.Scene {
  plateforms!: Phaser.Physics.Arcade.StaticGroup
  player!: Phaser.Physics.Arcade.Sprite
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super({ key: 'PreloaderScene' })
    console.log('I am inside the PreloaderScene')
  }

  preload() {
    this.load.image('sky', './assets/img/sky.png')
    this.load.image('ground', './assets/img/platform.png')
    this.load.image('star', './assets/img/star.png')
    this.load.image('bomb', './assets/img/bomb.png')
    this.load.spritesheet('character', './assets/img/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }

  create() {
    this.add.image(400, 300, 'sky')
    this.add.image(400, 300, 'star')

    this.createPlateforms()
    this.createPlayer()

    // collisions
    this.physics.add.collider(this.player, this.plateforms)

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.left.isDown) {
      this.moveLeft()
    } else if (this.cursors.right.isDown) {
      this.moveRight()
    } else {
      this.moveIdle()
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.moveUp()
    }
  }

  // ---

  private createPlateforms() {
    this.plateforms = this.physics.add.staticGroup()

    this.plateforms.create(400, 568, 'ground').setScale(2).refreshBody()

    this.plateforms.create(600, 400, 'ground')
    this.plateforms.create(50, 250, 'ground')
    this.plateforms.create(750, 220, 'ground')
  }

  private createPlayer() {
    // Create the player
    this.player = this.physics.add.sprite(100, 300, 'character')

    // Have it collide with the world (the frame of the game)
    this.player.setCollideWorldBounds(true)

    // bounce when collide the world
    this.player.setBounce(0.2)

    this.player.setScale(1)

    // Create animations

    // Player moving left
    this.anims.create({
      key: 'player-left',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-right',
      frames: this.anims.generateFrameNumbers('character', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNumbers('character', {
        start: 4,
        end: 4,
      }),
    })
  }

  private moveLeft() {
    this.player.setVelocityX(-160)
    this.player.anims.play('player-left', true)
  }

  private moveRight() {
    this.player.setVelocityX(160)
    this.player.anims.play('player-right', true)
  }

  private moveIdle() {
    this.player.setVelocityX(0)
    this.player.anims.play('player-idle', true)
  }

  private moveUp() {
    this.player.setVelocityY(-330)
  }
}

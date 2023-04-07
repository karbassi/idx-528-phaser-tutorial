export default class PreloaderScene extends Phaser.Scene {
  plateforms!: Phaser.Physics.Arcade.StaticGroup
  player!: Phaser.Physics.Arcade.Sprite

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
  }

  update(time: number, delta: number) {
    // console.log('I am the update function inside PreloaderScene')
    // console.log(time, delta)
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
    this.player = this.physics.add.sprite(100, 100, 'character')

    // Have it collide with the world (the frame of the game)
    this.player.setCollideWorldBounds(true)

    // bounce when collide the world
    this.player.setBounce(0.2)

    // Create animations
    this.anims.create({
      key: 'player-left',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 3,
      }),
    })
  }
}

export default class PreloaderScene extends Phaser.Scene {
  plateforms = this.physics.add.staticGroup()

  constructor() {
    super({ key: 'PreloaderScene' })
    console.log('I am inside the PreloaderScene')
  }

  preload() {
    this.load.image('sky', './assets/img/sky.png')
    this.load.image('ground', './assets/img/platform.png')
    this.load.image('star', './assets/img/star.png')
    this.load.image('bomb', './assets/img/bomb.png')
  }

  create() {
    this.add.image(400, 300, 'sky')
    this.add.image(400, 300, 'star')

    this.plateforms.create()
    // this.add.image(90, 10, 'star').setOrigin(0, 0)
    // this.add.image(130, 10, 'star').setOrigin(0, 0)
  }

  update(time: number, delta: number) {
    // console.log('I am the update function inside PreloaderScene')
    // console.log(time, delta)
  }
}

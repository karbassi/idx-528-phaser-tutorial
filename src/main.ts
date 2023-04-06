import Phaser from 'phaser'
import PreloaderScene from './scenes/PreloaderScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    // mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
    // zoom: 2,
  },
  scene: [PreloaderScene],
}

const game = new Phaser.Game(config)

export default game

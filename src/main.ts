import Phaser from 'phaser'
import PreloaderScene from './scenes/PreloaderScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [PreloaderScene],
}

const game = new Phaser.Game(config)

export default game

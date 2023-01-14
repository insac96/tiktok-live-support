import Phaser from 'phaser'
import BootScene from '@/game/scenes/boot'
import PlayScene from '@/game/scenes/play'

function launch(parentID) {
  const parent = document.getElementById('GameScreen')

  return new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: parentID,
      width: 1920,
      height: 1080
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [
      BootScene, PlayScene
    ]
  })
}

export default launch
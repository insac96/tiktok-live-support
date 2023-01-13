
import { Scene } from 'phaser'

export default class PlayScene extends Scene {
    constructor () {
        super({ key: 'PlayScene' })
    }

    create () {
        const Map = this.createMap()
    }

    update () {

    }

    createMap () {
        const Key = Math.floor((Math.random() * 4) + 1)
        const Map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, `Map_${Key}`)
        Map.setScale(Math.max(this.cameras.main.width / Map.width, this.cameras.main.height / Map.height)).setScrollFactor(0) 
        return Map
    }

    createPlayer () {
        const Player = this.add.group()
        const Key = Math.floor((Math.random() * 3) + 1)

        const Player_Idle = this.add.sprite(0, 0, `Player_${Key}_Idle`)
        //const Player_Jump = this.add.sprite(0, 0, `Player_${Key}_Jump`)
        //const Player_Run = this.add.sprite(0, 0, `Player_${Key}_Run`)
        //const Player_Sitdown = this.add.sprite(0, 0, `Player_${Key}_Sitdown`)
        //const Player_Walk = this.add.sprite(0, 0, `Player_${Key}_Walk`)
    }
}


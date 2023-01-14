import { Scene } from 'phaser'


export default class BootScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {
        this.loadMap()
        this.loadGun()
        this.loadPlayer()
    }

    create () {
        this.scene.start('PlayScene')
    }

    loadMap () {
        for (let i = 1; i <= 4; i++) {
            this.load.image(`Map_${i}`, require(`@/assets/game/map/${i}/bg.png`))
        }
    }

    loadGun () {
        //for (let i = 1; i <= 10; i++) {
            //this.load.image(`Gun_${i}`, require(`@/assets/game/gun/${i}/main.png`))
            //this.load.image(`Gun_${i}_Bullet`, require(`@/assets/game/gun/${i}/bullet.png`))
        //}

        for (let i = 1; i <= 4; i++) {
            this.load.image(`Shoot_${i}`, require(`@/assets/game/shoot/${i}.png`))
        }
    }

    loadPlayer () {
        for (let i = 1; i <= 3; i++) {
            this.load.spritesheet(`Player_${i}`, require(`@/assets/game/player/${i}/Idle.png`), { frameWidth: 48, frameHeight: 48 })
            this.load.spritesheet(`Player_${i}_Idle`, require(`@/assets/game/player/${i}/Idle.png`), { frameWidth: 48, frameHeight: 48 })
            this.load.spritesheet(`Player_${i}_Run`, require(`@/assets/game/player/${i}/Run.png`), { frameWidth: 48, frameHeight: 48 })
            this.load.spritesheet(`Player_${i}_Walk`, require(`@/assets/game/player/${i}/Walk.png`), { frameWidth: 48, frameHeight: 48 })
            //this.load.image(`Player_${i}_Hand`, require(`@/assets/game/player/${i}/Hand.png`))
            //this.load.image(`Player_${i}_Hand_Shoot`, require(`@/assets/game/player/${i}/Hand_Shoot.png`))
        }
    }
}
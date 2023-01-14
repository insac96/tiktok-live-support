import { Scene } from 'phaser'


export default class BootScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {
        this.loadMap()
        this.loadCharacter()
        this.loadZombie()
    }

    create () {
        this.scene.start('PlayScene')
    }

    loadMap () {
        for (let i = 1; i <= 4; i++) {
            this.load.image(`Map_${i}`, require(`@/assets/game/map/${i}/bg.png`))
        }
    }

    loadCharacter () {
        for (let i = 1; i <= 3; i++) {
            this.load.spritesheet(`Character_${i}`, require(`@/assets/game/character/${i}/Idle.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Idle`, require(`@/assets/game/character/${i}/Idle.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Run`, require(`@/assets/game/character/${i}/Run.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Walk`, require(`@/assets/game/character/${i}/Walk.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Hurt`, require(`@/assets/game/character/${i}/Hurt.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Jump`, require(`@/assets/game/character/${i}/Jump.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Dead`, require(`@/assets/game/character/${i}/Dead.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Attack_1`, require(`@/assets/game/character/${i}/Attack_1.png`), { frameWidth: 128, frameHeight: 128 })
            this.load.spritesheet(`Character_${i}_Attack_2`, require(`@/assets/game/character/${i}/Attack_2.png`), { frameWidth: 128, frameHeight: 128 })

            if(i==2){
                this.load.spritesheet(`Character_${i}_Attack_3`, require(`@/assets/game/character/${i}/Attack_3.png`), { frameWidth: 128, frameHeight: 128, endFrame: 11 })
            }
            else {
                this.load.spritesheet(`Character_${i}_Attack_3`, require(`@/assets/game/character/${i}/Attack_3.png`), { frameWidth: 128, frameHeight: 128 })
            }

            if(i==3){
                this.load.spritesheet(`Character_${i}_Bullet`, require(`@/assets/game/character/${i}/Bullet.png`), { frameWidth: 64, frameHeight: 128, endFrame: 4 })
                this.load.spritesheet(`Character_${i}_Bullet_End`, require(`@/assets/game/character/${i}/Bullet.png`), { frameWidth: 64, frameHeight: 128, startFrame: 5 })
            }
            else {
                this.load.spritesheet(`Character_${i}_Bullet`, require(`@/assets/game/character/${i}/Bullet.png`), { frameWidth: 64, frameHeight: 64, endFrame: 4 })
                this.load.spritesheet(`Character_${i}_Bullet_End`, require(`@/assets/game/character/${i}/Bullet.png`), { frameWidth: 64, frameHeight: 64, startFrame: 5 })
            }
        }
    }

    loadZombie () {
        for (let i = 1; i <= 3; i++) {
            this.load.spritesheet(`Zombie_${i}`, require(`@/assets/game/zombie/${i}/Idle.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Idle`, require(`@/assets/game/zombie/${i}/Idle.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Run`, require(`@/assets/game/zombie/${i}/Run.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Walk`, require(`@/assets/game/zombie/${i}/Walk.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Hurt`, require(`@/assets/game/zombie/${i}/Hurt.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Jump`, require(`@/assets/game/zombie/${i}/Jump.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Dead`, require(`@/assets/game/zombie/${i}/Dead.png`), { frameWidth: 96, frameHeight: 96 })
            this.load.spritesheet(`Zombie_${i}_Attack`, require(`@/assets/game/zombie/${i}/Attack.png`), { frameWidth: 96, frameHeight: 96 })
        }
    }
}
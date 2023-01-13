import { Scene } from 'phaser'

// Map
import Map_1 from '@/game/assets/map/1/bg.png'
import Map_2 from '@/game/assets/map/2/bg.png'
import Map_3 from '@/game/assets/map/3/bg.png'
import Map_4 from '@/game/assets/map/4/bg.png'

// Gun
import Gun_1 from '@/game/assets/gun/1/1_1.png'
import Gun_1_Bullet from '@/game/assets/gun/1/1_2.png'
import Gun_2 from '@/game/assets/gun/2/2_1.png'
import Gun_2_Bullet  from '@/game/assets/gun/2/2_2.png'
import Gun_3 from '@/game/assets/gun/3/3_1.png'
import Gun_3_Bullet from '@/game/assets/gun/3/3_2.png'
import Gun_4 from '@/game/assets/gun/4/4_1.png'
import Gun_4_Bullet from '@/game/assets/gun/4/4_2.png'
import Gun_5 from '@/game/assets/gun/5/5_1.png'
import Gun_5_Bullet from '@/game/assets/gun/5/5_2.png'
import Gun_6 from '@/game/assets/gun/6/6_1.png'
import Gun_6_Bullet from '@/game/assets/gun/6/6_2.png'
import Gun_7 from '@/game/assets/gun/7/7_1.png'
import Gun_7_Bullet from '@/game/assets/gun/7/7_2.png'
import Gun_8 from '@/game/assets/gun/8/8_1.png'
import Gun_8_Bullet from '@/game/assets/gun/8/8_2.png'
import Gun_9 from '@/game/assets/gun/9/9_1.png'
import Gun_9_Bullet from '@/game/assets/gun/9/9_2.png'
import Gun_10 from '@/game/assets/gun/10/10_1.png'
import Gun_10_Bullet from '@/game/assets/gun/10/10_2.png'

// Shoot
import Gun_Shoot_1 from '@/game/assets/gun/Shoot/1.png'
import Gun_Shoot_2 from '@/game/assets/gun/Shoot/2.png'
import Gun_Shoot_3 from '@/game/assets/gun/Shoot/3.png'
import Gun_Shoot_4 from '@/game/assets/gun/Shoot/4.png'
import Gun_Shoot_5 from '@/game/assets/gun/Shoot/5.png'

// Player 1
import Player_1_Idle from '@/game/assets/player/1/Idle.png'
import Player_1_Jump from '@/game/assets/player/1/Jump.png'
import Player_1_Run from '@/game/assets/player/1/Run.png'
import Player_1_Sitdown from '@/game/assets/player/1/Sitdown.png'
import Player_1_Walk from '@/game/assets/player/1/Walk.png'
import Player_1_Hand_1 from '@/game/assets/player/1/Hands/1.png'
import Player_1_Hand_2 from '@/game/assets/player/1/Hands/2.png'
import Player_1_Hand_3 from '@/game/assets/player/1/Hands/3.png'
import Player_1_Hand_4 from '@/game/assets/player/1/Hands/4.png'
import Player_1_Hand_5 from '@/game/assets/player/1/Hands/5.png'

// Player 2
import Player_2_Idle from '@/game/assets/player/2/Idle.png'
import Player_2_Jump from '@/game/assets/player/2/Jump.png'
import Player_2_Run from '@/game/assets/player/2/Run.png'
import Player_2_Sitdown from '@/game/assets/player/2/Sitdown.png'
import Player_2_Walk from '@/game/assets/player/2/Walk.png'
import Player_2_Hand_1 from '@/game/assets/player/2/Hands/1.png'
import Player_2_Hand_2 from '@/game/assets/player/2/Hands/2.png'
import Player_2_Hand_3 from '@/game/assets/player/2/Hands/3.png'
import Player_2_Hand_4 from '@/game/assets/player/2/Hands/4.png'
import Player_2_Hand_5 from '@/game/assets/player/2/Hands/5.png'

// Player 3
import Player_3_Idle from '@/game/assets/player/3/Idle.png'
import Player_3_Jump from '@/game/assets/player/3/Jump.png'
import Player_3_Run from '@/game/assets/player/3/Run.png'
import Player_3_Sitdown from '@/game/assets/player/3/Sitdown.png'
import Player_3_Walk from '@/game/assets/player/3/Walk.png'
import Player_3_Hand_1 from '@/game/assets/player/3/Hands/1.png'
import Player_3_Hand_2 from '@/game/assets/player/3/Hands/2.png'
import Player_3_Hand_3 from '@/game/assets/player/3/Hands/3.png'
import Player_3_Hand_4 from '@/game/assets/player/3/Hands/4.png'
import Player_3_Hand_5 from '@/game/assets/player/3/Hands/5.png'

export default class BootScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {
        this.load.image('Map_1', Map_1)
        this.load.image('Map_2', Map_2)
        this.load.image('Map_3', Map_3)
        this.load.image('Map_4', Map_4)

        this.load.image('Gun_1', Gun_1)
        this.load.image('Gun_1_Bullet', Gun_1_Bullet)
        this.load.image('Gun_2', Gun_2)
        this.load.image('Gun_2_Bullet', Gun_2_Bullet)
        this.load.image('Gun_3', Gun_3)
        this.load.image('Gun_3_Bullet', Gun_3_Bullet)
        this.load.image('Gun_4', Gun_4)
        this.load.image('Gun_4_Bullet', Gun_4_Bullet)
        this.load.image('Gun_5', Gun_5)
        this.load.image('Gun_5_Bullet', Gun_5_Bullet)
        this.load.image('Gun_6', Gun_6)
        this.load.image('Gun_6_Bullet', Gun_6_Bullet)
        this.load.image('Gun_7', Gun_7)
        this.load.image('Gun_7_Bullet', Gun_7_Bullet)
        this.load.image('Gun_8', Gun_8)
        this.load.image('Gun_8_Bullet', Gun_8_Bullet)
        this.load.image('Gun_9', Gun_9)
        this.load.image('Gun_9_Bullet', Gun_9_Bullet)
        this.load.image('Gun_10', Gun_10)
        this.load.image('Gun_10_Bullet', Gun_10_Bullet)

        this.load.image('Gun_Shoot_1', Gun_Shoot_1)
        this.load.image('Gun_Shoot_2', Gun_Shoot_2)
        this.load.image('Gun_Shoot_3', Gun_Shoot_3)
        this.load.image('Gun_Shoot_4', Gun_Shoot_4)
        this.load.image('Gun_Shoot_5', Gun_Shoot_5)

        this.load.spritesheet('Player_1_Idle', Player_1_Idle, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_1_Jump', Player_1_Jump, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_1_Run', Player_1_Run, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_1_Sitdown', Player_1_Sitdown, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_1_Walk', Player_1_Walk, { frameWidth: 48, frameHeight: 48 })
        this.load.image('Player_1_Hand_1', Player_1_Hand_1)
        this.load.image('Player_1_Hand_2', Player_1_Hand_2)
        this.load.image('Player_1_Hand_3', Player_1_Hand_3)
        this.load.image('Player_1_Hand_4', Player_1_Hand_4)
        this.load.image('Player_1_Hand_5', Player_1_Hand_5)

        this.load.spritesheet('Player_2_Idle', Player_2_Idle, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_2_Jump', Player_2_Jump, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_2_Run', Player_2_Run, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_2_Sitdown', Player_2_Sitdown, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_2_Walk', Player_2_Walk, { frameWidth: 48, frameHeight: 48 })
        this.load.image('Player_2_Hand_1', Player_2_Hand_1)
        this.load.image('Player_2_Hand_2', Player_2_Hand_2)
        this.load.image('Player_2_Hand_3', Player_2_Hand_3)
        this.load.image('Player_2_Hand_4', Player_2_Hand_4)
        this.load.image('Player_2_Hand_5', Player_2_Hand_5)

        this.load.spritesheet('Player_3_Idle', Player_3_Idle, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_3_Jump', Player_3_Jump, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_3_Run', Player_3_Run, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_3_Sitdown', Player_3_Sitdown, { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('Player_3_Walk', Player_3_Walk, { frameWidth: 48, frameHeight: 48 })
        this.load.image('Player_3_Hand_1', Player_3_Hand_1)
        this.load.image('Player_3_Hand_2', Player_3_Hand_2)
        this.load.image('Player_3_Hand_3', Player_3_Hand_3)
        this.load.image('Player_3_Hand_4', Player_3_Hand_4)
        this.load.image('Player_3_Hand_5', Player_3_Hand_5)
    }

    create () {
        this.scene.start('PlayScene')
    }
}
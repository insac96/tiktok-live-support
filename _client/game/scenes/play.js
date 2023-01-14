
import { Scene } from 'phaser'

export default class PlayScene extends Scene {
    constructor () {
        super({ key: 'PlayScene' })
        
        this.Config = {
            Characters: {
                '1': {
                    name: 'Fire',
                    health: 1000,
                    dame: 100,
                    attackType: 3
                },
                '2': {
                    name: 'Lightning',
                    health: 800,
                    dame: 100,
                    attackType: 3
                },
                '3': {
                    name: 'Magic',
                    health: 600,
                    dame: 100,
                    attackType: 2
                }
            }
        }

        this.Players = {}
        this.Zombies = {}
    }

    create () {
        this.Map = this.createMap()
        this.createRandomCharacter()
        this.createRandomZombie()
    }

    createMap (key) {
        const Key = key ? key : Math.floor((Math.random() * 4) + 1)
        const Map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, `Map_${Key}`)
        Map.setScale(Math.max(this.cameras.main.width / Map.width, this.cameras.main.height / Map.height)).setScrollFactor(0) 
        return Map
    }

    createCharacter (key) {
        // Get Key
        const PlayerType = key ? key : Math.floor((Math.random() * 3) + 1)
        const CharacterConfig = this.Config.Characters[PlayerType]
        const id = `Character-${Date.now()}`

        // Player Group
        const Player = this.add.container()
        Player.setScale(2)
        Player.setPosition(20, this.cameras.main.height / 2)
        Player.isRunning = false

        // Create Character Asset
        const Character = this.physics.add.sprite(0, 0, `Character_${PlayerType}`)
        Character.setOrigin(0)
        Character.anims.create({key: 'idle', frames: `Character_${PlayerType}_Idle`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'run', frames: `Character_${PlayerType}_Run`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'walk', frames: `Character_${PlayerType}_Walk`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'hurt', frames: `Character_${PlayerType}_Hurt`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'jump', frames: `Character_${PlayerType}_Jump`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'dead', frames: `Character_${PlayerType}_Dead`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'attack_1', frames: `Character_${PlayerType}_Attack_1`, frameRate: 15})
        Character.anims.create({key: 'attack_2', frames: `Character_${PlayerType}_Attack_2`, frameRate: 15})
        Character.anims.create({key: 'attack_3', frames: `Character_${PlayerType}_Attack_3`, frameRate: 15})
        Character.play('idle')
        Character.setDataEnabled()
        Character.data.set('id', id)
        Character.data.set('name', CharacterConfig.name)
        Character.data.set('health', CharacterConfig.health)
        Character.data.set('dame', CharacterConfig.dame)
        Player.add(Character)

        // Create Health Bar Asset
        const HealthBar = this.add.graphics()
        HealthBar.name = 'HealthBar'
        HealthBar.fillStyle(0x2ecc71, 1)
        HealthBar.fillRect(0, 5, Character.width / 2, 3)
        HealthBar.setPosition(((Character.width / 2) - (Character.width / 4)), ((Character.height / 2) - 18))
        Player.add(HealthBar)
        
        // Create Name Text
        const NameText = this.add.text(0, 0, Character.data.get('name'), {
            font: 'bold 12px Arial', 
            fill: '#fff',
        })
        NameText.setPosition(((Character.width / 2) - (NameText.width / 2)) , ((Character.height / 2) - 30))
        Player.add(NameText)

        // Running
        function Running () {
            this.tweens.add({
                targets: Player,
                x: Phaser.Math.Between(50, (this.cameras.main.width / 2 - 200)),
                y: Phaser.Math.Between(250, (this.cameras.main.height - 400)),
                duration: Phaser.Math.Between(700, 2000),
                ease: 'Linear',
                onStart: function () {
                    Player.isRunning = true
                    Character.play('run')
                },
                onComplete: function () {
                    Player.isRunning = false
                    Character.play('idle')
                }
            })

            this.time.addEvent({ delay: Phaser.Math.Between(3000, 5000), callback: Running, callbackScope: this })
        }

        // Attack
        function Attack () {
            if(!Player.isRunning){
                const Bullet = this.physics.add.sprite(0, 0, `Character_${PlayerType}_Bullet`)
                Bullet.anims.create({key: 'shoot', frames: `Character_${PlayerType}_Bullet`, frameRate: 10, repeat: -1})
                Bullet.anims.create({key: 'shoot-end', frames: `Character_${PlayerType}_Bullet_End`, frameRate: 10 })
                Bullet.setOrigin(0)
                Bullet.setPosition((Player.x + Character.width), (Player.y + Character.height))
            
                this.tweens.add({
                    targets: Bullet,
                    x: this.cameras.main.width,
                    duration: 1000,
                    ease: 'Linear',
                    onStart: function () {
                        Bullet.play('shoot')
                        Character.play(`attack_${CharacterConfig.attackType}`)
                    },
                    onComplete: function (tween, targets) {
                        Bullet.play('shoot-end')
                        targets[0].destroy()
                    }
                })

                this.time.addEvent({ delay: 500, callback: Attack, callbackScope: this })
            }
            else {
                this.time.addEvent({ callback: Attack, callbackScope: this })
            }
        }

        // Loop
        this.time.addEvent({ callback: Running, callbackScope: this })
        this.time.addEvent({ callback: Attack, callbackScope: this })

        // Add
        this.Players[id] = Player
    }

    createZombie (key) {
        const ZombieType = key ? key : Math.floor((Math.random() * 3) + 1)
        const id = `Zombie-${Date.now()}`

        // Zombie Group
        const Zombie = this.add.container()
        Zombie.setScale(2)
        Zombie.setPosition(this.cameras.main.width, this.cameras.main.height / 2)
        Zombie.isRunning = false

        // Create Zombie Asset
        const ZombieAsset = this.physics.add.sprite(0, 0, `Zombie_${ZombieType}`)
        ZombieAsset.setOrigin(0)
        ZombieAsset.flipX = !ZombieAsset.flipX
        ZombieAsset.anims.create({key: 'idle', frames: `Zombie_${ZombieType}_Idle`, frameRate: 15, repeat: -1})
        ZombieAsset.anims.create({key: 'run', frames: `Zombie_${ZombieType}_Run`, frameRate: 15, repeat: -1})
        ZombieAsset.anims.create({key: 'walk', frames: `Zombie_${ZombieType}_Walk`, frameRate: 15, repeat: -1})
        ZombieAsset.anims.create({key: 'hurt', frames: `Zombie_${ZombieType}_Hurt`, frameRate: 15, repeat: -1})
        ZombieAsset.anims.create({key: 'jump', frames: `Zombie_${ZombieType}_Jump`, frameRate: 15, repeat: -1})
        ZombieAsset.anims.create({key: 'dead', frames: `Zombie_${ZombieType}_Dead`, frameRate: 15, repeat: -1})
        ZombieAsset.anims.create({key: 'attack', frames: `Zombie_${ZombieType}_Attack`, frameRate: 15, repeat: -1})
        ZombieAsset.play('walk')
        ZombieAsset.setDataEnabled()
        ZombieAsset.data.set('id', id)
        ZombieAsset.data.set('health', 5000)
        ZombieAsset.data.set('dame', 20)
        Zombie.add(ZombieAsset)

        // Create Health Bar Asset
        const HealthBar = this.add.graphics()
        HealthBar.fillStyle(0xac4ea5, 1)
        HealthBar.fillRect(0, 5, ZombieAsset.width / 2, 3)
        HealthBar.setPosition(((ZombieAsset.width / 2) - (ZombieAsset.width / 4)), ((ZombieAsset.height / 2) - 30))
        Zombie.add(HealthBar)

        // Running
        this.tweens.add({
            targets: Zombie,
            x: this.cameras.main.width / 2,
            y: Phaser.Math.Between(250, (this.cameras.main.height - 350)),
            duration: 20000,
            ease: 'Linear',
            onComplete: function () {
                ZombieAsset.play('attack')
            }
        })

        // Add
        this.Zombies[id] = Zombie
    }

    createRandomCharacter () {
        function Create () {
            this.createCharacter()
            this.time.addEvent({ delay: Phaser.Math.Between(2000, 10000), callback: Create, callbackScope: this })
        }

        // Loop
        this.time.addEvent({ callback: Create, callbackScope: this })
    }

    createRandomZombie () {
        function Create () {
            this.createZombie()
            this.time.addEvent({ delay: Phaser.Math.Between(2000, 10000), callback: Create, callbackScope: this })
        }

        // Loop
        this.time.addEvent({ callback: Create, callbackScope: this })
    }
}


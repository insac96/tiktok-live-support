
import { Scene } from 'phaser'

export default class PlayScene extends Scene {
    constructor () {
        super({ key: 'PlayScene' })
    }

    create () {
        this.Map = this.createMap() 

        for (let i = 0; i < 20; i++) {
            this.Player = this.createPlayer()
            this.Player.SetData('shoot', 2)
            this.Player.SetData('attack-speed', Phaser.Math.Between(300, 1200))
            this.Player.SetData('attack-delay', Phaser.Math.Between(300, 1500))
        }
    }

    createMap (key) {
        const Key = key ? key : Math.floor((Math.random() * 4) + 1)
        const Map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, `Map_${Key}`)
        Map.setScale(Math.max(this.cameras.main.width / Map.width, this.cameras.main.height / Map.height)).setScrollFactor(0) 
        return Map
    }

    createPlayer (key) {
        // Get Key
        const Key = key ? key : Math.floor((Math.random() * 3) + 1)

        // Player Group
        const Player = this.add.container()
        Player.setPosition(400,500)
        Player.setScale(4)

        // Create Character Asset
        const Character = this.add.sprite(0, 0, `Player_${Key}`)
        Character.setOrigin(0)
        Character.name = 'Character'
        Character.anims.create({key: 'idle', frames: `Player_${Key}_Idle`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'run', frames: `Player_${Key}_Run`, frameRate: 15, repeat: -1})
        Character.anims.create({key: 'walk', frames: `Player_${Key}_Walk`, frameRate: 15, repeat: -1})
        Character.play('idle')
        Character.setDataEnabled()
        Character.data.set('name', 'Player')
        Character.data.set('health', 1000)
        Character.data.set('main-health', 1000)
        Character.data.set('shoot', 1)
        Character.data.set('dame', 10)
        Character.data.set('attack-speed', 1200)
        Character.data.set('attack-delay', 1500)
        Player.add(Character)

        // Create Health Bar Asset
        const HealthBar = this.add.graphics()
        HealthBar.name = 'HealthBar'
        HealthBar.fillStyle(0x2ecc71, 1)
        HealthBar.fillRect(0, 5, Character.width / 2, 3)
        HealthBar.setPosition((0 - (Character.width / 4) + (Character.width / 4)), 0)
        Player.add(HealthBar)

        // Create Name Text
        const NameText = this.add.text(0, 0, Character.data.get('name'), {
            font: 'bold 8px Arial', 
            fill: '#fff',
        })
        NameText.setPosition((0 - (NameText.width / 2) + (Character.width / 4)), -6)
        Player.add(NameText)

        // Create Shoot Asset
        const Shoot = this.add.sprite(0, 0, `Shoot_${Character.data.get('shoot')}`)
        Shoot.setOrigin(0)
        Shoot.setVisible(false)

        // Fire
        function Fire () {
            Shoot.setPosition(Player.x + Character.width, Player.y + Character.height)
            Shoot.setVisible(true)

            this.tweens.add({
                targets: Shoot,
                x: this.cameras.main.width,
                duration: Character.data.get('attack-speed'),
                ease: 'Power1',
                onComplete: function (tween, targets) {
                    targets[0].setVisible(false)
                    Shoot.setPosition(Player.x + Character.width, Player.y + Character.height)
                }
            })

            this.time.addEvent({ delay: Character.data.get('attack-delay'), callback: Fire, callbackScope: this })
        }

        // Run
        function Run () {
            Character.play('run')
            this.tweens.add({
                targets: Player,
                x: Phaser.Math.Between(50, (this.cameras.main.width / 2 - 200)),
                y: Phaser.Math.Between(250, (this.cameras.main.height - 250)),
                duration: Phaser.Math.Between(200, 1000),
                ease: 'Linear',
                onComplete: function () {
                    Character.play('idle')
                }
            })

            this.time.addEvent({ delay: Phaser.Math.Between(1000, 4000), callback: Run, callbackScope: this })
        }

        // Set Health Player
        Player.SetHealth = function (value) {
            Character.data.set('health', Character.data.get('main-health') + value)
            HealthBar.scaleX = value / Character.data.get('main-health')
        }

        // Get Data Player
        Player.GetData = function () {
            return {
                health: Character.data.get('health'),
                mainHealth: Character.data.get('main-health'),
                shoot: Character.data.get('shoot'),
                dame: Character.data.get('dame'),
                attackSpeed: Character.data.get('attack-speed'),
                attackDelay: Character.data.get('attack-delay'),
            }
        }

        // Set Data Player
        Player.SetData = function (key, value) {
            Character.data.set(key, value)
        }

        // Loop
        this.time.addEvent({ delay: 0, callback: Fire, callbackScope: this })
        this.time.addEvent({ delay: 0, callback: Run, callbackScope: this })

        // Return
        return Player
    }
}


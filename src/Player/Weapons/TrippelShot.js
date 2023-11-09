import Weapon from "./Weapon";
import Projectile from "./Projectile";
import Weapon3Sound from '../../Sound/Weapon3Sound.js'


export default class TrippelShot extends Weapon {
    constructor(game, x, y, width, height) {
        super(game)
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.weaponSound = new Weapon3Sound(game)

        this.maxAmmo = 20
        this.ammo = 20
        this.ammoTimer = 0
        this.ammoInterval = 500

        this.projectiles = []

        this.shootTimer = 0
        this.shootInterval = 700

        this.startingDamage = 1
        this.damage = this.startingDamage
    }

    shoot() {
        if (this.game.player.canShoot && this.game.startGame) {

            // get angle between player and mouse
            const angle1 = Math.atan2(
                this.game.input.mouseY - (this.y + this.height / 2),
                this.game.input.mouseX - (this.x + this.width / 2)
            )
            const angle2 = Math.atan2(
                this.game.input.mouseY - (this.y + this.height / 2) + 30,
                this.game.input.mouseX - (this.x + this.width / 2) + 30
            )
            const angle3 = Math.atan2(
                this.game.input.mouseY - (this.y + this.height / 2) - 30,
                this.game.input.mouseX - (this.x + this.width / 2) - 30
            )

            // can use ammo 
            if (this.ammo >= 3) {
                this.weaponSound.playSound()
                this.game.player.canShoot = false
                this.shootTimer = 0
                this.ammo -= 3
                this.projectiles.push(
                    new Projectile(
                        this.game,
                        this.x + this.width / 2,
                        this.y + this.height / 2,
                        angle1
                    )
                )
                this.projectiles.push(
                    new Projectile(
                        this.game,
                        (this.x + this.width / 2),
                        (this.y + this.height / 2),
                        angle2
                    )
                )
                this.projectiles.push(
                    new Projectile(
                        this.game,
                        (this.x + this.width / 2),
                        (this.y + this.height / 2),
                        angle3
                    )
                )
            }
        }
    }
}

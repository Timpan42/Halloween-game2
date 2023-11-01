import Weapon from "./Weapon";
import Projectile from "./Projectile";

export default class TrippelShot extends Weapon {
    constructor(game, x, y, width, height) {
        super(game)
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.maxAmmo = 20
        this.ammo = 20
        this.ammoTimer = 0
        this.ammoInterval = 500

        this.projectiles = []

        this.canShoot = true
        this.shootTimer = 0
        this.shootInterval = 500

        this.damage = 0.5
    }

    shoot() {
        if (this.canShoot && this.game.startGame) {

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
            if (this.ammo >= 2) {
                this.canShoot = false
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

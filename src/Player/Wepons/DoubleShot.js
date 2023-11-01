import Weapon from "./Weapon.js";
import Projectile from "./Projectile.js";
export default class DoubleShot extends Weapon {
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
        this.shootInterval = 100

        this.damage = 0.5
    }

    update(deltaTime, x, y) {
        this.x = x
        this.y = y
        // Ammo over time 
        if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
            this.ammoTimer = 0
            this.ammo++
        } else {
            this.ammoTimer += deltaTime
        }

        // projectiles
        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)
        })
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
        )

        // Can shoot logic 
        if (this.shootTimer > this.shootInterval) {
            this.canShoot = true
        } else {
            this.shootTimer += deltaTime
        }

    }

    draw(context) {

        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })

    }

    shoot() {
        if (this.canShoot && this.game.startGame) {

            // get angle between player and mouse
            const angle = Math.atan2(
                this.game.input.mouseY - (this.y + this.height / 2),
                this.game.input.mouseX - (this.x + this.width / 2)
            )

            // can use ammo 
            if (this.ammo >= 2) {
                this.canShoot = false
                this.shootTimer = 0
                this.ammo -= 2
                this.projectiles.push(
                    new Projectile(
                        this.game,
                        this.x + this.width / 2,
                        this.y + this.height / 2,
                        angle
                    )
                )
                this.projectiles.push(
                    new Projectile(
                        this.game,
                        (this.x + this.width / 2) - 20,
                        (this.y + this.height / 2) - 20,
                        angle
                    )
                )
            }
        }
    }
}

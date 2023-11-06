import Projectile from './Projectile.js'

export default class Weapon {
    constructor(game, x, y, width, height) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.maxAmmo = 20
        this.ammo = 20
        this.ammoTimer = 0
        this.ammoInterval = 500

        this.projectiles = []

        this.shootTimer = 0
        this.shootInterval = 500

        this.startingDamage = 1
        this.damage = this.startingDamage

    }

    update(deltaTime, x, y) {
        this.x = x
        this.y = y
        this.damage = this.startingDamage * this.game.player.damageIncrease
        this.shootInterval = (500 - this.game.player.attackSpeedIncrease)
        this.maxAmmo = (20 + this.game.player.maxAmmoIncrease)
        // Ammo over time 
        if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
            this.ammoTimer = 0
            this.ammo += (1 + this.game.player.ammoRegenIncrease)
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

    }

    draw(context) {

        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })

    }

    shoot() {
        if (this.game.player.canShoot && this.game.startGame) {

            // get angle between player and mouse
            const angle = Math.atan2(
                this.game.input.mouseY - (this.y + this.height / 2),
                this.game.input.mouseX - (this.x + this.width / 2)
            )

            // can use ammo 
            if (this.ammo > 0) {
                this.game.player.canShoot = false
                this.shootTimer = 0
                this.ammo--
                this.projectiles.push(
                    new Projectile(
                        this.game,
                        this.x + this.width / 2,
                        this.y + this.height / 2,
                        angle
                    )
                )
            }
        }
    }
} 
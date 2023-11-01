import Weapon from "./Weapon";

export default class TrippelShot extends Weapon {
    constructor(game, x, y, width, height) {
        super(game)
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
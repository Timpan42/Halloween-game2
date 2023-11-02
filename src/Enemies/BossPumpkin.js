import Pumpkin from "./Pumpkin";

export default class BossPumpkin extends Pumpkin {
    constructor(game, x, y) {
        super(game)
        this.width = 48
        this.height = 40
        this.bossMultiply = 3
        this.x = x
        this.y = y
        this.speed = 2.5
        this.lives = Math.floor((Math.random() * (3 - 1 + 1) + 1) * this.bossMultiply)
        this.damage = 1 * this.bossMultiply
        this.points = 10 * this.bossMultiply
        this.color = 'orange'
        this.type = 'bossPumpkin'
        this.coinMax = 3 * this.bossMultiply
        this.coinMin = 1 * this.bossMultiply


    }
}
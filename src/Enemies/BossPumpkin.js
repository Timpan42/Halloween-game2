import Pumpkin from "./Pumpkin";

export default class BossPumpkin extends Pumpkin {
    constructor(game, x, y, width, height) {
        super(game, x, y, width, height)
        this.bossMultiply = 3
        this.speed = 2.5
        this.lives = Math.floor((Math.random() * (3 - 1 + 1) + 1) * this.bossMultiply)
        this.damage = 1 * this.bossMultiply
        this.points = 10 * this.bossMultiply
        this.type = 'bossPumpkin'
        this.coinMax = 3 * this.bossMultiply
        this.coinMin = 1 * this.bossMultiply


    }
}
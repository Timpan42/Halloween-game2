import Pumpkin from "./Pumpkin";

export default class BossPumpkin extends Pumpkin {
    constructor(game, x, y, width, height, scaling) {
        super(game, x, y, width, height, scaling)
        this.bossMultiply = 3
        this.lives = Math.floor((Math.random() * (3 - 1 + 1) + 1) * this.bossMultiply) + Math.floor(1 * scaling)
        this.damage = 1 * this.bossMultiply + Math.floor(1 * scaling)
        this.points = 10 * this.bossMultiply
        this.type = 'bossPumpkin'
        this.coinMax = 3 * this.bossMultiply
        this.coinMin = 1 * this.bossMultiply


    }
}
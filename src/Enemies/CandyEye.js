import Enemy from "./Enemy";
import Pumpkin from "./Pumpkin";

export default class CandyEye extends Pumpkin {
    constructor(game, x, y) {
        super(game)
        this.width = 32
        this.height = 32
        this.x = x
        this.y = y
        this.speed = 4
        this.lives = Math.floor(Math.random() * (2 - 1 + 1) + 1)
        this.damage = 2
        this.points = 30
        this.color = '#551d6e'
        this.type = 'candyEye'
        this.coinMax = 3
        this.coinMin = 1
    }
}
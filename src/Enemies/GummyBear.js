import Pumpkin from "./Pumpkin";


export default class GummyBear extends Pumpkin {
    constructor(game, x, y) {
        super(game)
        this.width = 32
        this.height = 32
        this.x = x
        this.y = y
        this.speed = 1.5
        this.lives = Math.floor(Math.random() * (6 - 3 + 1) + 3)
        this.damage = 3
        this.points = 20
        this.color = '#b50d0f'
        this.type = 'gummyBear'
        this.coinMax = 5
        this.coinMin = 2
    }
}
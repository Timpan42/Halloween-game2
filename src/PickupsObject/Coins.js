import PickUps from "./PickUps"

export default class Coins extends PickUps {
    constructor(game, x, y, givenCoinWorth, coinIncrease) {
        super(game)
        this.width = 16
        this.height = 16
        this.x = x
        this.y = y
        this.speed = 0
        this.lives = 1
        this.color = '#D1D100'
        this.type = 'coin'
        this.coinPercentIncrease = (1.00 + coinIncrease)

        this.coinWorth = (givenCoinWorth * this.coinPercentIncrease)
    }
}

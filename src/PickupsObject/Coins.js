import PickUps from "./PickUps"
import image from '../assets/img/coin.png'


export default class Coins extends PickUps {
    constructor(game, x, y, width, height, givenCoinWorth, coinIncrease) {
        super(game, image, x, y, width, height)
        this.speed = 0
        this.lives = 1
        this.color = '#D1D100'
        this.type = 'coin'
        this.coinPercentIncrease = (1.00 + coinIncrease)

        this.coinWorth = (givenCoinWorth * this.coinPercentIncrease)
    }
}

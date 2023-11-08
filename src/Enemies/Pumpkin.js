import Enemy from './Enemy.js'
import image from '../assets/img/Jack.png'

export default class Pumpkin extends Enemy {
  constructor(game, x, y, width, height) {
    super(game, image, 4, x, y, width, height)
    this.speed = 230
    this.lives = Math.floor(Math.random() * (3 - 1 + 1) + 1)
    this.damage = 1
    this.points = 10
    this.type = 'pumpkin'
    this.coinMax = 3
    this.coinMin = 1
  }
}

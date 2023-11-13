import Enemy from './Enemy.js'
import image from '../assets/img/Jack.png'

export default class Pumpkin extends Enemy {
  constructor(game, x, y, width, height, scaling) {
    super(game, image, 4, x, y, width, height)
    this.speed = 230 + Math.floor(1 * scaling)
    this.lives = Math.floor(Math.random() * (3 - 1 + 1) + 1) + Math.floor(1 * scaling)
    this.damage = 1 + Math.floor(1 * scaling)
    this.points = 10
    this.type = 'pumpkin'
    this.coinMax = 3
    this.coinMin = 1

  }
}

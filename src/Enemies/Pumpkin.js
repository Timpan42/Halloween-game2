import Enemy from './Enemy.js'
const image = 'src/assets/img/Jack.png'

export default class Pumpkin extends Enemy {
  constructor(game, x, y, width, height) {
    super(game, image, x, y, width, height)
    this.speed = 2.5
    this.lives = Math.floor(Math.random() * (3 - 1 + 1) + 1)
    this.damage = 1
    this.points = 10
    this.type = 'pumpkin'
    this.coinMax = 3
    this.coinMin = 1
  }
}

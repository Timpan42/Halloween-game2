import PickUps from '../PickUps'

export default class Heal extends PickUps {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.type = 'heal'
  }
}

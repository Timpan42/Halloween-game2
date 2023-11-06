import PickUps from './PickUps'
import image from '../assets/img/healBlock.png'


export default class Heal extends PickUps {
  constructor(game, x, y, width, height) {
    super(game, image, x, y, width, height)
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.type = 'heal'
  }
}

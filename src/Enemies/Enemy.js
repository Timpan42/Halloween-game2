export default class Enemy {
  constructor(game, color) {
    this.game = game
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
    this.markedForDeletion = false
    this.color = color
    this.type = 'enemy'
    this.coinSpawnChans = 1.3
    this.coinWorth
    this.coinMax
    this.coinMin
  }

  givCoinWorth() {
    this.coinMin = Math.ceil(this.coinMin)
    this.coinMax = Math.floor(this.coinMax)
    return this.coinWorth = Math.floor(Math.random() * (this.coinMax - this.coinMin + 1) + this.coinMin)
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX
    if (this.x < 0 || this.x > this.game.width) this.markedForDeletion = true
    if (this.y < 0 || this.y > this.game.height) this.markedForDeletion = true
  }

  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
  }
}

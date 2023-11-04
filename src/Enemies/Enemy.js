export default class Enemy {
  constructor(game, image, x, y, width, height) {
    this.game = game
    this.x = x
    this.y = y
    this.speedX = 0
    this.speedY = 0
    this.markedForDeletion = false
    this.image = new Image()
    this.image.onload = () => {
      this.width = width
      this.height = height
    }
    this.image.src = image


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

  update(player) {
    this.y += this.speedY
    this.x += this.speedX
    if (this.x < 0 || this.x > this.game.width) this.markedForDeletion = true
    if (this.y < 0 || this.y > this.game.height) this.markedForDeletion = true

    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis
  }

  draw(context) {
    if (this.image.complete && this.width && this.height) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

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

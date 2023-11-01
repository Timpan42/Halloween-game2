import Weapon from "./Wepons/Weapon"

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 64
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    //For collision 
    this.halfW = this.width / 2
    this.halfH = this.height / 2
    this.centerX = this.x + this.halfW
    this.centerY = this.y + this.halfH

    //Move Speed
    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    //Lives
    this.lives = 5

    this.weapon = new Weapon(game, this.x, this.y, this.width, this.height)
  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    this.centerX = this.x + this.halfW
    this.centerY = this.y + this.halfH

    //Movement 
    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') || this.game.keys.includes('d')) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown') || this.game.keys.includes('s')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    this.weapon.update(deltaTime, this.x, this.y)
  }

  draw(context) {
    // player color
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)

    if (this.game.debug) {
      // lines around player enemy 
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }
    this.weapon.draw(context)
  }
}

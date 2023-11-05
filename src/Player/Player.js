import Weapon from "./Weapons/Weapon"
import DoubleShot from "./Weapons/DoubleShot"
import TrippelShot from "./Weapons/TrippelShot"
const image = 'src/assets/img/player.webp'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 16 * 3
    this.height = 19 * 3
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.image = new Image()
    this.image.onload = () => {
      this.width
      this.height
    }
    this.image.src = image

    //For collision 
    this.halfW = this.width / 2
    this.halfH = this.height / 2
    this.centerX = this.x + this.halfW
    this.centerY = this.y + this.halfH


    //Increase for shop logic
    this.damageIncrease = 1 //X
    this.attackSpeedIncrease = 0 //X
    this.movementSpeedIncrease = 0 //X
    this.maxHPIncrease = 0 //X
    this.maxAmmoIncrease = 0 //X
    this.ammoRegenIncrease = 0 //X

    //Move Speed
    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    // For UI
    this.projectiles = []
    this.ammo
    this.damage

    //Lives
    this.lives = 5
    this.livesMax = 10

    this.useDoubleShot = false
    this.useTrippelShot = false


    this.weapon = new Weapon(game, this.x, this.y, this.width, this.height)
    this.doubleShot = new DoubleShot(game, this.x, this.y, this.width, this.height)
    this.trippelShot = new TrippelShot(game, this.x, this.y, this.width, this.height)
  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    this.maxLives = 10 + this.maxHPIncrease
    this.maxSpeed = 6 + this.movementSpeedIncrease

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


    if (this.useTrippelShot) {
      this.trippelShot.update(deltaTime, this.x, this.y)
      this.projectiles = this.trippelShot.projectiles
      this.ammo = this.trippelShot.ammo
      this.damage = this.trippelShot.damage
    }
    else if (this.useDoubleShot) {
      this.doubleShot.update(deltaTime, this.x, this.y)
      this.projectiles = this.doubleShot.projectiles
      this.ammo = this.doubleShot.ammo
      this.damage = this.doubleShot.damage
    } else {
      this.weapon.update(deltaTime, this.x, this.y)
      this.projectiles = this.weapon.projectiles
      this.ammo = this.weapon.ammo
      this.damage = this.weapon.damage
    }
  }

  draw(context) {
    // player image
    if (this.image.complete && this.width && this.height) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

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
    if (this.useTrippelShot) {
      this.trippelShot.draw(context)
    }
    else if (this.useDoubleShot) {
      this.doubleShot.draw(context)
    } else {
      this.weapon.draw(context)
    }
  }
}

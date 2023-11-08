import Weapon from "./Weapons/Weapon"
import DoubleShot from "./Weapons/DoubleShot"
import TrippelShot from "./Weapons/TrippelShot"
import IdleSkelly from '../assets/img/player/IdleSkelly.png'
import WalkSkelly from '../assets/img/player/WalkSkelly.png'


export default class Player {
  constructor(game) {
    this.game = game
    this.width = 51.166666667
    this.height = 63
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2


    //For collision 
    this.halfW = this.width / 2
    this.halfH = this.height / 2
    this.centerX = this.x + this.halfW
    this.centerY = this.y + this.halfH


    //Increase for shop logic
    this.damageIncrease = 1 //X
    this.attackSpeedIncrease = 0 //X
    this.maxHPIncrease = 0 //X
    this.maxAmmoIncrease = 0 //X
    this.ammoRegenIncrease = 0 //X

    //Move Speed
    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 280

    // For UI
    this.projectiles = []
    this.ammo
    this.damage

    //Lives
    this.lives = 5
    this.livesMax = 10

    this.useDoubleShot = false
    this.useTrippelShot = false

    this.canShoot = true

    this.weapon = new Weapon(game, this.x, this.y, this.width, this.height)
    this.doubleShot = new DoubleShot(game, this.x, this.y, this.width, this.height)
    this.trippelShot = new TrippelShot(game, this.x, this.y, this.width, this.height)

    this.flip = true
    // sprite animation
    this.frameX = 0
    const idleImage = new Image()
    idleImage.src = IdleSkelly
    const runImage = new Image()
    runImage.src = WalkSkelly


    this.frameX = 0
    this.maxFrame = 4
    this.animationFps = 10
    this.animationTimer = 0
    this.animationInterval = 1000 / this.animationFps
    this.idle = {
      image: idleImage,
      frames: 4,
    }
    this.run = {
      image: runImage,
      frames: 6
    }
    this.image = this.idle.image


  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    this.maxLives = 10 + this.maxHPIncrease

    this.centerX = this.x + this.halfW
    this.centerY = this.y + this.halfH

    //Movement 
    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a') || this.game.keys.includes('A')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') || this.game.keys.includes('d') || this.game.keys.includes('D')) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w') || this.game.keys.includes('W')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown') || this.game.keys.includes('s') || this.game.keys.includes('S')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY * (deltaTime / 1000)
    this.x += this.speedX * (deltaTime / 1000)


    if (this.useTrippelShot) {
      this.trippelShot.update(deltaTime, this.x, this.y)
      this.projectiles = this.trippelShot.projectiles
      this.ammo = this.trippelShot.ammo
      this.damage = this.trippelShot.damage
      if (this.trippelShot.shootTimer > this.trippelShot.shootInterval) {
        this.canShoot = true
      } else {
        this.trippelShot.shootTimer += deltaTime
      }
    }
    else if (this.useDoubleShot) {
      if (this.doubleShot.shootTimer > this.doubleShot.shootInterval) {
        this.canShoot = true
      } else {
        this.doubleShot.shootTimer += deltaTime
      }
      this.doubleShot.update(deltaTime, this.x, this.y)
      this.projectiles = this.doubleShot.projectiles
      this.ammo = this.doubleShot.ammo
      this.damage = this.doubleShot.damage
    } else {
      if (this.weapon.shootTimer > this.weapon.shootInterval) {
        this.canShoot = true
      } else {
        this.weapon.shootTimer += deltaTime
      }
      this.weapon.update(deltaTime, this.x, this.y)
      this.projectiles = this.weapon.projectiles
      this.ammo = this.weapon.ammo
      this.damage = this.weapon.damage
    }

    if (this.speedX !== 0 || this.speedY !== 0) {
      this.maxFrame = this.run.frames
      this.image = this.run.image
    } else {
      this.maxFrame = this.idle.frames
      this.image = this.idle.image
    }

    if (this.speedX > 0) {
      this.flip = false
    } else if (this.speedX < 0) {
      this.flip = true
    }

    // sprite animation update
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }

  }

  draw(context) {

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

    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }
    // player image
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )
    context.restore()
  }
}

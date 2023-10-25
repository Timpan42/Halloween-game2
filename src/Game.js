import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Enemies/Pumpkin.js'
import Candy from './PickupsObject/Candy.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0

    this.pickUpsArray = []
    this.pickUpsTimer = 0
    this.pickUpsInterval = 2000

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.player = new Player(this)
  }

  update(deltaTime) {
    //stop clock 
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    //stop game
    if (this.gameOver) {
      return
    }

    //Spawn pickups
    if (this.pickUpsTimer > this.pickUpsInterval) {
      let x = Math.random() * (this.width - 100) // spawn on left or right edge
      let y = Math.random() * (this.height - 100) // spawn on top or bottom edge

      this.pickUpsArray.push(new Candy(this, x, y))
      this.pickUpsTimer = 0
    } else {
      this.pickUpsTimer += deltaTime
    }


    // collision check pickups
    this.pickUpsArray.forEach((pickUps) => {
      pickUps.update(this.player)

      if (this.checkCollision(this.player, pickUps)) {
        pickUps.markedForDeletion = true

        if (pickUps.type === 'candy') {
          this.player.lives += 1
        }
      }
    })



    //Span enemy
    if (this.enemyTimer > this.enemyInterval) {
      let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
      if (x === 0) {
        y = Math.random() * this.height // if on left edge, randomize y position
      } else if (x === this.width) {
        y = Math.random() * this.height // if on right edge, randomize y position
      } else if (y === 0) {
        x = Math.random() * this.width // if on top edge, randomize x position
      } else {
        x = Math.random() * this.width // if on bottom edge, randomize x position
      }
      this.enemies.push(new Pumpkin(this, x, y))
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    // collision check enemy
    this.enemies.forEach((enemy) => {
      // collision with enemy and player 
      enemy.update(this.player)

      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true

        if (enemy.type === 'pumpkin') {
          this.player.lives--
        }
      }

      // collision with enemy and projectile  
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > 1) {
            enemy.lives -= projectile.damage
          } else {
            enemy.markedForDeletion = true
          }
          projectile.markedForDeletion = true
        }
      })
    })



    this.player.update(deltaTime)
    this.pickUpsArray = this.pickUpsArray.filter((pickUps) => !pickUps.markedForDeletion)
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.pickUpsArray.forEach((pickUps) => {
      pickUps.draw(context)
    })
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}

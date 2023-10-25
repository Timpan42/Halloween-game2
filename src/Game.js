import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Enemies/Pumpkin.js'
import Heal from './PickupsObject/Heal.js'
import Enemy from './Enemy.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height

    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)

    this.keys = []
    this.points = 0
    this.gravity = 1
    this.gameTime = 0
    this.gameOver = false
    this.debug = false

    this.pickUpsArray = []
    this.pickUpsTimer = 0
    this.pickUpsInterval = 2000

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    // statistik 
    this.enemyKills = 0
    this.healPickups = 0


    this.player = new Player(this)
  }

  update(deltaTime) {
    //stop clock 
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    //stop game
    if (this.gameOver) {
      this.player.ammo = 0
      return
    }

    //Spawn pickups
    if (this.pickUpsTimer > this.pickUpsInterval) {
      let x = Math.random() * (this.width - 100) // spawn on left or right edge
      let y = Math.random() * (this.height - 100) // spawn on top or bottom edge

      this.pickUpsArray.push(new Heal(this, x, y))
      this.pickUpsTimer = 0
    } else {
      this.pickUpsTimer += deltaTime
    }


    // collision check pickups
    this.pickUpsArray.forEach((pickUps) => {
      pickUps.update(this.player)

      if (this.checkCollision(this.player, pickUps)) {
        pickUps.markedForDeletion = true
        this.stats(pickUps.type)
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

        this.damagePlayer(enemy.type)
        this.stats(enemy)
      }

      // collision with enemy and projectile  
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > 1) {
            enemy.lives -= projectile.damage
          } else {

            this.countPoints(enemy.type)

            this.stats(enemy)
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
  // Puts information under the category Stats 
  stats(type) {
    if (type === 'heal') {
      this.player.lives += 1
      this.healPickups++
    } else if (type instanceof Enemy) {
      this.enemyKills++
    }
  }
  // Puts points in points
  countPoints(enemyType) {
    if (enemyType === "pumpkin") {
      this.points += 10
    }
  }

  // Damage the player 
  damagePlayer(enemyType) {
    if (enemyType === "pumpkin") {
      this.player.lives--
    }
  }

  draw(context) {
    this.player.draw(context)
    this.pickUpsArray.forEach((pickUps) => {
      pickUps.draw(context)
    })
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.ui.draw(context)

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

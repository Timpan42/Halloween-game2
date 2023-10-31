import InputHandler from './Player/InputHandler.js'
import Player from './Player/Player.js'
import UserInterface from './UI/UserInterface.js'
import Pumpkin from './Enemies/Pumpkin.js'
import Heal from './PickupsObject/Heal.js'
import Enemy from './Enemies/Enemy.js'
import Wall from './NotMovableObject/Wall.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height

    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)

    this.wallArray = [
      new Wall(this, width, 16, 0, 0),
      new Wall(this, 16, height, 0, 0),
      new Wall(this, 16, height, width - 16, 0),
      new Wall(this, width, 16, 0, height - 16)
    ]


    this.keys = []
    this.points = 0
    this.gravity = 1
    this.gameTime = 0
    this.gameOver = false
    this.debug = false

    // Pickups
    this.pickUpsArray = []
    this.pickUpsTimer = 0
    this.pickUpsInterval = 2000

    // Pickups Block
    this.healBlock = 0
    this.healBlockMax = 5

    // Enemies
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    // statistic 
    this.enemyKills = 0
    this.healPickups = 0

    // Wave
    this.wave = 1
    this.waveSpawned = 0
    this.waveSpawnAmount = 5
    this.waveSpawnAmountMultiply = 1.1
    this.waveKilled = 0


    this.player = new Player(this)
  }

  update(deltaTime) {
    //stop clock 
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    //stop game
    if (this.gameOver) {
      this.player.canShoot = false
      return
    }

    // WALL
    // Wall collision 
    this.wallArray.forEach((wall) => {

      if (this.checkCollision(this.player, wall)) {
        this.checkSmartCollision(this.player, wall)
      }

    })

    //PICKUPS
    //Spawn pickups
    if (this.pickUpsTimer > this.pickUpsInterval) {
      let x = Math.random() * (this.width - 200) // spawn on left or right edge
      let y = Math.random() * (this.height - 200) // spawn on top or bottom edge

      if (this.healBlock < this.healBlockMax) {
        this.pickUpsArray.push(new Heal(this, x, y))
        let objectSpawn = this.pickUpsArray[this.pickUpsArray.length - 1]
        this.spawnStats(objectSpawn.type)
      }

      this.pickUpsTimer = 0
    } else {
      this.pickUpsTimer += deltaTime
    }

    // collision check pickups
    this.pickUpsArray.forEach((pickUps) => {
      pickUps.update(this.player)

      if (this.checkCollision(this.player, pickUps)) {
        pickUps.markedForDeletion = true
        this.pickUpsStats(pickUps.type)
      }
    })


    // ENEMIES
    //Span enemy
    if (this.waveSpawned < this.waveSpawnAmount) {
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
        this.waveSpawned++
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
    } else if (this.waveKilled < this.waveSpawnAmount) {

    } else {
      this.waveKilled = 0
      this.waveSpawned = 0
      this.waveSpawnAmount = this.waveSpawnAmount + Math.floor(2 * this.waveSpawnAmountMultiply)
      this.waveSpawnAmountMultiply += 0.1
      this.wave++
    }

    // collision check enemy
    this.enemies.forEach((enemy) => {
      // collision with enemy and player 
      enemy.update(this.player)

      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        this.waveKilled++

        this.damagePlayer(enemy.type)
        this.pickUpsStats(enemy)

      }

      // collision with enemy and projectile  
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > 1) {
            enemy.lives -= projectile.damage
          } else {

            this.countPoints(enemy.type)
            this.pickUpsStats(enemy)

            this.waveKilled++
            enemy.markedForDeletion = true
          }
          projectile.markedForDeletion = true
        }
      })
    })

    //UPDATE
    this.player.update(deltaTime)
    this.pickUpsArray = this.pickUpsArray.filter((pickUps) => !pickUps.markedForDeletion)
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  //FUNCTIONS 
  spawnStats(objectSpawn) {
    if (objectSpawn === 'heal') {
      this.healBlock++
    }
  }

  // Puts information under the category Stats 
  pickUpsStats(type) {
    if (type === 'heal') {
      this.player.lives += 1
      this.healPickups++
      this.healBlock--
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
    this.wallArray.forEach((wall) => {
      wall.draw(context)
    })
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

  checkSmartCollision(object1, object2) {
    this.diffX = object1.centerX - object2.centerX
    this.diffY = object1.centerY - object2.centerY
    this.minXDist = object1.halfW + object2.halfW + 20
    this.minYDist = object1.halfH + object2.halfH + 20
    this.depthX = this.diffX > 0 ? this.minXDist - this.diffX : -this.minXDist - this.diffX
    this.depthY = this.diffY > 0 ? this.minYDist - this.diffY : -this.minYDist - this.diffY


    if (this.depthX != 0 && this.depthY != 0) {
      if (Math.abs(this.depthX) < Math.abs(this.depthY)) {
        // Collision along the X axis.
        if (this.depthX > 0) {
          // Left side collision
          this.player.x += this.player.maxSpeed
        }
        else {
          // Right side collision
          this.player.x -= this.player.maxSpeed

        }
      }
      else {
        // Collision along the Y axis.
        if (this.depthY > 0) {
          // Top side collision
          this.player.y += this.player.maxSpeed

        }
        else {
          // Bottom side collision
          this.player.y -= this.player.maxSpeed

        }
      }
    }
  }

}

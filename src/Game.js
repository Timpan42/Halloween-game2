import InputHandler from './Player/InputHandler.js'
import Player from './Player/Player.js'
import UserInterface from './UI/UserInterface.js'
import Pumpkin from './Enemies/Pumpkin.js'
import Heal from './PickupsObject/Heal.js'
import Enemy from './Enemies/Enemy.js'
import Wall from './NotMovableObject/Wall.js'
import Coins from './PickupsObject/Coins.js'
import GummyBear from './Enemies/GummyBear.js'
import CandyEye from './Enemies/CandyEye.js'
import BossPumpkin from './Enemies/BossPumpkin.js'
import MainSong from './Sound/MainSong.js'

export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height

    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)

    this.gameReset = false
    this.startGame = false
    this.gameOver = false
    this.debug = false
    this.upgradeScreen = false

    //LocalStorage 
    this.data = JSON.parse(localStorage.getItem('data')) || [{ playTime: 0, coins: 0, points: 0, kills: 0, heals: 0 }]
    console.log(this.data)

    this.dataLimiter = 0

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


    // Pickups
    this.pickUpsArray = []
    this.pickUpsTimer = 0
    this.pickUpsInterval = 3000

    // Pickups Block
    this.healBlock = 0
    this.healBlockMax = 5

    this.coinsBlock = 0
    this.coins = 0
    this.coinIncrease = 0

    // Enemies
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.gummyBearSpawn = 0
    this.gummyBearMultiply = 1.0
    this.roundGummyBearSpawn

    this.candyEyeSpawn = 0
    this.candyEyeMultiply = 1.0
    this.roundCandyEyeSpawn

    this.bossSpawn = 1
    this.bossWave = 5
    this.roundBossSpawn

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
    this.mainSong = new MainSong(this)

    this.playSong = true
    this.resetSong = 0
  }

  update(deltaTime) {

    if (!this.startGame) {
      return
    }

    if (this.gameReset) {
      this.reset()
      this.player = new Player(this)
      this.gameReset = false
    }

    if (!this.gameOver && !this.upgradeScreen) {
      this.gameTime += deltaTime
    }

    //stop game
    if (this.gameOver) {
      this.storeLocal()
      this.player.weapon.canShoot = false
      this.mainSong.gameSound.pause()
      return
    }

    if (this.upgradeScreen) {
      this.player.weapon.canShoot = false
      this.mainSong.gameSound.pause()
      return
    }

    // Song
    if (this.playSong) {
      this.mainSong.playSound()
      this.playSong = false
    }

    if ((this.resetSong * 0.001) >= this.mainSong.duration) {
      this.mainSong.playSound()
      this.resetSong = 0
    } else {
      this.resetSong += deltaTime
    }

    this.player.update(deltaTime)


    // WALL
    // Wall collision 
    this.wallArray.forEach((wall) => {

      if (this.checkCollision(this.player, wall)) {
        this.checkSmartCollision(this.player, wall, deltaTime)
      }

    })

    //PICKUPS
    //Spawn pickups
    if (this.pickUpsTimer > this.pickUpsInterval) {
      let x = Math.random() * (this.width - 200) // spawn on left or right edge
      let y = Math.random() * (this.height - 200) // spawn on top or bottom edge

      if (this.healBlock < this.healBlockMax) {
        this.pickUpsArray.push(new Heal(this, x, y, 14 * 2.5, 16 * 2.5))
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
        this.pickUpsStats(pickUps)
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

        this.enemySpawner(x, y)
      } else {
        this.enemyTimer += deltaTime
      }
    } else if (this.waveKilled < this.waveSpawnAmount) {
      // When there is to many enemies the game waits so the wave is killed 

    } else {
      this.wave++
      this.waveKilled = 0
      this.waveSpawned = 0
      this.increaseSpawns()
    }

    // collision check enemy
    this.enemies.forEach((enemy) => {
      // collision with enemy and player 
      enemy.update(deltaTime, this.player)

      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        this.waveKilled++

        this.damagePlayer(enemy)
        this.pickUpsStats(enemy)

      }

      // collision with enemy and projectile  
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          this.enemyCollision(enemy)
          projectile.markedForDeletion = true
        }
      })
    })

    //UPDATE
    this.pickUpsArray = this.pickUpsArray.filter((pickUps) => !pickUps.markedForDeletion)
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  //FUNCTIONS 
  reset() {
    this.keys = []
    this.points = 0
    this.gameTime = 0
    this.gameOver = false
    this.pickUpsArray = []
    this.pickUpsTimer = 0
    this.healBlock = 0
    this.enemies = []
    this.enemyTimer = 0
    this.enemyKills = 0
    this.healPickups = 0
    this.wave = 1
    this.waveSpawned = 0
    this.waveSpawnAmount = 5
    this.waveSpawnAmountMultiply = 1.1
    this.waveKilled = 0
    this.dataLimiter = 0
    this.coins = 0
    this.coinsBlock = 0
    this.coinIncrease = 0

    this.player.damageIncrease = 1
    this.player.attackSpeedIncrease = 0
    this.player.maxHPIncrease = 0
    this.player.maxAmmoIncrease = 0
    this.player.ammoRegenIncrease = 0
    this.ui.feeDamage = 10
    this.ui.feeAttackSpeed = 20
    this.ui.feeMovement = 20
    this.ui.feeHp = 10
    this.ui.feeMaxAmmo = 5
    this.ui.feeAmmoRegen = 30
    this.ui.feeCoin = 50

    this.playSong = true

  }

  storeLocal() {
    if (this.dataLimiter < 1) {
      this.data[0].playTime = this.data[0].playTime + this.gameTime
      this.data[0].coins = this.data[0].coins + this.coins
      this.data[0].points = this.data[0].points + this.points
      this.data[0].kills = this.data[0].kills + this.enemyKills
      this.data[0].heals = this.data[0].heals + this.healPickups

      localStorage.setItem('data', JSON.stringify(this.data))
      this.dataLimiter++
    }
  }


  enemySpawner(x, y) {
    if (this.wave == this.bossWave) {
      if (this.roundBossSpawn > 0) {
        this.enemies.push(new BossPumpkin(this, x, y, 62, 86))
        this.roundBossSpawn--
        this.waveSpawned++

      }
    }

    if (this.wave >= 6) {
      if (this.roundCandyEyeSpawn > 0) {
        this.enemies.push(new CandyEye(this, x, y, 88, 88))
        this.roundCandyEyeSpawn--
        this.waveSpawned++
      }
    }

    if (this.wave >= 3)
      if (this.roundGummyBearSpawn > 0) {
        this.enemies.push(new GummyBear(this, x, y, 56, 84))
        this.roundGummyBearSpawn--
        this.waveSpawned++
      }

    if (this.wave >= 0) {
      this.enemies.push(new Pumpkin(this, x, y, 62, 86))
      this.waveSpawned++
    }

    this.enemyTimer = 0
  }

  increaseSpawns() {
    if (this.wave == (this.bossWave + 1)) {
      this.bossWave += 5
      this.bossSpawn = 1 + Math.floor(0.5 * this.waveSpawnAmountMultiply)
      this.roundBossSpawn = this.bossSpawn
    }

    if (this.wave >= 2) {
      this.gummyBearSpawn = 1 + Math.floor(0.5 * this.gummyBearMultiply)
      this.gummyBearMultiply += 0.2
      this.roundGummyBearSpawn = this.gummyBearSpawn
    }
    if (this.wave >= 5) {
      this.candyEyeSpawn = 1 + Math.floor(0.5 * this.candyEyeMultiply)
      this.candyEyeMultiply += 0.3
      this.roundCandyEyeSpawn = this.candyEyeSpawn
    }
    this.waveSpawnAmount = this.waveSpawnAmount + Math.floor(1 * this.waveSpawnAmountMultiply)
    this.waveSpawnAmountMultiply += 0.1
  }

  enemyCollision(enemy) {
    if (enemy.lives > 0) {
      enemy.lives -= this.player.damage
    } else if (!enemy.markedForDeletion) {
      let coinWorth = enemy.givCoinWorth()
      enemy.markedForDeletion = true
      this.countCoins(coinWorth, enemy.coinSpawnChans, enemy.x, enemy.y)
      this.countPoints(enemy)
      this.pickUpsStats(enemy)

      this.waveKilled++
    }
  }



  spawnStats(objectSpawn) {
    if (objectSpawn === 'heal') {
      this.healBlock++
    }
    else if (objectSpawn === 'coin') {
      this.coinsBlock++
    }
  }

  // Puts information under the category Stats 
  pickUpsStats(object) {
    if (object.type === 'heal') {
      if (this.player.lives < this.player.maxLives) {
        this.player.lives += 1
      }
      this.healPickups++
      this.healBlock--
    }
    else if (object instanceof Enemy) {
      this.enemyKills++
    }
    else if (object instanceof Pumpkin) {
      this.enemyKills++

    }
    else if (object.type === 'coin') {
      this.coins += object.coinWorth
      this.coinsBlock--
    }
  }

  countCoins(coinsWorth, coinSpawnChans, enemyX, enemyY) {
    let spawn = (Math.random() * (10 - 1 + 1) + 1) * coinSpawnChans
    if (spawn > 5) {
      let x = enemyX
      let y = enemyY


      let newCoin = new Coins(this, x, y, 13 * 2, 16 * 2, coinsWorth, this.coinIncrease)
      this.pickUpsArray.push(newCoin)
      let objectSpawn = this.pickUpsArray[this.pickUpsArray.length - 1]
      this.spawnStats(objectSpawn.type)

    }
  }

  // Puts points in points
  countPoints(enemy) {
    this.points += enemy.points
  }

  // Damage the player 
  damagePlayer(enemy) {
    this.player.lives -= enemy.damage
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
    if (object2 instanceof Enemy) {
      return (
        object1.x < object2.x + (object2.width - 5) &&
        object1.x + (object1.width - 5) > object2.x &&
        object1.y < object2.y + (object2.height - 5) &&
        object1.height + object1.y > object2.y
      )
    } else {
      return (
        object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.height + object1.y > object2.y
      )
    }
  }

  checkSmartCollision(object1, object2, deltaTime) {
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
          this.player.x += this.player.maxSpeed * (deltaTime / 1000)
        }
        else {
          // Right side collision
          this.player.x -= this.player.maxSpeed * (deltaTime / 1000)

        }
      }
      else {
        // Collision along the Y axis.
        if (this.depthY > 0) {
          // Top side collision
          this.player.y += this.player.maxSpeed * (deltaTime / 1000)

        }
        else {
          // Bottom side collision
          this.player.y -= this.player.maxSpeed * (deltaTime / 1000)

        }
      }
    }
  }

}

import Button from "./Button"
import UpgradeButton from "./UpgradeButton"

export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.white = 'white'
    this.black = 'black'
    this.blue = 'blue'
    this.

      //stats window
      this.statWindow = false
    // buttons 
    this.startGameButton
    this.statsButton
    this.backButton
    this.gameOverButton
    this.menuButton

    // Upgrade Screen 
    this.upgradeScreenButtons = []
    this.damageButton // X
    this.attackSpeedButton // X
    this.movementSpeedButton // X
    this.maxHPButton // X
    this.maxAmmoButton // X
    this.ammoRegenIncreaseButton // X
    this.coinIncreaseButton // X

    this.feeDamage = 10
    this.feeAttackSpeed = 20
    this.feeMovement = 20
    this.feeHp = 10
    this.feeMaxAmmo = 5
    this.feeAmmoRegen = 30
    this.feeCoin = 50




    window.addEventListener('mousedown', (event) => {
      if (!this.game.startGame && !this.statWindow) {
        if (this.isInsideButton(this.startGameButton.x, this.startGameButton.y, this.startGameButton.width, this.startGameButton.height)) {
          this.game.startGame = true
        }
        else if (this.isInsideButton(this.statsButton.x, this.statsButton.y, this.statsButton.width, this.statsButton.height)) {
          this.statWindow = true
        }
      }
      else if (!this.game.startGame && this.statWindow) {
        if (this.isInsideButton(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height)) {
          this.statWindow = false
        }
      }

      if (this.game.startGame && this.game.upgradeScreen) {
        this.upgradeScreenButtons.forEach(element => {
          if (this.isInsideButton(element.x, element.y, element.width, element.height)) {
            this.upgradeScreenButtonCheck(element)
          }
        });
      }


      if (this.game.gameOver) {
        if (this.isInsideButton(this.gameOverButton.x, this.gameOverButton.y, this.gameOverButton.width, this.gameOverButton.height)) {
          this.game.gameReset = true
        }
        else if (this.isInsideButton(this.menuButton.x, this.menuButton.y, this.menuButton.width, this.menuButton.height)) {
          this.game.startGame = false
          this.game.gameOver = false
          this.game.gameReset = true
        }
      }
    })
  }

  draw(context) {
    context.save()
    context.fillStyle = this.white
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = this.black

    // draw game over 
    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 100
      )
      this.gameOverButton = new Button(
        this.game,
        context,
        this.game.width / 2 - 100,
        this.game.height / 2 + 30,
        200,
        50,
        'Start Over',
        this.white,
        this.black,
        35,
        this.fontFamily,
        0,
        10
      )

      this.menuButton = new Button(
        this.game,
        context,
        this.game.width / 2 - 100,
        this.game.height / 2 + 120,
        200,
        50,
        'Main Menu',
        this.white,
        this.black,
        35,
        this.fontFamily,
        0,
        10
      )

    }

    // when the game has not started 
    if (!this.game.startGame && !this.statWindow) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Starting screen',
        this.game.width / 2,
        this.game.height / 2 - 200
      )
      this.startGameButton = new Button(
        this.game,
        context,
        this.game.width / 2 - 100,
        this.game.height / 2 + 30,
        200,
        50,
        'Start Game',
        this.white,
        this.black,
        35,
        this.fontFamily,
        0,
        10
      )
      this.statsButton = new Button(
        this.game,
        context,
        this.game.width / 2 - 100,
        this.game.height / 2 + 120,
        200,
        50,
        'Player Stats',
        this.white,
        this.black,
        35,
        this.fontFamily,
        0,
        10
      )
    }

    // Stat Window
    else if (!this.game.startGame && this.statWindow) {
      this.data = this.getData()
      context.fillStyle = this.blue;
      context.fillRect(190, 50, 900, 600);
      context.fillStyle = this.black;
      context.textAlign = 'middle';
      context.font = `45px ${this.fontFamily}`;

      context.fillStyle = this.white
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Your Statistics',
        this.game.width / 2,
        this.game.height / 2 - 200
      )

      context.textAlign = 'center'
      context.font = `${this.fontSize}px ${this.fontFamily}`
      context.fillText(`Time played: ${(this.data[0].playTime * 0.001).toFixed(0)} sek`, this.game.width / 2, 225)
      context.fillText(`All time Coins: ${this.data[0].coins}`, this.game.width / 2 - 15, 275)
      context.fillText(`All time points: ${this.data[0].points}`, this.game.width / 2 - 13, 325)
      context.fillText(`All time kills: ${this.data[0].kills}`, this.game.width / 2 - 25, 375)
      context.fillText(`All time heals: ${this.data[0].heals}`, this.game.width / 2 - 16, 425)


      this.backButton = new Button(
        this.game,
        context,
        this.game.width / 2 - 100,
        this.game.height / 2 + 200,
        200,
        50,
        'Back',
        this.white,
        this.black,
        35,
        this.fontFamily,
        0,
        10
      )
    }

    // when game is running 
    if (this.game.startGame) {
      // stats in the left
      context.textAlign = 'left'
      context.font = `${this.fontSize}px ${this.fontFamily}`
      context.fillText(`Wave: ${this.game.wave}`, 30, 50)
      context.fillText(`Lives: ${this.game.player.lives}`, 30, 90)
      context.fillText(`Ammo: ${this.game.player.ammo}`, 30, 130)
      context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 30, 170)
      context.fillText(`Points: ${this.game.points}`, 30, 210)
      context.fillText(`Coins ${this.game.coins}`, 30, 250)


      // When you press u 
      if (this.game.upgradeScreen) {
        context.fillStyle = this.blue;
        context.fillRect(190, 25, 900, 650);
        context.fillStyle = this.black;

        context.fillStyle = this.white
        context.textAlign = 'center'
        context.font = `50px ${this.fontFamily}`
        context.fillText(
          'Upgrade Screen',
          this.game.width / 2,
          this.game.height / 2 - 250
        )
        this.damageButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 - 400,
          this.game.height / 2 - 220,
          450,
          50,
          'Damage',
          'Increase your weapon Damage by 0.5',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          25,
          10,
          'DAIN',
          this.feeDamage
        )

        this.attackSpeedButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 - 400,
          this.game.height / 2 - 110,
          450,
          50,
          'Attack Speed',
          'Increase your Attack Speed by 30',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          25,
          10,
          'ATSP',
          this.feeAttackSpeed
        )

        this.movementSpeedButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 - 400,
          this.game.height / 2,
          500,
          50,
          'Movement Speed',
          'Increase your Movement Speed by 1',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          0,
          10,
          'MOSP',
          this.feeMovement
        )

        this.maxHPButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 + 10,
          this.game.height / 2 - 220,
          500,
          50,
          'Max HP',
          'Increase your Max Hp by 2',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          0,
          10,
          'MAHP',
          this.feeHp
        )

        this.maxAmmoButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 + 10,
          this.game.height / 2 - 110,
          500,
          50,
          'Max Ammo',
          'Increase your Ammo capacity by 2 ',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          0,
          10,
          'MAAM',
          this.feeMaxAmmo
        )

        this.ammoRegenIncreaseButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 + 10,
          this.game.height / 2,
          500,
          50,
          'Ammo Regen',
          'Increase your Ammo Regen by 1',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          0,
          10,
          'AMREIN',
          this.feeAmmoRegen
        )

        this.coinIncreaseButton = new UpgradeButton(
          this.game,
          context,
          this.game.width / 2 - 200,
          this.game.height / 2 + 110,
          500,
          50,
          'More Coins',
          'Increase Coin value by 1',
          5,
          25,
          this.white,
          this.black,
          30,
          this.fontFamily,
          0,
          10,
          'COIN',
          this.feeCoin
        )

        this.backButton = new Button(
          this.game,
          context,
          this.game.width / 2 - 100,
          this.game.height / 2 + 250,
          200,
          50,
          'Back',
          this.white,
          this.black,
          35,
          this.fontFamily,
          0,
          10
        )
        this.upgradeScreenButtons.splice(0, this.upgradeScreenButtons.length);
        this.upgradeScreenButtons.push(this.damageButton, this.attackSpeedButton, this.movementSpeedButton, this.maxHPButton, this.maxAmmoButton, this.ammoRegenIncreaseButton, this.coinIncreaseButton, this.backButton)
      }

    }

    // debug display 
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
      context.fillText(`Enemies: ${this.game.enemies.length}`, this.game.width - 20, 175)
      context.fillText(`Pickups: ${this.game.pickUpsArray.length}`, this.game.width - 20, 200)

      //stats
      context.fillText(`Kills: ${this.game.enemyKills}`, this.game.width - 20, 225)
      context.fillText(`Heals: ${this.game.healPickups}`, this.game.width - 20, 250)
      context.fillText(`Coin blocks: ${this.game.coinsBlock}`, this.game.width - 20, 275)

    }

    context.restore()
  }

  isInsideButton(x, y, width, height) {
    if (this.game.input.mouseX > x && this.game.input.mouseX < x + width && this.game.input.mouseY > y && this.game.input.mouseY < y + height) {
      return (true)
    }
  }
  getData() {
    return JSON.parse(localStorage.getItem('data')) || [{ playTime: 0, coins: 0, points: 0, kills: 0, heals: 0 }]
  }
  upgradeScreenButtonCheck(element) {
    if (element instanceof Button) {
      this.game.upgradeScreen = false
    } else {
      this.shopLogic(element)
    }
  }
  shopLogic(element) {
    if (this.game.coins >= element.fee) {
      this.game.coins -= element.fee
      switch (element.typ) {
        case 'DAIN':
          this.game.player.damageIncrease += 0.5
          this.feeDamage += 2
          break;
        case 'ATSP':
          this.game.player.attackSpeedIncrease += 30
          this.feeAttackSpeed += 2
          break;
        case 'MOSP':
          this.game.player.movementSpeedIncrease += 1
          this.feeMovement += 2
          break;
        case 'MAHP':
          this.game.player.maxHPIncrease += 2
          this.feeHp += 2
          break;
        case 'MAAM':
          this.game.player.maxAmmoIncrease += 2
          this.feeMaxAmmo += 2
          break;
        case 'AMREIN':
          this.game.player.ammoRegenIncrease += 1
          this.feeAmmoRegen += 2
          break;
        case 'COIN':
          this.game.coinIncrease += 1
          this.feeCoin += 50
          break;
      }
    }
    else {
      console.log("You are POOR! Get more Coins!")
    }
  }

}

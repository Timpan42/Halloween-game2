import Button from "./Button"

export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.white = 'white'
    this.black = 'black'
    this.startGameButton
    this.gameOverButton



    window.addEventListener('mousedown', (event) => {
      if (!this.game.startGame) {
        if (this.isInsideButton(this.startGameButton.x, this.startGameButton.y, this.startGameButton.width, this.startGameButton.height)) {
          this.game.startGame = true
        }
      }

      if (this.game.gameOver) {
        if (this.isInsideButton(this.gameOverButton.x, this.gameOverButton.y, this.gameOverButton.width, this.gameOverButton.height)) {
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
      context.fillStyle = this.white;
    }

    // when the game has not started 
    if (!this.game.startGame) {
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
        'Start',
        this.white,
        this.black,
        40,
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

    }

    context.restore()
  }

  isInsideButton(x, y, width, height) {
    if (this.game.input.mouseX > x && this.game.input.mouseX < x + width && this.game.input.mouseY > y && this.game.input.mouseY < y + height) {
      return (true)
    }
  }
}

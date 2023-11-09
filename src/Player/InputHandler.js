export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd' ||
          event.key === 'W' ||
          event.key === 'A' ||
          event.key === 'S' ||
          event.key === 'D') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      if (event.key === 'u' || event.key === 'U') {
        this.game.upgradeScreen === false ? this.game.upgradeScreen = true : this.game.upgradeScreen = false
        this.game.mainSong.decreaseVolume()
        this.game.player.update
      }

      if (event.key === 'p' || event.key === 'P') {
        this.game.debug = !this.game.debug
      }

      if (event.key === '1') {
        this.game.player.useTrippelShot = false
        this.game.player.useDoubleShot = false
      } else if (event.key === '2') {
        this.game.player.useTrippelShot = false
        this.game.player.useDoubleShot = true
      } else if (event.key === '3') {
        this.game.player.useTrippelShot = true
        this.game.player.useDoubleShot = false
      }
    })

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
        this.shootTimer = 0
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', (event) => {
      if (this.game.player.canShoot) {
        if (this.game.player.useTrippelShot) {

          this.game.player.trippelShot.shoot(this.mouseX, this.mouseY)
        }
        else if (this.game.player.useDoubleShot) {
          this.game.player.doubleShot.shoot(this.mouseX, this.mouseY)
        } else {
          this.game.player.weapon.shoot(this.mouseX, this.mouseY)
        }

      }
    })
  }
}

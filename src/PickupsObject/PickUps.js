export default class PickUps {
    constructor(game, image, x, y, width, height) {
        this.game = game
        this.x = x
        this.y = y
        this.markedForDeletion = false
        this.image = new Image()
        this.image.onload = () => {
            this.width = width
            this.height = height
        }
        this.image.src = image

        this.markedForDeletion = false
        this.type = 'pickup'
    }

    update() {
        if (this.x < 0 || this.x > this.game.width) this.markedForDeletion = true
        if (this.y < 0 || this.y > this.game.height) this.markedForDeletion = true
    }

    draw(context) {
        if (this.image.complete && this.width && this.height) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Arial'
            context.fillText(this.lives, this.x, this.y - 5)
            context.font = '12px Arial'
            context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
            context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
        }
    }
}

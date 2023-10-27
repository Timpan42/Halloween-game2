export default class Object {
    constructor(game, color) {
        this.game = game
        this.x = 0
        this.y = 0
        this.color = color
        this.type = 'object'
    }

    draw(context) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)

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
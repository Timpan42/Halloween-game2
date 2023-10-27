import Object from "./Object";

export default class Wall extends Object {
    constructor(game, width, height, x, y) {
        super(game)
        this.game = game
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.color = '#08f'
        this.type = 'wall'
    }
}
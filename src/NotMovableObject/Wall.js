import Object from "./Object";

export default class Wall extends Object {
    constructor(game, width, height, x, y) {
        super(game)
        this.game = game
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.color = '#640080'
        this.type = 'wall'

        //For collision 
        this.halfW = this.width / 2
        this.halfH = this.height / 2
        this.centerX = x + this.halfW
        this.centerY = y + this.halfH


    }
}
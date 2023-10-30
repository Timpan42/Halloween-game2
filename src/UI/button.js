export default class button {
    constructor(game, x, y, width, height, text, fillColor, textColor, font) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.text = text
        this.fillColor = fillColor
        this.textColor = textColor
        this.fontFamily = font
    }

    draw(context) {
        context.fillStyle = this.fillColor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.textColor;
        context.textAlign = 'middle';
        context.font = `25px ${this.fontFamily}`;
        context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
    }
}
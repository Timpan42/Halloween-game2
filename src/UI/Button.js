export default class Button {
    constructor(game, context, x, y, width, height, text, fillColor, textColor, font) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        context.fillStyle = fillColor;
        context.fillRect(x, y, width, height);
        context.fillStyle = textColor;
        context.textAlign = 'center';
        context.font = `25px ${font}`;
        context.fillText(text, x + width / 2, y + height / 2 + 5, width);
    }
}
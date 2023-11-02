export default class UpgradeButton {
    constructor(game, context, x, y, width, height, text, botText, botTextX, botTextY, fillColor, textColor, fontSize, font, textXFix, textYFix) {
        this.game = game
        this.x = x
        this.y = y
        this.width = 400
        this.height = 100
        context.fillStyle = fillColor;
        context.fillRect(x, y, this.width, this.height);
        context.fillStyle = "black";
        context.fillRect(x + 10, y + 10, this.width / 4, this.height - 20);
        context.fillStyle = textColor;
        context.textAlign = 'middle';
        context.font = `${fontSize}px ${font}`;
        context.shadowColor = 'transparent'
        context.fillText(text, x + width / 2 + textXFix, y + height / 2 + textYFix, width);
        context.font = `${fontSize - 5}px ${font}`;
        context.fillText(botText, (x + width / 2 + textXFix) + 20, (y + height / 2 + textYFix) + 25, width);

        //Reset
        context.shadowColor = this.game.ui.black
        context.fillStyle = this.game.ui.white;

    }
}
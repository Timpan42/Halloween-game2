export default class UpgradeButton {
    constructor(game, context, x, y, width, height, text, botText, botTextX, botTextY, fillColor, fillColorSmall, textColor, fontSize, font, textXFix, textYFix, typ, fee) {
        this.game = game
        this.x = x
        this.y = y
        this.width = 400
        this.height = 100
        this.typ = typ
        this.fee = fee
        context.fillStyle = fillColor;
        context.fillRect(x, y, this.width, this.height);
        context.fillStyle = fillColorSmall;
        context.fillRect(x + 10, y + 10, this.width / 4, this.height - 20);
        context.fillStyle = textColor;
        context.textAlign = 'middle';
        context.font = `${fontSize}px ${font}`;
        context.shadowColor = 'transparent'
        context.fillText(text, x + width / 2 + textXFix, y + height / 2 + textYFix, width);
        context.font = `${fontSize - 14}px ${font}`;
        context.fillText(botText, (x + width / 2 + textXFix) + botTextX, (y + height / 2 + textYFix) + botTextY, width);
        context.font = `${fontSize - 10}px ${font}`;
        context.fillText(this.fee + ' coins', (x + width / 2 + textXFix), (y + height / 2 + textYFix) + 55, width);


        //Reset
        context.shadowColor = this.game.ui.black
        context.fillStyle = this.game.ui.white;

    }
}
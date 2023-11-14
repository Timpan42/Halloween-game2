import Sound from "./Sound";
import audio from "./../assets/audio/mouse-click.mp3"

export default class ButtonClickSound extends Sound {
    constructor(game) {
        super(game, audio)
        this.soundVolume = 1
    }
}
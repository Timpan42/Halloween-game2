import Sound from "./Sound";
import audio from "./../assets/audio/negative.mp3"

export default class UpgradeNo extends Sound {
    constructor(game) {
        super(game, audio)
        this.soundVolume = 1
    }
}
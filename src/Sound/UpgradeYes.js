import Sound from "./Sound";
import audio from "./../assets/audio/positive.mp3"

export default class UpgradeYes extends Sound {
    constructor(game) {
        super(game, audio)
        this.soundVolume = 1
    }
}
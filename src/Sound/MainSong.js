import Sound from "./Sound";
import audio from "./../assets/audio/metal-dark-matter-111451.mp3"

export default class MainSong extends Sound {
    constructor(game) {
        super(game, audio)
    }
}
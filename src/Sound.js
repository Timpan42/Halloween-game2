import aurl from './assets/audio/metal-dark-matter-111451.mp3'

export default class Sound {
    constructor(game) {
        this.game = game
        const a = new Audio()
        a.src = aurl
        this.gameSong = a
        this.duration
    }
    playSong() {
        this.duration = this.gameSong.duration
        this.gameSong.currentTime = 0
        this.gameSong.volume = 0.6
        this.gameSong.play()
    }

}
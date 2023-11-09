
export default class Sound {
    constructor(game, audio) {
        this.game = game
        const a = new Audio()
        a.src = audio
        this.gameSound = a
        this.duration
        this.soundVolume = 0.2
    }
    playSound() {
        this.duration = this.gameSound.duration
        this.gameSound.currentTime = 0
        this.gameSound.volume = this.soundVolume
        this.gameSound.play()
    }

    updateSound(volume) {
        this.soundVolume = volume
        this.gameSound.volume = this.soundVolume
    }

}
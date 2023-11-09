
export default class Sound {
    constructor(game, audio) {
        this.game = game
        const a = new Audio()
        a.src = audio
        this.gameSound = a
        this.gameSound.preload = 'auto'

        this.duration
        this.soundVolume = 0.2
        this.decreaseVolumeBoolean = false
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

    decreaseVolume() {
        if (!this.decreaseVolumeBoolean) {
            this.gameSound.volume = this.gameSound.volume / 2
            this.decreaseVolumeBoolean = true
        } else {
            this.gameSound.volume = this.gameSound.volume * 2
            this.decreaseVolumeBoolean = false
        }
    }

}
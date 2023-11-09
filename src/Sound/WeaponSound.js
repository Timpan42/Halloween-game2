
export default class WeaponSound {
    constructor(game, gunSound, switchSound) {
        this.game = game

        const gun = new Audio()
        gun.src = gunSound
        this.gameGunSound = gun
        this.gameGunSound.preload = 'auto'

        const switchS = new Audio()
        switchS.src = switchSound
        this.gameSwitchSound = switchS
        this.gameSwitchSound.preload = 'auto'

        this.duration
        this.soundVolume = 1
    }
    switchWeapon() {
        this.gameSwitchSound.currentTime = 0
        this.gameSwitchSound.volume = this.soundVolume
        this.gameSwitchSound.play()
    }

    playSound() {
        this.gameGunSound.currentTime = 0
        this.gameGunSound.volume = this.soundVolume
        this.gameGunSound.play()
    }

    updateSound(volume) {
        this.soundVolume = volume
        this.gameSound.volume = this.soundVolume
    }
}
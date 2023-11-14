import WeaponSound from "./WeaponSound"
import gunSound from "./../assets/audio/gun2-shoot.mp3"
import switchSound from "./../assets/audio/gun2-switch.mp3"

export default class Weapon2Sound extends WeaponSound {
    constructor(game) {
        super(game, gunSound, switchSound)
    }
}
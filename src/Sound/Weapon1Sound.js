import WeaponSound from "./WeaponSound"
import gunSound from "../assets/audio/gun1-shoot.mp3"
import switchSound from "../assets/audio/gun1-switch.mp3"

export default class Weapon1Sound extends WeaponSound {
    constructor(game) {
        super(game, gunSound, switchSound)
    }
}
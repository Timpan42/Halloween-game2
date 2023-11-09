import WeaponSound from "./WeaponSound"
import gunSound from "../assets/audio/gun3-shoot.mp3"
import switchSound from "../assets/audio/gun3-switch.mp3"

export default class Weapon3Sound extends WeaponSound {
    constructor(game) {
        super(game, gunSound, switchSound)
    }
}
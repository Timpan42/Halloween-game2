import Enemy from "./Enemy";

import image from '../assets/img/Bat.png'


export default class CandyEye extends Enemy {
    constructor(game, x, y, width, height, scaling) {
        super(game, image, 4, x, y, width, height)
        this.speed = 280 + Math.floor(1 * scaling)
        this.lives = Math.floor(Math.random() * (2 - 1 + 1) + 1) + Math.floor(1 * scaling)
        this.damage = 2 + Math.floor(1 * scaling)
        this.points = 30
        this.type = 'candyEye'
        this.coinMax = 5
        this.coinMin = 3
    }
}
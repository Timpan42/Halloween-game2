import Enemy from "./Enemy";

import image from '../assets/img/Bat.png'


export default class CandyEye extends Enemy {
    constructor(game, x, y, width, height) {
        super(game, image, 4, x, y, width, height)
        this.speed = 280
        this.lives = Math.floor(Math.random() * (2 - 1 + 1) + 1)
        this.damage = 2
        this.points = 30
        this.color = '#551d6e'
        this.type = 'candyEye'
        this.coinMax = 3
        this.coinMin = 1
    }
}
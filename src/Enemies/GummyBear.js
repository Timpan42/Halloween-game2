import Enemy from "./Enemy";

import image from '../assets/img/Were.png'

export default class GummyBear extends Enemy {
    constructor(game, x, y, width, height) {
        super(game, image, 4, x, y, width, height)
        this.speed = 1.5
        this.lives = Math.floor(Math.random() * (6 - 3 + 1) + 3)
        this.damage = 3
        this.points = 20
        this.color = '#b50d0f'
        this.type = 'gummyBear'
        this.coinMax = 5
        this.coinMin = 2
    }
}
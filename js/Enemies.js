/*
 * Enemy.js - Simple enemy class (not used in our kitten hide game yet,
 * but fixed so it works without errors)
 */

import GameObject from "../engine/gameobject.js";   // fixed path: gameObject -> gameobject
import Renderer from "../engine/renderer.js";
import { images } from "../engine/resources.js";       // fixed path and name
import Physics from "../engine/physics.js";            // added import (needed for Physics)

class Enemy extends GameObject {                    // fixed: "extends{" -> "extends GameObject"
    constructor(x, y, width, height) {               // fixed parameters: h,w -> width,height
        super(x, y);                                 // call parent constructor

        // Add renderer with white color and enemy image
        this.addComponent(new Renderer("white", width, height, images.enemy));

        // Add physics (no velocity or gravity for now)
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
    }

    update(deltaTime) {
        super.update(deltaTime);  // important: update all components

        // Example: simple walk left and right (you can turn it on later)
        this.walk(deltaTime);

        // Check collision with player (if there is one)
        this.playerCollision();
    }

    // Simple left-right walking (not active yet, but ready)
    walk(deltaTime) {
        let physics = this.getComponent(Physics);

        // Example movement - you can change or remove later
        physics.velocity.x = 50;  // move right (change to -50 for left)
    }

    // Check if this enemy touches the player
    playerCollision() {
        let physics = this.getComponent(Physics);

        // Find the player in the game
        let player = this.game.gameObjects.find(obj => obj instanceof Player);

        if (player) {
            let playerPhysics = player.getComponent(Physics);
            if (physics.isColliding(playerPhysics)) {
                // Tell the player it hit an enemy
                player.collidingWithEnemy();  // assuming player has this method
            }
        }
    }
}

export default Enemy;  // fixed: "export default enemy" -> "export default Enemy"
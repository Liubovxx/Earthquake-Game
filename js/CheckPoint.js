/*
 * Checkpoint.js - A special place in the game
 * When the player (kitten) touches it, we remember this spot
 * (Not really needed in our "hide from earthquake" game,
 * but fixed so it works without errors)
 */

import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";

class Checkpoint extends GameObject {
    
    // Constructor - runs when we create a new checkpoint
    constructor(x, y, width, height) {
        super(x, y);                    // call parent with position

        // Save size
        this.width = width;
        this.height = height;

        // Add physics (so we can detect collision)
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));

        // Add renderer - draws a red rectangle so we can see the checkpoint
        this.addComponent(new Renderer("red", width, height));

        // Remember this checkpoint as the last one
        this.setCheckpoint(this);
    }

    // This function saves this checkpoint as the current one
    setCheckpoint(checkpointObject) {
        // We save it on the game or player so we can use it later
        // Example: save on the game (if your game has a place to store it)
        if (this.game) {
            this.game.lastCheckpoint = checkpointObject;
        }
    }

    // Optional: check if player touches this checkpoint
    update(deltaTime) {
        super.update(deltaTime);   // update components

        // Find the player
        const player = this.game.gameObjects.find(obj => obj instanceof Player);

        if (player) {
            const myPhysics = this.getComponent(Physics);
            const playerPhysics = player.getComponent(Physics);

            // If player touches checkpoint - save it
            if (myPhysics.isColliding(playerPhysics)) {
                this.setCheckpoint(this);
                console.log("Checkpoint reached!");
            }
        }
    }
}

export default Checkpoint;



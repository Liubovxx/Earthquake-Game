/*
 * GameUI.js - Shows text and timer on the screen
 * Used in our kitten earthquake game
 * Displays: countdown timer, big instructions, win/lose message
 */

import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";

class GameUI extends GameObject {
    
    // Constructor - creates the UI object
    // We don't need x,y position because UI is drawn over everything
    constructor() {
        super(0, 0);  // position doesn't matter for UI

        // We will use a custom renderer to draw text
        this.textRenderer = {
            draw: (ctx) => {
                // Get info from the game manager (we will add this later)
                // For now, just show example text
                ctx.font = "bold 60px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 6;

                // Example: show timer (you will replace this with real timer later)
                ctx.strokeText("15", 400, 100);
                ctx.fillText("15", 400, 100);

                // Example: big message in the middle
                ctx.font = "bold 100px Arial";
                ctx.strokeText("HIDE NOW!", 400, 300);
                ctx.fillStyle = "yellow";
                ctx.fillText("HIDE NOW!", 400, 300);

                // Example: win message
                // ctx.fillStyle = "lightgreen";
                // ctx.fillText("Safe! Great job! 🐱", 400, 300);
            }
        };

        // Add the text drawer as a component
        this.addComponent(this.textRenderer);
    }

    // Optional: later you can add a function to change the text
    // Example:
    // setMessage(newText) { this.currentMessage = newText; }
}

export default GameUI;

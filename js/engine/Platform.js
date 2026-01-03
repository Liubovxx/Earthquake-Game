/*
 * Platform.js - This class is for furniture that the kitten can hide under
 * In our game: table and bed are the "platforms" (safe places)
 * The kitten must be dragged under them during the earthquake
 */

import GameObject from "../engine/gameobject.js";
import Resources from "../engine/resources.js";  // This loads images from the assets folder

// Platform class - one object = one piece of furniture (table or bed)
class Platform extends GameObject {
    
    // Constructor - runs when we create a new platform
    // x, y = position on screen
    // width, height = size of the furniture
    // imageName = name of the picture (for example "table" or "bed")
    constructor(x, y, width, height, imageName) {
        super(x, y); // Call the parent class (GameObject) with position

        // Save size
        this.width = width;
        this.height = height;

        // We will draw the platform using a real image (not a colored rectangle)
        // Create a custom renderer
        const platformRenderer = {
            // This function will run every frame to draw the platform
            draw: (ctx) => {
                // Try to get the image from Resources (example: Resources.getImage("table"))
                const img = Resources.getImage(imageName);

                // If image is loaded and ready
                if (img && img.complete) {
                    ctx.drawImage(img, this.x, this.y, this.width, this.height);
                } else {
                    // If image is not ready yet - draw a simple brown rectangle (temporary)
                    ctx.fillStyle = "brown";
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
        };

        // Add the drawing function as a component
        this.addComponent(platformRenderer);

        // Give it a tag so we know this is a safe platform
        this.tag = "platform";
    }
}

// Export so other files (like Level.js) can use this class
export default Platform;

/*
 * Player.js - Controls the player character (the kitten or person you move)
 */

import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import Input from "../engine/input.js";
import Animator from "../engine/animator.js";       // For animations (walking, idle, etc.)
import Animation from "../engine/animation.js";     // One animation (list of images)

export default class Player extends GameObject {
    constructor(x, y) {
        super(x, y); // Create the player at position (x, y)

        // Player size
        this.width = 35;
        this.height = 50;

        // Simple blue rectangle at the beginning (later replaced by animations)
        this.renderer = new Renderer('blue', this.width, this.height);
        this.addComponent(this.renderer);

        // Physics: how the player moves and falls
        // velocity = current speed, acceleration = not used here, gravity = 300 (pulls down)
        this.physics = new Physics({ x: 0, y: 0 }, { x: 0, y: 300 }, { x: 0, y: 0 });
        this.addComponent(this.physics);

        // Input: listens to keyboard keys
        this.addComponent(new Input());

        // Tag to know this is the player (useful for collisions)
        this.tag = "player";

        // Which way the player is facing: 1 = right, -1 = left
        this.direction = 1;

        // Is the player standing on the ground?
        this.isOnPlatform = false;

        // Is the player currently jumping?
        this.jumping = false;

        // Player stats
        this.lives = 3;      // How many lives
        this.powerUp = 0;    // Power-up level (not used yet)
        this.score = 0;      // Player score

        // Jump settings
        this.jumpForce = 400;    // How strong the jump is
        this.jumpTime = 0.3;     // How long you can hold the jump button (seconds)
        this.jumpTimer = 0;      // Timer for variable jump height

        // Arrays to store images for animations
        this.walkImages = [];
        this.idleImages = [];

        // Create animator (will show walking/idle animations)
        this.animator = new Animator('white', this.width, this.height); // white = placeholder color

        // Replace the simple blue renderer with the animator
        this.replaceComponent(this.renderer, this.animator);

        // Load images for animations
        this.loadWalkAnimation();
        this.loadIdleAnimation();

        // Create the actual animations
        const walkAnimation = new Animation(this.walkImages, 10); // 10 frames per second
        const idleAnimation = new Animation(this.idleImages, 8);  // slower idle

        // Add animations to the animator by name
        this.animator.addAnimation("walk", walkAnimation);
        this.animator.addAnimation("idle", idleAnimation);

        // Start with idle animation
        this.animator.playAnimation("idle");
    }

    // This runs every frame
    update(deltaTime) {
        super.update(deltaTime); // Let all components update (important!)

        // Get components for easier use
        const input = this.getComponent(Input);
        const physics = this.getComponent(Physics);
        const animator = this.animator;

        let moving = false; // Will be true if player presses left or right

        // Move left
        if (input.isKeyDown("ArrowLeft") || input.isKeyDown("KeyA")) {
            physics.velocity.x = -150; // Move left
            this.direction = -1;       // Face left
            moving = true;
        }
        // Move right
        else if (input.isKeyDown("ArrowRight") || input.isKeyDown("KeyD")) {
            physics.velocity.x = 150;  // Move right
            this.direction = 1;        // Face right
            moving = true;
        }
        // Stop horizontal movement
        else {
            physics.velocity.x = 0;
        }

        // Start jump when player is on ground and presses jump key
        if ((input.isKeyDown("Space") || input.isKeyDown("ArrowUp") || input.isKeyDown("KeyW"))
            && this.isOnPlatform && !this.jumping) {
            this.startJump();
        }

        // Make jump higher if player holds the button
        if (this.jumping && this.jumpTimer > 0) {
            this.jumpTimer -= deltaTime; // Decrease timer
            // If still holding jump button - add extra upward force
            if (input.isKeyPressed("Space") || input.isKeyPressed("ArrowUp") || input.isKeyPressed("KeyW")) {
                physics.velocity.y -= this.jumpForce * deltaTime * 3;
            } else {
                this.jumpTimer = 0; // Stop extra force if button released
            }
        }

        // Choose correct animation
        if (this.isOnPlatform) { // On ground
            if (moving) {
                animator.playAnimation("walk");
            } else {
                animator.playAnimation("idle");
            }
        }

        // Flip the sprite when facing left
        animator.flipX = this.direction === -1;
    }

    // Called when player presses jump
    startJump() {
        this.jumping = true;
        this.jumpTimer = this.jumpTime;
        this.getComponent(Physics).velocity.y = -this.jumpForce; // Jump up
        this.isOnPlatform = false;
    }

    // Called from Physics or Platform when player lands on ground
    landOnPlatform() {
        this.isOnPlatform = true;
        this.jumping = false;
        this.jumpTimer = 0;
    }

    // Load walking images (walk1.png, walk2.png, etc.)
    loadWalkAnimation() {
        this.loadImagesForAnimation("walk", this.walkImages, 13); // 13 images
    }

    // Load standing images (idle1.png, idle2.png, etc.)
    loadIdleAnimation() {
        this.loadImagesForAnimation("idle", this.idleImages, 17); // 17 images
    }

    // Helper function to load images by name
    loadImagesForAnimation(animName, array, count = 13) {
        for (let i = 1; i <= count; i++) {
            const imgName = `${animName}${i}`; // Example: walk1, walk2...
            const image = Resources.getImage(imgName);
            if (image) {
                array.push(image);
            } else {
                console.warn(`Image ${imgName} not found!`);
            }
        }
    }
}


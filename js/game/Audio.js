/*
 * Audio.js - This file stores all game sounds
 * We create audio objects so we can play them later
 * (jump sound, collect sound, etc.)
 */

const AudioFiles = {
    // Jump sound - plays when the player jumps
    jump: new Audio("./resources/audio/jump.mp3"),

    // Collect sound - plays when the player picks up something (like a coin)
    collect: new Audio("./resources/audio/collect.mp3"),

    // You can add more sounds here later!
    // Example:
    // quake: new Audio("./resources/audio/quake.mp3"),
    // win: new Audio("./resources/audio/win.mp3"),
};

// Optional: make it easier to play sounds from other files
// Example usage: AudioPlayer.play("jump");
const AudioPlayer = {
    play(soundName) {
        if (AudioFiles[soundName]) {
            AudioFiles[soundName].currentTime = 0; // restart sound if playing
            AudioFiles[soundName].play();
        } else {
            console.warn("Sound not found: " + soundName);
        }
    },

    // Stop a sound (if needed)
    stop(soundName) {
        if (AudioFiles[soundName]) {
            AudioFiles[soundName].pause();
            AudioFiles[soundName].currentTime = 0;
        }
    }
};

// Export so other files can use the sounds
export { AudioFiles, AudioPlayer };



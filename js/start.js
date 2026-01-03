import GameEngine from "../engine/gameengine.js";
import Level from "../game/level.js";

const canvas = document.getElementById("gameCanvas");

// engine created
const engine = new GameEngine(canvas);

// level
const level = new Level("gameCanvas"); // передаємо ID canvas

// add all the objects
level.loadInto(engine);

// running game
engine.start();

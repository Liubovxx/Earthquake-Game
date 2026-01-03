/*
 * Level.js - The main game level for "Earthquake! Hide, Kitten!"
 * Here we create all objects: kitten, table, bed, manager, UI
 */

import GameObject from "../engine/gameobject.js";
import Input from "../engine/input.js";
import Renderer from "./KittenRenderer.js"; 
import dragKitten from "./DragComponent.js"; 
import Level from "./Level.js";
import start from "./start.js";

// downloud images
const Images = {
    room: new Image(),
    Player: new Image(),
    table: new Image(),
    bed: new Image()
};

Images.room.src = "./resources/images/room.jpg";     
Images.Player.src = "./resources/images/Player.jpg"; 
Images.table.src = "./resources/images/table.jpg";
Images.bed.src = "./resources/images/bed.jpg";

export default class Level {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        // array of all objects in the game
        this.gameObjects = [];

        // draw the picture
        this.addBackground();

        // create kitten
        this.kitten = this.createKitten();

        // create furniture
        this.table = this.createTable();
        this.bed = this.createBed();

        // create game manager
        this.gameManager = this.createGameManager();

        // add all the objects in the game
        this.gameObjects.push(this.kitten);
        this.gameObjects.push(this.table);
        this.gameObjects.push(this.bed);
        this.gameObjects.push(this.gameManager);

        
        this.addGameObject(new GameObject(10, 10)); 
        this.gameObjects.forEach(obj => {
        engine.addGameObject(obj); 
        });
    }

    // room backgound
     addBackground() {
        const bg = new GameObject(0, 0);
        bg.width = this.canvas.width;
        bg.height = this.canvas.height;

        const bgRenderer = new Renderer("white", bg.width, bg.height);
        bgRenderer.draw = (ctx) => {
            if (Images.room.complete) {
                ctx.drawImage(Images.room, 0, 0, this.canvas.width, this.canvas.height);
            } else {
                ctx.fillStyle = "#ffebee";  // гарний рожевий тимчасовий фон
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        };
        bg.addComponent(bgRenderer);

        // this row was missing
        this.addGameObject(bg);
    }
    
    createKitten() {
        const kitten = new GameObject(100, 450);
        kitten.width = 80;
        kitten.height = 80;

        kitten.addComponent(new KittenRenderer());      
        kitten.addComponent(new DragComponent());       

        return kitten;
    }

    
    createTable() {
        const table = new GameObject(150, 350);
        table.width = 200;
        table.height = 150;

        table.addComponent(new FurnitureRenderer("table")); // малює стіл
        table.addComponent(new SafeZone(50, 120, 180, 60)); // безпечна зона під столом

        return table;
    }

    
    createBed() {
        const bed = new GameObject(450, 300);
        bed.width = 300;
        bed.height = 200;

        bed.addComponent(new FurnitureRenderer("bed")); // малює ліжко
        bed.addComponent(new SafeZone(60, 160, 250, 80)); // безпечна зона під ліжком

        return bed;
    }

  

    
    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    // game update
    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime));
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.forEach(obj => obj.draw(this.ctx));
    }
    addBackground() {
    const bg = new GameObject(0, 0);
    bg.width = this.canvas.width;
    bg.height = this.canvas.height;

    const bgRenderer = new Renderer("white", bg.width, bg.height); 
    bgRenderer.image = Images.room; 

    bgRenderer.draw = (ctx) => { 
    if (Images.room.complete) {
      ctx.drawImage(Images.room, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      ctx.fillStyle = "#ffebee";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

    bg.addComponent(bgRenderer);

    
    this.addGameObject(bg); 
  }
  
    loadInto(engine) {
    this.gameObjects.forEach(obj => {
    engine.addGameObject(obj);
  });
}
 
    
}






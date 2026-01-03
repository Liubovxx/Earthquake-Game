/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import GameObject from "../engine/gameObject.js"
import Renderer from "../engine/renderer.js"
class Collectables extends GameObject{
constructor(x, y, img){
    this.renderer = new Renderer(`yellow`,25,25, img)
    this.addComponent(this.renderer);
    this.direction = -1;
    this.speed = 50;
    this.elapsedTime = 0;
}
update(deltaTime){
    if(this.elipsedTime > 1)
    {
        this.HDdirection *=-1;
        this.elapsedTime *=-1;
        
    }
    this.y += this.HDdirection * this.speed * deltaTime;
    this.elapsedTime += deltaTime;
    
}
emitPracticles(collectable)
{
    let practicleSystem = new PracticleSystem(collectable.x, collectable.y, `yellow`, 20, 1, 0.5);
    this.gameaddGameObject(practicleSystem);
}
collect(collectable){
    this.score += collectable.value;
    console.log("Score: ${this.score}");
    this.speed *= 2;
    this.hasPowerUp = true;
    //collisions with collectables;
    const collectables = this.gameaddGameObject.filter.obj
}
}
export default Collectable




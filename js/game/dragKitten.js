/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import Component from "../engine/component.js";
import Input from "../engine/input.js";   

class DragKitten extends Component {
    update(deltaTime) {
        // click on mice and drag the kitten
        if (Input.mouseDown && Input.mouseOver(this.gameObject)) {
            this.gameObject.x = Input.mouseX - 30; 
            this.gameObject.y = Input.mouseY - 30;
        }
    }
}

export default DragKitten;



import CanvasObject from "../canvasObject.js";
import Vector from "../vector.js";

export default class Menu extends CanvasObject{
    constructor(canvas, buttons = new Array(0), texts = new Array(0), selectors = new Array(0)) {
        super(canvas, new Vector(0,0), new Vector(canvas.width,canvas.height));
        this.buttons = buttons;
        this.texts = texts;
        this.selectors = selectors;
    }
    draw(){
        if(this.buttons != null){
            this.buttons.forEach(button => {
                button.draw();
            });
        }
        if(this.texts != null){
            this.texts.forEach(text => {
                text.draw_center();
            });
        }
        if(this.selectors != null){
            this.selectors.forEach(selector => {
                selector.draw();
            });
        }
    }
    handleClick(pos){  
        for(let i = 0; i < this.buttons.length;i++){
            if(this.buttons[i].is_pressed(pos)) {
                let result = this.buttons[i].action();
                if(result === undefined) break;
                return result;
            }
        }           
        for(let i = 0; i < this.selectors.length;i++){
            if(this.selectors[i].handleClick(pos)) {
                break;
            }
        }   
        return this;
    }
}
import Button from "../button.js";
import CanvasObject from "../canvasObject.js";
import MainMenu from "../menus/main_menu.js";
import TextBlock from "../text_block.js";
import Vector from "../vector.js";

export default class LevelPanel extends CanvasObject{
    constructor(canvas, pos, size, elem){
        super(canvas,pos,size);
        this.elem = elem;
        this.elem_size = Math.min (size.x / 3,size.y / 5);
        this.score = 0;
        this.lives = 3;
        this.time = 30;
        this.texts = new Array(4);
        this.texts[0] = new TextBlock(canvas, new Vector(this.size.x/2, this.size.y/3 - this.elem_size/2 - 10), "Find this element:",24);
        this.texts[1] = new TextBlock(canvas, new Vector(this.size.x/2, this.size.y/3 + this.elem_size/2 + 20), "Score: " + this.score,24);
        this.texts[2] = new TextBlock(canvas, new Vector(this.size.x/2, this.size.y/3 + this.elem_size/2 + 40), "Lives: " + this.lives,24);
        this.texts[3] = new TextBlock(canvas, new Vector(this.size.x/2, this.size.y/3 + this.elem_size/2 + 60), "Time: " + this.time,24);
        this.button = new Button(new Vector(this.size.x*3/4,this.size.y*11/12), new Vector(this.size.x/3,this.size.y/12),"Main Menu", ()=>{return new MainMenu(canvas)});
    }
    draw() {
        let context = this.canvas.getContext("2d");
        context.save();
        context.translate(this.pos.x, this.pos.y);  
        context.beginPath();
        context.save();
        this.texts[1].text = "Score: " + this.score;
        this.texts[2].text = "Lives: " + this.lives;
        this.texts[3].text = "Time: " + this.time;
        this.button.draw();
        this.texts.forEach(text => {
            text.draw_center();
        });
        context.lineWidth = "2";
        context.strokeStyle = "black";
        context.rect(0,0, this.size.x, this.size.y);
        context.closePath();
        context.stroke();
        context.restore();
        this.elem.draw(this.elem_size, new Vector(this.size.x/2 - this.elem_size/2, this.size.y/3 - this.elem_size/2));
        context.stroke();
        context.restore();
    }
    handleClick(pos){
        let rel_pos = new Vector(pos.x - this.pos.x, pos.y - this.pos.y);
        if(this.button.is_pressed(rel_pos))
            return this.button.action();
        return null;
    }
}
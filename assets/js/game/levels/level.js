import Vector from "../vector.js";
import ElementFactory from "../element_factory.js";
import LevelPanel from "./levelpanel.js";
import CanvasObject from "../canvasObject.js";
import GameOver from "../menus/game_over.js";
export default class Level extends CanvasObject{
    constructor(canvas, starting_element_count, elem_size, color_cnt, lives = 3, indent = 10, grid){
        super(canvas, new Vector(0,0), new Vector(canvas.width,canvas.height));
        this.elem_cnt = starting_element_count;
        this.elem_size = elem_size;
        this.color_cnt = color_cnt;
        this.grid = grid;
        this.grid.set_elements(ElementFactory.generateUniqueElements(this.elem_cnt,this.elem_size,this.color_cnt));
        this.elem_id = Math.floor(Math.random() * this.grid.elems.length);
        this.levelPanel = new LevelPanel(canvas, new Vector(this.canvas.width*0.6 + indent, indent), new Vector(this.canvas.width * 0.4 - indent * 2, this.canvas.height - indent * 2), this.grid.elems[this.elem_id]);     
        this.timeout = false;
        this.timer = setInterval(()=>{
            this.levelPanel.time-= 1;
             if(this.levelPanel.time <=0){
                this.timeout = true;
                clearInterval(this.timer);
             }
             },
             1000);
    }
    draw(){
        this.grid.draw();
        this.levelPanel.draw();
    }
    handleClick(pos){
        let elem_id = this.grid.handleClick(pos);
        if(elem_id == this.elem_id){
            this.levelPanel.score+= Math.max(1,(Math.floor(this.elem_cnt/5) + Math.floor(this.elem_size/2) + Math.floor(this.color_cnt/3)))*this.scoreMultiplier;
            if(this.levelPanel.score%5 == 0) this.elem_cnt++;
            if(this.levelPanel.score%10 == 0) this.color_cnt++;
            if(this.levelPanel.score%20 == 0) this.elem_size++;
            this.grid.set_elements(ElementFactory.generateUniqueElements(this.elem_cnt,this.elem_size,this.color_cnt));
            this.elem_id = Math.floor(Math.random() * this.grid.elems.length);
            this.levelPanel.elem = this.grid.elems[this.elem_id];
        } else {
            if(elem_id != -1){
                this.levelPanel.lives--;
                if(this.levelPanel.lives <= 0){
                    return new GameOver(this.canvas,this.levelPanel.score);
                }
            } else {
                let result = this.levelPanel.handleClick(pos);
                if(result != null){
                    return result;
                }
            }
        }
        return this.timeout ? new GameOver(this.canvas,this.levelPanel.score) : this;
    }
}
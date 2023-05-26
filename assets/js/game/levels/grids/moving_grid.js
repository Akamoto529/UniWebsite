import CanvasObject from "../../canvasObject.js";
import Vector  from "../../vector.js";
export default class MovingGrid extends CanvasObject{
    constructor(canvas, pos, size) {
        super(canvas, pos, size);
        this.indent = 10;
        this.movementSpeed = 5;
    }
    handleClick(pos){;
        for(let i = 0; i < this.elems.length; i++){
            let elem = this.elems[i];
            if(pos.y >= elem.pos.y && pos.y <=elem.pos.y + this.elem_size){
                if(elem.pos.x + this.elem_size> this.size.x){
                    let left_length =  this.size.x - elem.pos.x;
                    let right_length = this.elem_size - left_length;             
                    if(pos.x >= elem.pos.x && pos.x <=this.size.x){
                        return i;
                    }
                    if(pos.x >= 0 && pos.x <=right_length){
                        return i;
                    }
                } else {
                    if(pos.x >= elem.pos.x && pos.x <=elem.pos.x + this.elem_size ){
                        return i;
                    }
                }
            }

        } 
        return -1;
  }
    set_elements(elems){
        this.elems = elems;
        for(let i = 0; i < this.elems.length;i++){
            elems[i].movementSpeed = 5;
        }
        this.calculate_positions();
    }
    calculate_positions(){
        this.row_cnt = 1;
        this.elem_size = 0;
        for(let i = 1; i < this.elems.length;i++){
            let elems_per_row = (Math.ceil(this.elems.length/i));
            let maxX = Math.floor((this.size.x - (elems_per_row)*this.indent)/elems_per_row);
            let maxY = Math.floor((this.size.y - i*this.indent)/i);
            let newElemSize = Math.min(maxX,maxY);
            if(newElemSize >this.elem_size){
                this.elem_size = newElemSize;
                this.row_cnt = i;
            }
        }
        this.row_size = Math.ceil(this.elems.length/this.row_cnt);
        for (let i = 0; i < this.row_cnt; i++) {
            let elems_in_row = Math.min(this.row_size, this.elems.length - i * this.row_size);
            let row_indent = Math.max ((this.size.x - elems_in_row * this.elem_size)/elems_in_row, this.indent);
            for (let j = 0; j < elems_in_row; j++){
                this.elems[i*this.row_size + j].pos = new Vector(j * (this.elem_size + row_indent) + (i%2 == 1 ? (this.elem_size + row_indent)/2 : 0), this.indent + i * (this.elem_size + this.indent));
            }
        }
    }
    move(){
        for(let i = 0; i < this.elems.length;i++){
            this.elems[i].pos.x += this.elems[i].movementSpeed;
            this.elems[i].pos.x %= this.size.x;
        }
    }
    draw() {
        this.move();
        let context = this.canvas.getContext("2d");
        context.save();
        context.translate(this.pos.x, this.pos.y);  
        context.beginPath();
        context.lineWidth = "2";
        context.strokeStyle = "black";
        context.rect(0,0, this.size.x, this.size.y);
        context.closePath();
        context.stroke();
        for (let i = 0; i < this.row_cnt; i++) {
            for (let j = 0; j < Math.min(this.row_size, this.elems.length - i * this.row_size); j++){
                this.elems[i*this.row_size + j].draw_moving(this.elem_size, this.size);
            }
        }
        context.restore();
    }
}
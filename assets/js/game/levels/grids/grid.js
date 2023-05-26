import CanvasObject from "../../canvasObject.js";
import Vector  from "../../vector.js";
export default class Grid extends CanvasObject{
    constructor(canvas, pos, size) {
        super(canvas, pos, size);
        this.indent = 10;
    }
    handleClick(pos){
        let real_size = this.elem_size / Math.SQRT2;
        for(let i = 0; i < this.elems.length; i++){
            let elem = this.elems[i];
            let relative_point = new Vector(pos.x - this.pos.x -elem.pos.x - this.elem_size/2, pos.y - this.pos.y-elem.pos.y - this.elem_size/2);
            relative_point.rotate(elem.rotation);
            if(relative_point.x >= -real_size/2 && relative_point.x <= real_size/2&& relative_point.y >= -real_size/2 && relative_point.y <= real_size/2){                     
                return i;
            }
        }
        return -1;
  }
    set_elements(elems){
        this.elems = elems;
        this.calculate_positions();
    }
    calculate_positions(){
        this.row_cnt = 1;
        this.elem_size = 0;
        for(let i = 1; i < this.elems.length;i++){
            let elems_per_row = (Math.ceil(this.elems.length/i));
            let maxX = Math.floor((this.size.x - (elems_per_row + 1)*this.indent)/elems_per_row);
            let maxY = Math.floor((this.size.y - (i + 1)*this.indent)/i);
            let newElemSize = Math.min(maxX,maxY);
            if(newElemSize >this.elem_size){
                this.elem_size = newElemSize;
                this.row_cnt = i;
            }
        }
        this.row_size = Math.ceil(this.elems.length/this.row_cnt);
        for (let i = 0; i < this.row_cnt; i++) {
            for (let j = 0; j < Math.min(this.row_size, this.elems.length - i * this.row_size); j++){
                this.elems[i*this.row_size + j].pos = new Vector(this.indent + j * (this.elem_size + this.indent), this.indent + i * (this.elem_size + this.indent));
            }
        }
    }
    draw() {
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
                this.elems[i*this.row_size + j].draw(this.elem_size);
            }
        }
        context.restore();
    }
}
import CanvasObject from "./canvasObject.js";

export default class TextBlock extends CanvasObject{
    constructor(canvas, pos,text, size, align = "center"){
        super(canvas,pos);
        this.text = text;
        this.font = size + "px serif";
        this.align = align;
    }
    draw_center(){
        let context = this.canvas.getContext("2d");
        context.save();
        context.font = this.font;
        context.textAlign = this.align;
        context.fillText(this.text,this.pos.x,this.pos.y);
        context.stroke();
        context.restore();
    }
}
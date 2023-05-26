export default class Button{
    constructor(pos, size, text, action){
        this.size = size;
        this.text = text;
        this.pos = pos;
        this.action = action;
        this.selected = false;
    }
    draw(){
        let canvas = document.getElementById("gamecanvas");
        let context = canvas.getContext("2d");
        context.save();
        context.beginPath();
        context.lineWidth = "4";
        context.strokeStyle = this.selected ?"red" : "black";
        context.textAlign = "center";
        context.rect(this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
        context.font = "24px serif";
        context.fillText(this.text, this.pos.x, this.pos.y + 3);
        context.closePath();
        context.stroke();
        context.restore();
    }
    is_pressed(pos){
        if(pos.x >= this.pos.x - this.size.x/2 && pos.x <=this.pos.x + this.size.x/2 && pos.y >= this.pos.y -  this.size.y/2 && pos.y <=this.pos.y + this.size.y/2){
             return true;
        }
        return false;
    }
}
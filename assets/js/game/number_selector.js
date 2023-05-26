export default class NumberSelector{
    constructor(pos, size, text, number = 0, min = 0, max = 1000000){
        this.pos = pos;
        this.size = size;
        this.text = text;
        this.number = number;
        this.min = min;
        this.max = max;
        this.buttonSize = Math.min(this.size.y, this.size.x/6);
        this.fontsize = Math.min((this.size.x -this. buttonSize*2)/8,this.size.y/2);
    }
    get_number(){
        return this.number;
    }
    draw(){
        let canvas = document.getElementById("gamecanvas");
        let context = canvas.getContext("2d");
        context.save();
        context.beginPath();
        context.lineWidth = "2";
        context.strokeStyle = "black";
        context.textAlign = "center";
        //context.rect(this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);

        //-
        let lineWidth = this.buttonSize/10;
        let indent = lineWidth;
        let lineLength = this.buttonSize - indent * 2;
        let origin_x = this.pos.x - this.size.x/2;
        context.rect(origin_x, this.pos.y - this.buttonSize/2, this.buttonSize, this.buttonSize);
        context.fillRect(origin_x + indent, this.pos.y - lineWidth/2, lineLength, lineWidth);   
        //

        //+
        context.rect(origin_x + this.size.x - this.buttonSize, this.pos.y - this.buttonSize/2, this.buttonSize, this.buttonSize);
        context.fillRect(origin_x + this.size.x - this.buttonSize + indent, this.pos.y - lineWidth/2, lineLength, lineWidth);   
        context.fillRect(origin_x + this.size.x - this.buttonSize/2 - lineWidth/2, this.pos.y - this.buttonSize/2 + indent, lineWidth , lineLength);   
        //
        context.font = this.fontsize + "px serif";
        context.fillText(this.number, this.pos.x, this.pos.y - this.fontsize/4);
        context.fillText(this.text, this.pos.x, this.pos.y + this.fontsize * 3/4);
        context.closePath();
        context.stroke();
        context.restore();
    }
    is_pressed(e){
        if(e.layerX >= this.pos.x - this.size.x/2 && e.layerX <=this.pos.x + this.size.x/2 && e.layerY >= this.pos.y -  this.size.y/2 && e.layerY <=this.pos.y + this.size.y/2){
             return true;
        }
        return false;
    }
    handleClick(pos){
        let x = pos.x - this.pos.x;
        let y = pos. y - this.pos.y;
        if(y >= -this.buttonSize/2 && y <=this.buttonSize/2){
            if(x >= -this.size.x/2 && x <= -this.size.x/2 + this.buttonSize){
                if(this.number > this.min){
                    this.number--;
                }
                return true;
            }
            if(x >= this.size.x/2 - this.buttonSize && x <= this.size.x/2){
                if(this.number < this.max){
                    this.number++;
                }
                return true;
            }
        }
        return false;
    }
}
import Vector  from "./vector.js";
export default class Element {
    constructor(size, colors, pos) {
        this.colors = colors;
        this.pos = pos;
        this.rotation = 0;
        this.movementSpeed = 0;
        this.rotationSpeed = 0;
        this.generate_cells(size);
    }
    generate_cells(size){
        this.cells = new Array(size);
        for (let i = 0; i < size; i++) {
            this.cells[i] = new Array(size);
            for (let j = 0; j < size; j++) {
                this.cells[i][j] = Math.floor(Math.random()*this.colors.length);
            }
        }
    }    
    draw_moving(size, gridSize){
        let cellSize = Math.floor(size / this.cells.length);
        size = cellSize * this.cells.length;
        let canvas = document.getElementById("gamecanvas");
        let context = canvas.getContext("2d");
        //context.save();
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "black"
        //Left vertical
        context.rect(this.pos.x - 1, this.pos.y - 1, 1, size + 2);
        if(this.pos.x + size + 1> gridSize.x){
            //cut
            let left_length =  gridSize.x - this.pos.x - 1;
            let right_length = size - left_length;
            
            //Horizontal
            context.rect(this.pos.x - 1, this.pos.y - 1, left_length, 1);
            context.rect(this.pos.x - 1, this.pos.y + size + 1, left_length, 1);
            context.rect(0, this.pos.y - 1, right_length, 1);
            context.rect(0, this.pos.y + size + 1, right_length, 1);
            //Right vertical
            context.rect(right_length, this.pos.y - 1, 1, size + 2);
        } else {
            //uncut
            //Horizontal
            context.rect(this.pos.x - 1, this.pos.y - 1, size + 2, 1);
            context.rect(this.pos.x - 1, this.pos.y + size + 1, size + 2, 1);
            //Right vertical
            context.rect(this.pos.x  + size  + 1, this.pos.y - 1, 1, size + 2);
        }
        context.closePath();
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                context.fillStyle = this.colors[this.cells[i][j]];
                let x = this.pos.x + i * cellSize;
                x %= gridSize.x;
                if(x + cellSize > gridSize.x){
                    let left_length =  gridSize.x - x;
                    let right_length = cellSize - left_length;

                    context.fillRect(x,this.pos.y +  j * cellSize, left_length, cellSize);    
                    context.fillRect(0,this.pos.y +  j * cellSize, right_length, cellSize);  
                } else{
                    context.fillRect(x,this.pos.y +  j * cellSize, cellSize, cellSize);  
                }   
            }
        }
        context.stroke();
        //context.restore();
    }
    draw_in_a_box(boxSize, pos = this.pos){
        let size = boxSize / Math.SQRT2;
        let cellSize = Math.floor(size / this.cells.length);
        let center = new Vector(cellSize * this.cells.length/2, cellSize * this.cells.length/2);
        let canvas = document.getElementById("gamecanvas");
        let context = canvas.getContext("2d");
        context.save();
        context.translate(pos.x + boxSize/2, pos.y + boxSize/2);
        context.rotate(this.rotation * Math.PI / 180);
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "black"
        context.rect(- 1 - center.x, - 1 - center.y, this.cells.length * cellSize + 2, this.cells.length * cellSize + 2);
        context.closePath();
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                context.fillStyle = this.colors[this.cells[i][j]];
                context.fillRect(i * cellSize - center.x, j * cellSize - center.y, cellSize, cellSize);            
            }
        }
        context.stroke();
        context.restore();
    }
    draw(size, pos = this.pos) {
        let cellSize = Math.floor(size / this.cells.length);
        size = cellSize * this.cells.length;
        let canvas = document.getElementById("gamecanvas");
        let context = canvas.getContext("2d");
        context.save();
        context.translate(pos.x, pos.y);
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "black"
        context.rect(- 1, - 1, size + 2, size + 2);
        context.closePath();
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                context.fillStyle = this.colors[this.cells[i][j]];
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);            
            }
        }
        context.stroke();
        context.restore();
    }
    draw_center(size, pos = this.pos){
        let cellSize = Math.floor(size / this.cells.length);
        size = cellSize * this.cells.length;
        context.save;
            context.translate(-size/2, -size/2);
    }
}

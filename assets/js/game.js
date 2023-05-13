document.addEventListener('DOMContentLoaded', () => new Game())
class Vector{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    rotate(r){
        let tx = this.x;
        let ty = this.y;
        this.x = tx*Math.cos(Math.PI * r / 180) - ty * Math.sin(Math.PI * r / 180);
        this.y = tx*Math.sin(Math.PI * r / 180) + ty * Math.cos(Math.PI * r / 180);
    }
}
class Element{  
    constructor(size, colors){
        this.size = size;
        this.colors = (colors === undefined) ? generateColors(size) : colors;
        this.cells = new Array(size);
        for(let i = 0;i<this.size;i++)
            this.cells[i] = new Array(size);
    }  
    generateCells(){
        for(let i = 0;i<this.cells.length;i++){
            for(let j = 0;j<this.cells.length;j++){           
                this.cells[i][j] = Math.floor(Math.random()*(this.colors.length + 1));
            }
        }

        
    }
    createDOMElement(src, imgWidth, imgHeight) {
        this.div = document.createElement("div");
        this.img = document.createElement("img");
        this.img.setAttribute('data-width', imgWidth);
        this.img.setAttribute('data-height', imgHeight);
        this.div.classList.add("elem");
        this.div.setAttribute('data-rotate', 0);
        this.div.setAttribute('data-x', 0);
        this.div.setAttribute('data-y', 0);
        this.img.src = "assets/img/puzzle/" + src + ".png";
        document.getElementById("puzzle").appendChild(this.div);
        this.div.appendChild(this.img);
        this.div.style.y = this.x +'px';
        this.div.style.x = this.y + 'px';
        this.div.setAttribute('draggable','true');
    }
    add_Events(){
        this.div.addEventListener('dragstart', (e) => {
            setTimeout(() => this.div.classList.add('hide'), 0)
            this.mouseoffsetX = e.offsetX
            this.mouseoffsetY = e.offsetY
        })
        this.div.addEventListener('dragend', (e) => {
            e.preventDefault()
            let x = parseInt(this.div.getAttribute('data-x'));
            let y = parseInt(this.div.getAttribute('data-y'));
            var delta = new Vector(e.offsetX - this.mouseoffsetX, e.offsetY - this.mouseoffsetY);
            delta.rotate(parseInt(this.div.getAttribute('data-rotate')));
            let newX = x +  Math.round(delta.x);
            let newY = y + Math.round(delta.y);
            this.moveTo(newX, newY);
            this.div.classList.remove('hide');
        })
        this.div.addEventListener('wheel', (e) =>{       
            e.preventDefault();     
            var r = parseInt(this.div.getAttribute('data-rotate'));
            var angle = 5;
            if(e.deltaY > 0){
                 r +=angle;
            }
            if(e.deltaY < 0){
                r -=angle;
            }          
            r%=this.r_cap;
            this.rotate(r);
        })
    }
    moveTo(x, y){
        let height = parseInt(this.img.getAttribute('data-height'));
        let width = parseInt(this.img.getAttribute('data-width'));
        if(x < 0){
            x = 0;
        } 
        else if(x > 400 - width)
        {
            x = 400 - width;
        }
        if(y <0){
            y = 0;
        }
        else if(y >400 - height)
        {
            y = 400 - height;
        }
        this.div.style.left = (x) + 'px';
        this.div.style.top = (y) + 'px';
        this.div.setAttribute('data-x', x);
        this.div.setAttribute('data-y', y);
        this.puzzle.check_solution();
    }
    rotate(r){
        this.div.style.transform = 'rotate('+ r + 'deg)';
        this.div.setAttribute('data-rotate',r);
        this.puzzle.check_solution();
    }
    get_transform(){
        var result = new Map();
        result.set("x", this.div.getAttribute('data-x'));
        result.set("y", this.div.getAttribute('data-y'));
        result.set("r", this.div.getAttribute('data-rotate'));
        return result;
    }
}

function generateColors(cnt){
    var colors = new Array(cnt);
    for(var i = 0;i<cnt;i++)
        colors[i] = ('#' + Math.floor(Math.random()*16777215).toString(16));
    return colors;
}
function drawElement(elem, pos){
    var cellSize = 30;
    var canvas = document.getElementById("gamecanvas");  
    var context = canvas.getContext("2d");
    context.beginPath();
    context.lineWidth="1";
    context.strokeStyle="black";
    context.rect(pos.x - 1, pos.y - 1,elem.cells.length * cellSize + 2,elem.cells.length * cellSize + 2);
    for (let i = 0; i < elem.cells.length; i++) {
        for (let j = 0; j < elem.cells.length; j++) {
            context.fillStyle = elem.colors[elem.cells[i][j]]; 
            context.fillRect(pos.x + i * cellSize, pos.y + j * cellSize,cellSize,cellSize);        
        }
    }
    context.stroke();
}
class Game{
    constructor(){

        var size = 10;
        var color_cnt = 5;
        var elem_cnt = 9;
        var elements = new Array(elem_cnt);
        for (let i = 0; i < elements.length; i++) {
            elements[i] = new Element(size, generateColors(color_cnt));    
        }
        this.elem.generateCells();
        drawElement(this.elem, new Vector(5,5));      
    }
}

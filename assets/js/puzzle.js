document.addEventListener('DOMContentLoaded', () => new Puzzle())
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
class PuzzleElement{
    constructor(data, puzzle){
        this.puzzle = puzzle;
        this.r_cap = data.r_cap;
        this.solution = new Map();
        this.r = 0;
        this.solution.set("x", data.solution.x);
        this.solution.set("y", data.solution.y);
        this.solution.set("r", data.solution.r);
        this.createDOMElement(data.src, data.width, data.height);
        this.add_Events();
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
class Puzzle{
    constructor(){
        this.boxheight = 400;
        this.boxwidth = 400;
        this.sol_margin = 10;
        this.elements = [];
        let elements_data =     [
            {
                "width":100,
                "height":100,
                "r_cap": 90,
                "src":"wall",
                "solution":{
                    "x": 0,
                    "y": 0,
                    "r":0
                }
            },
            {
                "width":100,
                "height":50,
                "r_cap": 360,
                "src":"roof",
                "solution":{
                    "x": 0,
                    "y": -50,
                    "r":0
                }
            },
            {
                "width":25,
                "height":25,
                "r_cap": 90,
                "src":"window",
                "solution":{
                    "x": 20,
                    "y": 30,
                    "r":0
                }
            },
            {
                "width":25,
                "height":25,
                "src":"door",
                "r_cap": 360,
                "solution":{
                    "x": 60,
                    "y": 40,
                    "r":0
                }
            }
        ]
        for (let i = 0; i < elements_data.length; i++){
            this.elements[i] = new PuzzleElement(elements_data[i], this);
        }
        document.getElementById("shuffle").addEventListener('click', (e)=>this.shuffle());
        document.getElementById("check").addEventListener('click', (e)=>this.check_solution());
        this.shuffle();
    }
    shuffle() {
        for(let i = 0; i < this.elements.length;i++){
            const x = Math.round(Math.random()*(this.boxwidth));
            const y = Math.round(Math.random()*(this.boxheight));
            const r = Math.round(Math.random()*(72))*5;
            this.elements[i].moveTo(y, x);
            this.elements[i].rotate(r);
        }
    }
    check_solution(){
        if(this.check_all()){
            document.getElementById("sol").innerHTML = "Solved";
        } else document.getElementById("sol").innerHTML = "Not Solved";
    }
    check_all() {
        var base = this.elements[0].get_transform();
        var base_sol = this.elements[0].solution;
        for(let i = 1; i < this.elements.length;i++){
            var cur = this.elements[i].get_transform();
            var cur_sol = this.elements[i].solution;            
            if(!(this.check(base.get("x"), cur.get("x"),base_sol.get("x"),cur_sol.get("x")) &&
                 this.check(base.get("y"), cur.get("y"),base_sol.get("y"),cur_sol.get("y")) &&
                 this.check(base.get("r"), cur.get("r"),base_sol.get("r"),cur_sol.get("r")))) {
                    return false;
                }
        }
        return true;
    }
    check(a, b, c, d){
        if (Math.abs(a - b - c + d) < this.sol_margin){
            return true;
        } else {
            return false;
        }
    }
}
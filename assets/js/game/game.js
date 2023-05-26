import Vector from "./vector.js";
import MainMenu  from "./menus/main_menu.js";
document.addEventListener('DOMContentLoaded', () => new Game())


class Game {
    constructor() {
        let div = document.getElementById("gamediv");
        this.canvas = document.createElement('canvas');
        this.canvas.id     = "gamecanvas";
        this.canvas.width  = 1224;
        this.canvas.height = 768;
        this.canvas.style.zIndex   = 8;
        this.context = this.canvas.getContext("2d");
        div.appendChild(this.canvas);
        this.currentScreen = new MainMenu(this.canvas);
        this.canvas.addEventListener("click",(e)=>{this.handleClick(e);});
        this.interval_id = setInterval(() =>this.draw(),1000/30);
    }
    draw(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.currentScreen.draw();
    }
    handleClick(e){
        let pos = new Vector(e.layerX, e.layerY);
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.currentScreen = this.currentScreen.handleClick(pos);
        this.currentScreen.draw();
    }
}





import Vector from "./vector.js";

export default class CanvasObject{
    constructor(canvas = document.getElementById("gamecanvas"),pos = new Vector(0,0), size = new Vector(0,0)){
        this.canvas = canvas;
        this.pos = pos;
        this.size = size;
    }
}
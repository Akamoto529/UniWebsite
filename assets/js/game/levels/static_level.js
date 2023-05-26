import Vector from "../vector.js";
import StaticGrid from "./grids/static_grid.js";
import Level from "./level.js";
export default class StaticLevel extends Level{
    constructor(canvas, starting_element_count, elem_size, color_cnt){
        let lives = 3;
        let indent = 10;
        let grid = new StaticGrid(canvas, new Vector(indent, indent), new Vector(canvas.width * 0.6 - indent * 2, canvas.height - indent * 2));
        super(canvas, starting_element_count, elem_size, color_cnt, lives, indent, grid); 
        this.scoreMultiplier = 1;
    }
}
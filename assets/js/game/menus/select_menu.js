import Menu  from "./menu.js";
import Vector  from "../vector.js";
import Button  from "../button.js";
import NumberSelector  from "../number_selector.js";
import StaticLevel from "../levels/static_level.js";
import RotatingLevel from "../levels/rotating_level.js";
import MovingLevel from "../levels/moving_level.js";
import MainMenu from "./main_menu.js";
export default class SelectMenu extends Menu{
    constructor(canvas){
        let buttons = new Array(5);
        let selectors = new Array(1);
        selectors[0] = new NumberSelector(new Vector(canvas.width/2,canvas.height/2), new Vector(canvas.width/5,canvas.height/8),"Starting Amount", 9, 2);
        selectors[1] = new NumberSelector(new Vector(canvas.width/2,canvas.height*5/8), new Vector(canvas.width/5,canvas.height/8),"Size", 3, 1);
        selectors[2] = new NumberSelector(new Vector(canvas.width/2,canvas.height*3/4), new Vector(canvas.width/5,canvas.height/8),"Color amount", 3, 2);
        let static_level = function(){
            buttons[0].selected = true;
            buttons[1].selected = false;
            buttons[2].selected = false;
        }
        let rotating_level = function(){
            buttons[0].selected = false;
            buttons[1].selected = true;
            buttons[2].selected = false;
        }
        let moving_level = function(){
            buttons[0].selected = false;
            buttons[1].selected = false;
            buttons[2].selected = true;
        }
        let main_menu = function(){
            return new MainMenu(canvas);
        }
        let play = function(){
            let elem_cnt = selectors[0].get_number();
            let elem_size = selectors[1].get_number();
            let color_cnt = selectors[2].get_number();
            if(buttons[0].selected)
                return new StaticLevel(canvas,elem_cnt, elem_size, color_cnt);
            if(buttons[1].selected)
                return new RotatingLevel(canvas,elem_cnt, elem_size, color_cnt);
            if(buttons[2].selected)
                return new MovingLevel(canvas,elem_cnt, elem_size, color_cnt);
        }
        buttons[0] = new Button(new Vector(canvas.width/3,canvas.height*3/8), new Vector(canvas.width/10,canvas.height/15),"Static", static_level);
        buttons[1] = new Button(new Vector(canvas.width/2,canvas.height*3/8), new Vector(canvas.width/10,canvas.height/15),"Rotating", rotating_level);
        buttons[2] = new Button(new Vector(canvas.width*2/3,canvas.height*3/8), new Vector(canvas.width/10,canvas.height/15),"Moving", moving_level);
        buttons[3] = new Button(new Vector(canvas.width/2,canvas.height*7/8), new Vector(canvas.width/10,canvas.height/15),"Main Menu", main_menu);
        buttons[4] = new Button(new Vector(canvas.width/2,canvas.height*2/8), new Vector(canvas.width/10,canvas.height/15),"Play", play);
        super(canvas, buttons, null, selectors);
    }
}
import Menu  from "./menu.js";
import Vector  from "../vector.js";
import Button  from "../button.js";
import SelectMenu  from "./select_menu.js";
import Leaderboard from "./leaderboard.js";
export default class MainMenu extends Menu{
    constructor(canvas){
        let buttons = new Array(2);
        buttons[0] = new Button(new Vector(canvas.width/2,canvas.height/2), new Vector(canvas.width/9,canvas.height/15),"Start", function(){return new SelectMenu(canvas);});
        buttons[1] = new Button(new Vector(canvas.width/2, canvas.height/2 + canvas.height/10), new Vector(canvas.width/9,canvas.height/15),"Leaderboard", ()=>{
            return new Leaderboard(canvas, -1);
        });
        super(canvas, buttons);
    }
}
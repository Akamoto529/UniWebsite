import Menu  from "./menu.js";
import Vector  from "../vector.js";
import Button  from "../button.js";
import TextBlock from "../text_block.js";
import MainMenu from "./main_menu.js";
import Leaderboard from "./leaderboard.js";
export default class GameOver extends Menu{
    constructor(canvas, score){
        let buttons = new Array(2);
        let texts = new Array(1);
        texts[0] = new TextBlock(canvas, new Vector(canvas.width/2, canvas.height/2 - 150),"Your Score: " + score,32);
        let leaderboard = function() {
            return new Leaderboard(canvas, score);
        }
        buttons[0] = new Button(new Vector(canvas.width/2,canvas.height/2), new Vector(canvas.width/9,canvas.height/15),"Leaderboard", leaderboard);
        buttons[1] = new Button(new Vector(canvas.width/2,canvas.height*7/8), new Vector(canvas.width/10,canvas.height/15),"Main Menu", ()=>{return new MainMenu(canvas)});
        super(canvas, buttons, texts);
        this.score = score;
    }
}
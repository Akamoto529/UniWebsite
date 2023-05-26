import Menu  from "./menu.js";
import Vector  from "../vector.js";
import Button  from "../button.js";
import TextBlock from "../text_block.js";
import MainMenu from "./main_menu.js";
export default class Leaderboard extends Menu{
    constructor(canvas, score = -1){
        let buttons = new Array(2);
        let texts = new Array(2);
        texts[0] = new TextBlock(canvas, new Vector(canvas.width/2, canvas.height/20),"Enter your name: ",24,"right");
        texts[1] = new TextBlock(canvas, new Vector(canvas.width/2, canvas.height/20),"",24,"left");
        buttons[0] = new Button(new Vector(canvas.width/2 + canvas.width/18,canvas.height*14/15), new Vector(canvas.width/10,canvas.height/15),"Main Menu", ()=>{
            return new MainMenu(canvas)
        });
        buttons[1] = new Button(new Vector(canvas.width/2 - canvas.width/18,canvas.height*14/15), new Vector(canvas.width/10,canvas.height/15),"Clear", ()=>{
            localStorage.clear();
        });
        super(canvas, buttons, texts);
        this.score = score;
        this.submitted = (score == -1);
        addEventListener('keydown', (event) => {
            let alphanumeric = new RegExp('[a-zA-Zа-яА-Я0-9]');
            if(event.key.length == 1 && alphanumeric.test(event.key)){
                texts[1].text+= event.key;
            }
            if(event.key == "Backspace"){
                texts[1].text = texts[1].text.substring(0, texts[1].text.length - 1);
            }
            if(!this.submitted && event.key == "Enter" && texts[1].text.length > 0){
                this.submitted = true;
                this.updateLeaderboard();
            }
        });
    } 
    draw(){
        if(this.buttons != null){
            this.buttons.forEach(button => {
                button.draw();
            });
        }
        if(!this.submitted){
            this.texts.forEach(text => {
                text.draw_center();
            });
        }
        if(this.selectors != null){
            this.selectors.forEach(selector => {
                selector.draw();
            });
        }
        let context = this.canvas.getContext("2d");
        context.save();
        let json = JSON.parse(localStorage.getItem("leaderboard"));
        if(json != null){
            let x = this.canvas.width/2 - this.canvas.width/10;
            let y  = this.canvas.height/10;
            for(let i = 0; i < json.length;i++){
                context.font = 24 + "px serif";
                context.textAlign = "left";
                context.fillText(json[i].name + ": " + json[i].score,x,y);
                y+=40;
                context.stroke();
                context.restore();
            }
        }
    }
    updateLeaderboard(){
        let json = JSON.parse(localStorage.getItem("leaderboard")); 
        if(json != null){
            for(let i = 0; i < json.length;i++){
                if(json[i].name == this.texts[1].text){
                    json[i].score = this.score;
                    break;
                }
                if(i == json.length - 1){
                    json.push({name:this.texts[1].text, score:this.score})
                }
            }
        } else {
            json = [{name:this.texts[1].text, score:this.score}];
        }
        
        for(let i = 0; i < json.length;i++){
            for(let j = i + 1; j < json.length;j++){
                if(json[i].score < json[j].score){
                    let temp = json[i];
                    json[i] = json[j];
                    json[j] = temp;
                }
            }
        }
        localStorage.setItem("leaderboard",JSON.stringify(json));
    }
    clearLeaderboard(){
        localStorage.clear();
    }
}
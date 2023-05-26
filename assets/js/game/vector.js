export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    moveV(v){
        this.x+= v.x;
        this.y+=v.y;
    }
    moveXY(x, y){
        this.x+=x;
        this.y+=y;
    }
    rotate(angle){
        let radian = angle * Math.PI / 180;
        let newX = this.x * Math.cos(radian) - this.y * Math.sin(radian);
        let newY =  this.x * Math.sin(radian) + this.y * Math.cos(radian);
        this.x = newX;
        this.y = newY;
    }
}
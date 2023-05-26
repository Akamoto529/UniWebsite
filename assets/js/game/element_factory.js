import Vector  from "./vector.js";
import Element  from "./element.js";
export default class ElementFactory{
    static generateUniqueElements(cnt, size, colors_cnt) {
        let options = Math.pow(colors_cnt, size * size);
        if(size > 1) options/4;
        if(options < cnt) cnt = options;
        let elements = new Array(cnt);
        let colors = this.generateColors(colors_cnt);
        for (let i = 0; i < elements.length; i++) {
            elements[i] = new Element(size, colors, new Vector(0,0));
            for(let j = 0;j < i;j++){
                if(this.is_equal(elements[i],elements[j])){
                    elements[i].generate_cells(size);
                    j = -1;
                }
            }     
        }
        return elements;
    }
    static generateColors(cnt) {
        let colors = new Array();
        while(colors.length < cnt){
            let color = '#' + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16) + Math.floor(Math.random() * 16).toString(16);
            if(colors.indexOf(color) === -1) colors.push(color);
        }
        return colors;
    }
    static is_equal(elem1, elem2){
        if(elem1.cells.length != elem2.cells.length) return false;
        let size = elem1.cells.length;
        let b = new Array (false, false, false, false);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if(!b[0] && elem1.cells[i][j] != elem2.cells[i][j]) b[0] = true;
                if(!b[1] && elem1.cells[i][j] != elem2.cells[j][i]) b[1] = true;
                if(!b[2] && elem1.cells[i][j] != elem2.cells[j][size - 1 - i]) b[2] = true;
                if(!b[3] && elem1.cells[i][j] != elem2.cells[size - 1 - i][j]) b[3] = true;
                if(b[0]&&b[1]&&b[2]&&b[3]) return false;
            }
        }
        return true;
    }
}
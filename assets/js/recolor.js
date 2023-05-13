function recolor(name){
    var button = document.getElementById(name);
    var color = Math.floor(Math.random()*16777215).toString(16);
    button.style.backgroundColor = '#' + color;
    button.style.border= '1px solid #' + color;
}
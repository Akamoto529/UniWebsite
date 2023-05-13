const phrases = [
    {
        latin: "Consuetudo est altera natura",
        russian: "Привычка - вторая натура"
    },
    {
        latin: "Nota bene",
        russian: "Заметьте хорошо!",
    },
    {
        latin: "Nulla calamitas sola",
        russian: "Беда не приходит одна",
    },
    {
        latin: "Per aspera ad astra",
        russian: "Через тернии к звёздам",
    },
].sort(() => Math.random() - 0.5);
var cnt = 0;
var odd = true;
var bold = false;

function create()
{
    var table = document.getElementById("table");
    if(phrases.length == cnt){
        alert("Фразы закончились");
        return;
    }
    var row = table.insertRow(cnt + 1);
    row.insertCell(0).innerHTML = "\"" + phrases[cnt].latin + "\"";
    row.insertCell(1).innerHTML = "\"" + phrases[cnt].russian + "\"";
    if(odd){       
        row.classList.add("odd");
    } else { 
        row.classList.add("even");
    }
    odd = !odd;
    cnt++;
}

function recolor()
{
    var rows = document.getElementsByClassName("even"); 
    for(let i = 0;i< rows.length;i++){    
        if(bold){
            rows[i].classList.remove("bold");
        } else {
            rows[i].classList.add("bold");
        }
    }
    bold = !bold;
}
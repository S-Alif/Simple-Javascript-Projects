/* select everything */
var showColor = document.getElementById('show-color');
var generate = document.getElementById('generator');

/* values needed to construct a color */
const hexValue = ["A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

generate.onclick = function(){
    var color = "#";

    for(var i = 0; i < 6; i++){
        color += hexValue[generateColor()];
        console.log(color);
    }

    document.body.style.background = color;
    showColor.textContent = color;   
}

/* generate a random value each time the loop runs */
function generateColor(){
    var colorValue = Math.floor(Math.random() * hexValue.length);
    return colorValue;
}
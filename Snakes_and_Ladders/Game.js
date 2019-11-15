/*
Check the size of the display when we chane the the display from laptop to a tv
 */

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let gamePlane = {
    x_coordinate : 0,
    y_coordinate : 0,
    i: 0,
    j: 0,
    color: 'Black',
    text : 'Number'
};

let CreateAll = function ( object){

};

let createThePlaneForGame = function(){
    let squareWidth = document.getElementById("myCanvas").width / 10;
    let squareHeight = document.getElementById("myCanvas").height / 10;
    let x = 0; // x coordinate of the left upper corner of each square
    let y = 0; // y coordinate of the left upper corner of each square
    let number = 100; // number shown on each square
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
           createSquares(x , y , squareWidth , squareHeight , number);
           x += squareWidth;
           number--;
        }
        x = 0;
        y += squareHeight;
    }
};

let createSquares = function(x , y , squareWidth , squareHeight , number){
    ctx.fillStyle = generatingRandomColor();
    ctx.fillRect(x , y , squareWidth , squareHeight);

    // now creating the text inside each square
    ctx.fillStyle = 'black';
    ctx.font = (squareHeight/3.5).toString() + "px arial";
    ctx.fillText(number.toString(), x + squareWidth/2, y + squareHeight/2);
};

let generatingRandomColor = function () {
    let colors = ["AliceBlue","Aqua", "Blue","BlueViolet","Brown",
        "DarkGray","DarkGreen","Gold","Gray","Green", "LightBlue","LightCoral","LightCyan",
        "LightGoldenRodYellow","LightGray","LightGrey","LightGreen",
        "LightSeaGreen","LightSkyBlue","LightSlateGray",
        "MediumTurquoise","MediumVioletRed","Navy","OldLace","Olive","OliveDrab","Orange",
        "OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
        "Pink","Plum","PowderBlue","Purple","Yellow","YellowGreen"];
    let i = Math.floor(Math.random() * colors.length);
    return colors[i];
};

createThePlaneForGame();

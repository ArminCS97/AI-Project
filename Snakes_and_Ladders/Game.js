// automated version

/*
Check the size of the display when we chane the the display from laptop to a tv
 */

let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let createSquares = function(x , y , squareWidth , squareHeight , text , color ){
    ctx.fillStyle = color;
    ctx.fillRect(x , y , squareWidth , squareHeight);

    // now creating the text inside each square
    ctx.fillStyle = 'black';
    ctx.font = (squareHeight/3.5).toString() + "px arial";
    ctx.fillText(text.toString(), x + squareWidth/2, y + squareHeight/2);
};

let createCircles = function(x , y , squareWidth , squareHeight){
    let text = 'GO TO ' + 5;
    ctx.beginPath();
    let r = squareHeight/2;
    let x1 = x + r;
    let y1 = y + r;

    ctx.fillStyle = "yellow";

    ctx.font = (squareHeight/4.5).toString() + "px arial";
    ctx.arc(x1, y1, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillText(text.toString(), x, y1);
    ctx.fill();

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


function GameSquares (xC , yC , i , j , color , text , squareW , squareH , pit){
    this.x_coordinate = xC;
    this.y_coordinate = yC;
    this.i = i;
    this.j = j;
    this.color = color;
    this.text = text;
    this.squareWidth = squareW;
    this.squareHeigth = squareH;
    this.pit = pit;
    this.draw = function () {
        if (this.pit === false){
            createSquares(this.x_coordinate , this.y_coordinate , this.squareWidth , this.squareHeigth , this.text , this.color)
        }
        else
            createCircles(this.x_coordinate , this.y_coordinate , this.squareWidth , this.squareHeigth)
    }
}

let gamePlane = new Array(10);
for (let i = 0; i < 10; i++) {
    gamePlane[i] = new Array(10);
}


let arrayFiller = function (){
    let squareWidth = document.getElementById("myCanvas").width / 10;
    let squareHeight = document.getElementById("myCanvas").height / 10;

    let x = 0; // x coordinate of the left upper corner of each square
    let y = 0; // y coordinate of the left upper corner of each square
    let text = 100; // number shown on each square

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let color = generatingRandomColor();
            gamePlane[i][j] = new GameSquares(x , y , i , j , color , text , squareWidth , squareHeight , false);
            x += squareWidth;
            text--;
        }
        x = 0;
        y += squareHeight;
    }
};

// the aim of the function below is to avoid going over the whole array
// in n^2 time to return i and j saved in each GamePlane obj by checking if textIDs match
let convertTextID_to_ij = function( textID ){
    textID = Number(textID);
    let i , j;
    if (textID % 10 === 0){
        i = 10 - (textID / 10);
        j = 0;
    }
    else {
        j = 10 - (textID % 10);
        i = 9 - Math.floor(textID / 10);
    }
    return gamePlane[i][j];
};

let applyTheRules = function(){
    convertTextID_to_ij(70).pit = true;
    convertTextID_to_ij(7).pit = true;
    convertTextID_to_ij(19).pit = true;
    convertTextID_to_ij(28).pit = true;
    convertTextID_to_ij(48).pit = true;
    convertTextID_to_ij(7).pit = true;
    convertTextID_to_ij(89).pit = true;
    convertTextID_to_ij(90).pit = true;
};

let arrayRunner = function (){
     arrayFiller();
     applyTheRules();


    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gamePlane[i][j].draw();
        }
    }
};

arrayRunner();




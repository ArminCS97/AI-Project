
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

let createCircles = function(x , y , squareWidth , squareHeight , goodPit, downTo , upTo ){
    let text;

    let r = squareHeight/2;
    let x1 = x + r;
    let y1 = y + r;

     ctx.beginPath();
     ctx.arc(x1, y1, r, 0, 2 * Math.PI, false);
    if (goodPit === true){
        text = 'To ' + upTo.toString();
        ctx.fillStyle = 'yellow';
    }
    else { // goodPit === false and we have a bad pit by default
        text = 'To ' + downTo.toString();
        ctx.fillStyle = 'brown';
    }
     ctx.fill();


   // putting the text inside the circle
    ctx.beginPath();
    ctx.font = (squareHeight/3.5).toString() + "px arial";
    ctx.fillStyle = 'black';
    ctx.fillText(text.toString(), x, y1);
    ctx.fill();

};

let generatingRandomColor = function () {
    let colors = ["AliceBlue", "Blue","BlueViolet",
        "DarkGray","DarkGreen","Gray","Green", "LightBlue","LightCoral","LightCyan",
        "LightGrey","LightGreen", "LightSeaGreen","LightSkyBlue","LightSlateGray",
        "MediumTurquoise","MediumVioletRed","Navy","OldLace","Olive","OliveDrab",
        "Orchid","PaleGoldenRod","PaleGreen","LightSkyBlue",
        "Pink","Plum","PowderBlue","Purple",];
    let i = Math.floor(Math.random() * colors.length);
    return colors[i];
};


function GameSquares (xC , yC , i , j , color , text , squareW , squareH , pit , goodPit){
    this.x_coordinate = xC;
    this.y_coordinate = yC;
    this.i = i;
    this.j = j;
    this.color = color;
    this.text = text;
    this.squareWidth = squareW;
    this.squareHeigth = squareH;
    this.pit = pit;
    this.goodPit = goodPit;
    this.downTo = this.text - 6;
    this.upTo = this.text + 6;
    this.up_or_down = up_or_down1 ;
    this.draw = function () {
        if (this.pit === false){
            createSquares(this.x_coordinate , this.y_coordinate , this.squareWidth , this.squareHeigth , this.text , this.color)
        }
        else{
            this.up_or_down();
            createCircles(this.x_coordinate , this.y_coordinate , this.squareWidth , this.squareHeigth , this.goodPit , this.downTo , this.upTo);
        }
    }
}

function up_or_down1(){
    if (this.goodPit){
        if (this.text <= 90 && this.text !== 56 && this.text !== 25){
            if (this.text % 2 === 0)
                this.upTo = this.text + 6;
            else this.upTo = this.text + 7;
        }
        if (this.text === 56)
            this.upTo = this.text + 11;
        if (this.text === 25)
            this.upTo = this.text + 14
    }
    else{
        if (this.text <= 10 && this.text !== 34 && this.text !== 87){
            if (this.text % 2 === 0)
                this.downTo = this.text - 6;
            else this.downTo = this.text - 7;
        }
        if (this.text === 34)
            this.downTo = this.text - 11;
        if (this.text === 87)
            this.downTo = this.text - 14
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
            gamePlane[i][j] = new GameSquares(x , y , i , j , color , text , squareWidth , squareHeight , false , false);
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


let In = (array , element) => {
    for (let i = 0; i < array.length; i++) {
        if ( element === array[i])
            return true;
    }
    return false;
};

let applyTheRules = function(){
    let pits = [];
    let pit;
    let numberOfPits = 22;
    for (let i = 0; i < numberOfPits ;) {
        pit = Math.floor(Math.random() * ( 91 - 11) + 11);
        if (In(pits , pit) === false) {
            convertTextID_to_ij(pit).pit = true;
            pits.push(pit);
            i++;
        }
    } // creating all the pits

    for (let i = 0; i < numberOfPits/2 ; i++) {
        convertTextID_to_ij(pits[i]).goodPit = true;
    }// making some of the pits good ones
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







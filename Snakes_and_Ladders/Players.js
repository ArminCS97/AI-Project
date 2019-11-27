//let Player = function (xc , yc , player , squareW , squareH, squareNum) {
let Player = function (squareNum , playerId) {
    // this.x_coordinate = xc;
    // this.y_coordinate = yc;
     this.player = playerId;
    // this.squareHeight = squareH;
    // this.squareWidth = squareW;
    this.squareNum = squareNum;
    this.draw = function () {
        drawThePlayer(this.squareNum , this.player);
    }
};

let drawThePlayer = ( squareID , playerName )=>{ // draws a player on a specific square
    let square0 = convertTextID_to_ij(squareID);
    let squareH = square0.squareHeigth;
    let xc = square0.x_coordinate;
    let yc = square0.y_coordinate;
    let r = squareH/2;
    let x1 = xc + r;
    let y1 = yc + r;

    let player = document.getElementById(playerName.toString());

    player.style.height = squareH + 'px';
    player.style.width = squareH + 'px';
    player.style.left = xc;
    player.style.top = yc;

    // ctx.beginPath();
    // ctx.arc(x1, y1, squareH/2.5, 0, 2 * Math.PI, false);
    // ctx.fillStyle = 'black';
    // ctx.fill();
    //
    // // putting the text inside the circle
    // ctx.beginPath();
    // ctx.font = (squareH/3).toString() + "px arial";
    // ctx.fillStyle = 'red';
    // ctx.fillText(playerName.toString(), xc + r/2, y1);
    // ctx.fill();
};



let showNumber = ()=>{
  let tossNumbers = [1,2,3,4,5,6];
  let index = Math.floor(Math.random()* 7 );
  return tossNumbers[index];
};

let tossMin = 0 , tossMax = 0;

let max = new Player(tossMax , 'Max');
let min = new Player(tossMin,'Min');

let tosses = function(){
    let m = document.getElementById('toss');
    let m2 = document.getElementById('toss2');

    m.innerText = 'Click Here';
    m2.innerText = 'Click Here';

    let toss1 = function () { // toss for Max Player
        tossMax = showNumber();
        m.innerText = tossMax.toString();
        playersMover(max , tossMax)
    };
    let toss2 = function(){ // toss for the Min player
        tossMin = showNumber();
        m2.innerText = tossMin.toString();
        playersMover(min , tossMin)
    };

    m.addEventListener('click' , toss1 , false);
    m2.addEventListener("click", toss2 , false);
};




let playersMover = function (player , Number) {
    player.squareNum += Number  ; // the number of the square to which this player will be transformed
    player.draw();
};

//tosses();

function myFuncyio(){
    var elem = document.getElementById("toss2");
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos === 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}



playersMover('Min' , 45);
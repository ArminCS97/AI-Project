let Player = function (squareNum , playerId , currentX , currentY) {
    this.player = playerId;
    this.squareNum = squareNum;
    this.current_x = currentX;
    this.current_y = currentY;
    this.draw = function () {
        drawThePlayer(this.squareNum , this.player , this.current_x , this.current_y);
    };

};


let drawThePlayer = ( squareID , playerName , currentX , currentY )=>{ // draws a player on a specific square
    let square0 = convertTextID_to_ij(squareID);
    let squareH = square0.squareHeigth;
    let xc = square0.x_coordinate;
    let yc = square0.y_coordinate;

    let player = document.getElementById(playerName.toString());

    player.innerText = playerName.toString();
    player.style.textAlign = 'center';
    player.style.fontSize = 'xx-large';
    player.style.fontWeight = 'bold';
    player.style.height = squareH / 1.1 + 'px';
    player.style.width =  squareH / 1.1 + 'px';

    let x_position = currentX;
    let y_position = currentY;


    let id2 = setInterval(myFrame2 , 4);
    function myFrame2(){
        if (y_position >= yc)
            clearInterval(id2);
        else{
            y_position++;
            player.style.top = toPixelConverter(y_position)
        }
    }

    let id = setInterval(myFrame , 4);
    function myFrame() {
        if ( x_position >= xc)
            clearInterval(id);
        else {
            x_position++;
            player.style.left = toPixelConverter(x_position)
        }
    }
    alert(square0.goodPit);
    // if (square0.goodPit === true){
    //     square0.text = square0.upTo;
    //     drawThePlayer(square0.text , playerName)
    // }
    // if (square0.goodPit === false && square0.pit === true){
    //     square0.text = square0.downTo;
    //     drawThePlayer(square0.text , playerName)
    // }
};

let i = 0;

let toPixelConverter = function ( number ){
    return (number + 22).toString() + 'px';
};


let showNumber = ()=>{
  let tossNumbers = [1,2,3,4,5,6];
  let index = Math.floor(Math.random()* 7 );
  return tossNumbers[index];
};

let tossMin = 0 , tossMax = 0;

let max = new Player(tossMax , 'Max' , 0 , 0);
let min = new Player(tossMin,'Min' , 0 , 0);

let tosses = function(){
    let m = document.getElementById('toss');
    let m2 = document.getElementById('toss2');

    m.innerText = 'Click Here';
    m2.innerText = 'Click Here';
        let toss1 = function () { // toss for Max Player
            tossMax = showNumber();
            m.innerText = tossMax.toString();
            playersMover(max, tossMax);
    };

        m.addEventListener('click', toss1, false);

        let toss2 = function () { // toss for the Min player
            tossMin = showNumber();
            m2.innerText = tossMin.toString();
            playersMover(min, tossMin);
        };

        m2.addEventListener("click", toss2, false);
};


let playersMover = function (player , Number) { // takes an object of type Player
    player.squareNum += Number  ; // the number of the square to which this player will be transformed
    player.draw();

};

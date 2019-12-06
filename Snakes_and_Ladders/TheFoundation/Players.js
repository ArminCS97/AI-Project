let Player = function (squareNum , playerId) {
    this.player = playerId;
    this.squareNum = squareNum;
    this.draw = function () {
        drawThePlayer(this.squareNum , this.player);
    };

};


let drawThePlayer = ( squareID , playerName )=>{ // draws a player on a specific square
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

    let x_position = 0;
    let y_position = 0;

    if (xc === 0)
        xc = 3;

    if (yc === 0)
        yc = 3;
    // the 4 lines of code above helps to solve the problem that would happen
    // when we wanted to move to squares 10k

    let id2 = setInterval(myFrame2 , 0.5);
    function myFrame2(){
        if (y_position >= yc)
            clearInterval(id2);
        else{
            y_position += 3;
            player.style.top = toPixelConverter(y_position)
        }
    }

    let id = setInterval(myFrame , 0.5);
    function myFrame() {
        if ( x_position >= xc)
            clearInterval(id);
        else {
            x_position += 3;
            player.style.left = toPixelConverter(x_position)
        }
    }
};

let toPixelConverter = function ( number ){
    return (number + 22).toString() + 'px';
};


// let showNumber = ()=>{
//   let tossNumbers = [1,2,3,4,5,6];
//   let index = Math.floor(Math.random()* 7 );
//   return tossNumbers[index];
// };

let die = function() {
    m.innerText = 'Max';
    m2.innerText = 'Min';
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

let players_up_down_bringer = function (player){
    // the codes below are to check if the player must be brought up or down
    let square = convertTextID_to_ij(player.squareNum); // the square in which the player is

    if ( square.goodPit === true){
        player.squareNum = Number(square.upTo);
        player.draw();
    }

    if ( square.goodPit === false && square.pit === true){
        player.squareNum = Number(square.downTo);
        player.draw()
    }

};

let playersMover = function (player , number) { // takes an object of type Player
    player.squareNum += Number(number)  ; // the number of the square to which this player will be transformed
    let id = setInterval(player.draw() , 1);
    clearInterval(id);
    setTimeout(function () {
        players_up_down_bringer(player)
    } , 5500)
};



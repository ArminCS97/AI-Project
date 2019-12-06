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
let pits = [];

let createThePits = function(){
    let pit;
    let numberOfPits = 42;
    for (let i = 0; i < numberOfPits ;) {
        pit = Math.floor(Math.random() * ( 91 - 11) + 11);
        if (In(pits , pit) === false) {
            pits.push(pit);
            i++;
        }
    }
};

let arrayRunner = function (){
    arrayFiller();
    createThePits();

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gamePlane[i][j].draw();
        }
    }
};

arrayRunner();

let applyTheRules = () =>{
    for (let i = 0; i < pits.length-2; i++) {
        setTimeout(function () {
            convertTextID_to_ij(pits[i]).pit = true;
            convertTextID_to_ij(pits[i]).draw();
            convertTextID_to_ij(pits[i+2]).goodPit = true;
            convertTextID_to_ij(pits[i+2]).draw();
        } , i*5000)
    }
};
applyTheRules();
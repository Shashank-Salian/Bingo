const container = document.querySelector(".container"),
autoBtn = document.querySelector("#auto"),
allBox = document.querySelectorAll(".boxes");

var hoveredDiv, counter = 1, selectedDivs = [], divFound = false;

enterMouse = () => {
    hoveredDiv.innerHTML = counter;
}

leaveMouse = () => {
    hoveredDiv.innerHTML = "";
}

clickDiv = ()=>{
    selectedDivs.push(hoveredDiv.id);
    hoveredDiv.removeEventListener("mouseenter", enterMouse, true);
    hoveredDiv.removeEventListener("mouseleave", leaveMouse, true);
    hoveredDiv.removeEventListener("click", clickDiv, true);
    hoveredDiv.style.color = "#000";
    hoveredDiv.style.cursor = "default";
    counter++;
    if(counter === 26){this.clickDiv(eve, hoveredDiv)
        counter = 1;
        container.removeEventListener("mouseenter", parentEvent, true);
        selectedDivs = [];
        startGame();
    }
}

function addEventsToDivs(){
    hoveredDiv.addEventListener("mouseenter", enterMouse, true);
    hoveredDiv.addEventListener("mouseleave", leaveMouse, true);
    hoveredDiv.addEventListener("click", clickDiv, true);
}

parentEvent = function(){
    if(event.target.classList.value !== "container" && event.target.classList.value !== "heading" && event.target.classList[1] !== "gname"){
        hoveredDiv = event.target;
        divFound = false;
        let i = 0;
        do{
            if(hoveredDiv.id === selectedDivs[i]){
                divFound = true;
                break;
            }
            i++;
        }while(i < selectedDivs.length)
        if(!divFound){
            addEventsToDivs();
        }
    }
}

container.addEventListener("mouseenter", parentEvent, true);


autoBtn.addEventListener("click", ()=>{
    let randNum, n = 25, arr = [];
    for(let i = 1; i <= 25; i++){ arr[i - 1] = i }

    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            randNum = Math.floor(Math.random() * n );
            // console.log(randNum);
            let aDivId = "box" + i + "" + j;
            let ele = document.getElementById(aDivId);
            ele.innerText = arr[randNum];
            arr.splice(randNum, 1);
            n--;
            ele.removeEventListener("mouseenter", enterMouse, true);
            ele.removeEventListener("mouseleave", leaveMouse, true);
            ele.removeEventListener("click", clickDiv, true);
            ele.style.color = "#000";
            ele.style.cursor = "default";
        }
    }

    container.removeEventListener("mouseenter", parentEvent, true);

    autoBtn.innerHTML = "Re-Generate";
    startGame();
});

// function getComputerNumber(){
//     var a;
//     a = Math.floor(Math.random() * 25 + 1);
//     // console.log(selectedDivs);
//     selectedDivs.forEach(num => {
//         if(a === num){
//             getComputerNumber();
//         }else{
//             return a;
//         }
//     });
// }

//Second part

function startGame(){
    allBox.classList += "pointer";
    var i,j,boxId, useNumbers = [[],[],[],[],[]];
    for(i = 0; i < 5; i++){
        for(j = 0; j < 5; j++){
            boxId = "box" + i + "" + j;
            // console.log(boxId);
            // console.log(document.getElementById(boxId));
            useNumbers[i][j] = document.getElementById(boxId).innerHTML;
            // console.log(useNumbers[i][j]);
        }
    }

    gameEvent = function(){
        if(event.target.classList.value !== "container" && event.target.classList.value !== "heading" && event.target.classList[1] !== "gname"){

        }
    }
    
    container.addEventListener("click", gameEvent, true);

}

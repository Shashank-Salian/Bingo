window.onload = () => {

const autoBtn = document.querySelector("#auto"),
  container = document.querySelector(".container"),
  allBox = document.querySelectorAll(".boxes"),
  rstBtn = document.querySelector("#reset"),
  replay = document.querySelector("#replay"),
  gNames = document.querySelectorAll(".gname"),
  result = document.querySelector(".result");

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent), counter = 1, hoveredDiv;


autoBtn.addEventListener("click", () => {
  let randNum, n = 25, arr = [];
  for (let i = 1; i <= 25; i++) arr[i - 1] = i;

  allBox.forEach(box => {
    randNum = Math.floor(Math.random() * n);
    box.innerText = arr[randNum];
    arr.splice(randNum, 1);
    n--;
    if(!isMobile){
      box.removeEventListener("mouseenter", addNum, true);
      box.removeEventListener("mouseleave", remNum, true);
    }
    box.removeEventListener("click", fixNum, true);
    box.style.color = "#000";
    box.style.cursor = "default";
  });
  startGame()
});


rstBtn.addEventListener("click", () => {
  autoBtn.disabled = false;
  allBox.forEach(box => {
    box.innerText = "";
    box.removeEventListener("mouseenter", addCross, true);
    box.removeEventListener("mouseleave", remCross, true);
    box.removeEventListener("click", fixCross, true);
  });
  counter = 1;
  addEvent();
});

replay.addEventListener("click", () => {
  location.reload();
});

addNum = e => {
  hoveredDiv = e.target;
  hoveredDiv.style.color = "rgba(0,0,0,0.7)"
  hoveredDiv.style.cursor = "pointer";
  hoveredDiv.innerText = counter;
}

remNum = () => {
  hoveredDiv.innerText = "";
}

fixNum = e => {
  if(!isMobile){
    hoveredDiv.removeEventListener("mouseenter", addNum, true);
    hoveredDiv.removeEventListener("mouseleave", remNum, true);
  } else {
    addNum(e);
  }
  hoveredDiv.removeEventListener("click", fixNum, true);
  hoveredDiv.style.color = "#000";
  hoveredDiv.style.cursor = "default";
  counter++;
  if(counter === 26){
    autoBtn.disabled = true;
    startGame();
  }
}


addCross = e => {
  hoveredDiv = e.target;
  if(hoveredDiv.classList[0] !== "boxes") hoveredDiv = hoveredDiv.parentNode;
  hoveredDiv.children[0].classList = "cross";
  hoveredDiv.children[1].classList = "cross2"
}

remCross = e => {
  hoveredDiv = e.target;
  if(hoveredDiv.classList == "cross" || hoveredDiv.classList == "cross2"){
    let e = {
      target: hoveredDiv.parentNode
    };
    addCross(e);
  } else {
    hoveredDiv.children[0].classList = "";
    hoveredDiv.children[1].classList = "";
  }
}

fixCross = e => {
  rstBtn.disabled = true;
  autoBtn.disabled = true;
  hoveredDiv = e.target;
  if(hoveredDiv.classList[0] === "cross" || hoveredDiv.classList[0] === "cross2"){
    hoveredDiv  = hoveredDiv.parentNode;
  }
  hoveredDiv.children[0].classList = "fix-cross";
  hoveredDiv.children[1].classList = "fix-cross2";
  hoveredDiv.style.cursor = "default";

  if(!isMobile){
    hoveredDiv.removeEventListener("mouseenter", addCross, true);
    hoveredDiv.removeEventListener("mouseleave", remCross, true);
  }
  hoveredDiv.removeEventListener("click", fixCross, true);
  let p = compArr.indexOf(parseInt(hoveredDiv.innerText));
  let p2 = compVerArr.indexOf(parseInt(hoveredDiv.innerText));
  compArr[p] = compArr[p] - (compArr[p] * 2);
  compVerArr[p2] = compVerArr[p2] - (compVerArr[p2] * 2);
  checkLineHor();
  checkLineVer();
  checkCompLineHor();
  checkCompLineVer();
  compGame(parseInt(hoveredDiv.id[3] + hoveredDiv.id[4]));
}

let compArr = [], compVerArr = [];
compNumberGen = () => {
  let temp = [];
  for(let i = 1; i <= 25; i++) temp[i - 1] = i;
  for(let i = 0; i < 25; i++) {
    let n = Math.floor(Math.random() * temp.length);
    compArr[i] = temp[n];
    temp.splice(n, 1);
  }
}

let arr = [];

for(let i = 1; i < 25; i++) arr[i - 1] = i;

compGame = uid => {
  let div;
  if(arr.length > 1){
    for(let i = 0; i < arr.length; i++)
      if (arr[i] === uid) {
        arr.splice(i, 1);
        break;
      }
    let num = Math.floor(Math.random() * arr.length);
    div = document.getElementById("box" + arr[num]);
    arr.splice(num, 1);
    div.children[0].classList += "fix-cross comp-cross";
    div.children[1].classList += "fix-cross2 comp-cross";
    div.style.cursor = "default";
    if(!isMobile){
      div.removeEventListener("mouseenter", addCross, true);
      div.removeEventListener("mouseleave", remCross, true);
    }
    div.removeEventListener("click", fixCross, true);

    let p = compArr.indexOf(parseInt(div.innerText));
    let p2 = compVerArr.indexOf(parseInt(div.innerText));
    compArr[p] = compArr[p] - (compArr[p] * 2);
    compVerArr[p2] = compVerArr[p2] - (compVerArr[p2] * 2);
    checkLineHor();
    checkLineVer();
    checkCompLineHor();
    checkCompLineVer();
  }
}

let frstLine = false, secLine = false, trdLine = false, frthLine = false, fifthLine = false;

checkLineHor = () => {
  let i = 0, t = false;
  while(i < 25) {
    t = false;
    if(allBox[i].firstElementChild.classList[0] === undefined) {
      if(i < 5)  i = 5;
      else if(i < 10)  i = 10;
      else if(i < 15)  i = 15;
      else if(i < 20)  i = 20;
      else if(i < 25)  i = 25;
    } else {
      if(frstLine && i === 0) {
        i = 5;
        t = true;
      }
      if(secLine && i === 5) {
        i = 10;
        t = true;
      }
      if(trdLine && i === 10) {
        i = 15;
        t = true;
      }
      if(frthLine && i === 15) {
        i = 20;
        t = true;
      }
      if(fifthLine && i === 20) {
        i = 25;
        t = true;
      }
      if(i === 4){
        frstLine = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 9) {
        secLine = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 14) {
        trdLine = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 19) {
        frthLine = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 24) {
        fifthLine = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(!t) {
        i++;
      }
    }
  }
}

changePosVer = arr => {
  let n = 0, newArr = [];
  for(let i = 0; i < arr.length; i++) {
    newArr[Math.floor(i/5 + n)] = arr[i];
    n += 5;
    if(n === 25)  n = 0;
  }
  return newArr;
}

let verArr = changePosVer(allBox);

let frstRow = false, secRow = false, trdRow = false, frthRow = false, fifthRow = false;

checkLineVer = () => {
  let i = 0, t = false;
  while(i < 25) {
    t = false;
    if(verArr[i].firstElementChild.classList[0] === undefined) {
      if(i < 5)  i = 5;
      else if(i < 10)  i = 10;
      else if(i < 15)  i = 15;
      else if(i < 20)  i = 20;
      else if(i < 25)  i = 25;
    } else {
      if(frstRow && i === 0) {
        i = 5;
        t = true;
      }
      if(secRow && i === 5) {
        i = 10;
        t = true;
      }
      if(trdRow && i === 10) {
        i = 15;
        t = true;
      }
      if(frthRow && i === 15) {
        i = 20;
        t = true;
      }
      if(fifthRow && i === 20) {
        i = 25;
        t = true;
      }
      if(i === 4){
        frstRow = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 9) {
        secRow = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 14) {
        trdRow = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 19) {
        frthRow = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(i === 24) {
        fifthRow = true;
        i++;
        if(userCompleteCount < 5)  userCompleteCount++;
        gnameFixCross();
      } else if(!t) {
        i++;
      }
    }
  }
}

let compFrstLine = false, compSecLine = false, compTrdLine = false, compFrthLine = false, compFifthLine = false;
let compCompleteCount = 0, userCompleteCount = 0;

checkCompLineHor = () => {
  let i = 0, t = false;
  while(i < 25) {
    t = false;
    if(compArr[i] > 0) {
      if(i < 5)  i = 5;
      else if(i < 10)  i = 10;
      else if(i < 15)  i = 15;
      else if(i < 20)  i = 20;
      else if(i < 25)  i = 25;
    } else {
      if(compFrstLine && i === 0) {
        i = 5;
        t = true;
      }
      if(compSecLine && i === 5) {
        i = 10;
        t = true;
      }
      if(compTrdLine && i === 10) {
        i = 15;
        t = true;
      }
      if(compFrthLine && i === 15) {
        i = 20;
        t = true;
      }
      if(compFifthLine && i === 20) {
        i = 25;
        t = true;
      }
      if(i === 4){
        compFrstLine = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 9) {
        compSecLine = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 14) {
        compTrdLine = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 19) {
        compFrthLine = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 24) {
        compFifthLine = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(!t) {
        i++;
      }
    }
  }
}

let compFrstRow = false, compSecRow = false, compTrdRow = false, compFrthRow = false, compFifthRow = false;

checkCompLineVer = () => {
  let i = 0, t = false;
  while(i < 25) {
    t = false;
    if(compVerArr[i] > 0) {
      if(i < 5)  i = 5;
      else if(i < 10)  i = 10;
      else if(i < 15)  i = 15;
      else if(i < 20)  i = 20;
      else if(i < 25)  i = 25;
    } else {
      if(compFrstRow && i === 0) {
        i = 5;
        t = true;
      }
      if(compSecRow && i === 5) {
        i = 10;
        t = true;
      }
      if(compTrdRow && i === 10) {
        i = 15;
        t = true;
      }
      if(compFrthRow && i === 15) {
        i = 20;
        t = true;
      }
      if(compFifthRow && i === 20) {
        i = 25;
        t = true;
      }
      if(i === 4){
        compFrstRow = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 9) {
        compSecRow = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 14) {
        compTrdRow = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 19) {
        compFrthRow = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(i === 24) {
        compFifthRow = true;
        i++;
        if(compCompleteCount < 5)  compCompleteCount++;
      } else if(!t) {
        i++;
      }
    }
  }
  gameComplete(compCompleteCount, userCompleteCount);
}

gameComplete = (c, u) => {
  let t = false;
  if(c === 5 && u === 5) {
    t = true;
    result.innerHTML = "Its a Tie : |";
  } else if (c === 5) {
    result.innerHTML = "Computer Won : <";
    t = true;
  } else if (u === 5) {
    result.innerHTML = "You Won : )"
    t = true;
  }
  if(t){
    container.style.backgroundColor = "#00000050";
    const restart = document.querySelector("#restart");
    allBox.forEach(box => {
      if(!isMobile){
        box.removeEventListener("mouseenter", addCross, true);
        box.removeEventListener("mouseleave", remCross, true);
      }
      box.removeEventListener("click", fixCross, true);
      box.style.cursor = "default";
    });
    restart.style.display = "block";
    restart.addEventListener("click", () => {
      location.reload();
    });
  }
}

gnameFixCross = () => {
  let j;
  for(j = 0; j < gNames.length; j++) {
    if(gNames[j].firstElementChild.classList[0] === undefined) {
      gNames[j].children[0].classList = "game-cross";
      gNames[j].children[1].classList = "game-cross2";
      break;
    }
  } if(j === 4)  gameComplete();
}

addEvent = () => {
  allBox.forEach(box => {
    if(!isMobile){
      box.addEventListener("mouseenter", addNum, true);
      box.addEventListener("mouseleave", remNum, true);
    }
    box.addEventListener("click", fixNum, true);
  });
}

addCrossEvent = () => {
  allBox.forEach(box => {
    box.style.cursor = "pointer";
    let childOne = document.createElement("div");
    let childTwo = document.createElement("div");
    box.appendChild(childOne);
    box.appendChild(childTwo);
    if(!isMobile){
      box.addEventListener("mouseenter", addCross, true);
      box.addEventListener("mouseleave", remCross, true);
    }
    box.addEventListener("click", fixCross, true);
  });
}

startGame = () => {
  addCrossEvent();
  compNumberGen();
  compVerArr = changePosVer(compArr);
  let n = Math.floor(Math.random() * 2);
  if(n === 1) compGame(0);
}

addEvent();

}

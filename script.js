window.onload = () => {

const autoBtn = document.querySelector("#auto"),
  allBox = document.querySelectorAll(".boxes"),
  rstBtn = document.querySelector("#reset"),
  replay = document.querySelector("#replay"),
  gNames = document.querySelectorAll(".gname");
  // console.log(gNames)

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
    // usrNum.push(parseInt(box.innerText));
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
  compGame(parseInt(hoveredDiv.id[3] + hoveredDiv.id[4]));
  checkLineHor();
}

let arr = [];

for(let i = 0; i < 25; i++) arr[i - 1] = i;

compGame = uid => {
  if(arr.length > 1){
    for(let i = 0; i < arr.length; i++)
      if (arr[i] === uid) {
        arr.splice(i, 1);
        break;
      }
    let num = Math.floor(Math.random() * arr.length);
    let div = document.getElementById("box" + arr[num]);
    arr.splice(num, 1);
    div.children[0].classList += "fix-cross comp-cross";
    div.children[1].classList += "fix-cross2 comp-cross";
    div.style.cursor = "default";
    if(!isMobile){
      div.removeEventListener("mouseenter", addCross, true);
      div.removeEventListener("mouseleave", remCross, true);
    }
    div.removeEventListener("click", fixCross, true);
  }
  checkLineHor();
  checkLineVer();
}

let frstLine = false, secLine = false, trdLine = false, frthLine, fifthLine = false;

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
      // console.log(i);
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
        console.log("First Line");
        frstLine = true;
        i++;
        gnameFixCross();
      } else if(i === 9) {
        console.log("Second Line");
        secLine = true;
        i++;
        gnameFixCross();
      } else if(i === 14) {
        console.log("Third Line");
        trdLine = true;
        i++;
        gnameFixCross();
      } else if(i === 19) {
        console.log("Fourth Line");
        frthLine = true;
        i++;
        gnameFixCross();
      } else if(i === 24) {
        console.log("Fifth line");
        fifthLine = true;
        i++;
        gnameFixCross();
      } else if(!t) {
        i++;
      }
    }
  }
}

let verArr = []

changePosVer = () => {
  let n = 0;
  for(let i = 0; i < allBox.length; i++) {
    verArr[Math.floor(i/5+n)] = allBox[i];
    n += 5;
    if(n === 25)  n = 0;
  }
}

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
      // console.log(i);
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
        console.log("First Row");
        frstRow = true;
        i++;
        gnameFixCross();
      } else if(i === 9) {
        console.log("Second Row");
        secRow = true;
        i++;
        gnameFixCross();
      } else if(i === 14) {
        console.log("Third Row");
        trdRow = true;
        i++;
        gnameFixCross();
      } else if(i === 19) {
        console.log("Fourth Row");
        frthRow = true;
        i++;
        gnameFixCross();
      } else if(i === 24) {
        console.log("Fifth Row");
        fifthRow = true;
        i++;
        gnameFixCross();
      } else if(!t) {
        i++;
      }
    }
  }
}

gnameFixCross = () => {
  let j;
  for(j = 0; j < gNames.length; j++) {
    if(gNames[j].firstElementChild.classList[0] === undefined) {
      gNames[j].children[0].classList = "game-cross";
      gNames[j].children[1].classList = "game-cross2";
      break;
    } else if(j === 4)  console.log("Game Over");
  }
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
}



addEvent();
changePosVer();

}

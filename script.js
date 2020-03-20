const container = document.querySelector(".container"),
  autoBtn = document.querySelector("#auto"),
  allBox = document.querySelectorAll(".boxes"),
  rstBtn = document.querySelector("#reset"),
  replay = document.querySelector("#replay");

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
  allBox.forEach(box => {
    box.innerText = "";
    box.removeEventListener("mouseenter", addCross, true);
    box.removeEventListener("mouseleave", remCross, true);
    box.removeEventListener("click", fixCross, true);
  });
  counter = 1;
  autoBtn.disabled = false;
  rstBtn.disabled = false;
  count = 0;
  addEvent();
})

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
  if(!isMobile){
    hoveredDiv.removeEventListener("mouseenter", addCross, true);
    hoveredDiv.removeEventListener("mouseleave", remCross, true);
  }
  hoveredDiv.removeEventListener("click", fixCross, true);
  compGame();
}

let count = 0;

compGame = () => {
  let num = Math.floor(Math.random() * 25);
  let compDiv = document.getElementById("box" + num);
  if(compDiv.children[0].classList[0] !== undefined  && count < 12) {
    compGame();
  } else {
    count++;
    compDiv.children[0].classList = "fix-cross";
    compDiv.children[1].classList = "fix-cross2";
  if(!isMobile) {
    compDiv.removeEventListener("mouseenter", addCross, true);
    compDiv.removeEventListener("mouseleave", remCross, true);
  }
  compDiv.removeEventListener("click", fixCross, true);
  }
  checkLineHor();
  // checkLineVer();
}

switchLineHor = n => {
  let i;
  switch(n) {
    case 5:
      i = 5;
      break;
    case 10:
      i = 10;
      break;
    case 15:
      i = 15;
      break;
    case 20:
      i = 20;
      break;
    default:
      i = 25;
      break;
  }
  return i;
}

let lineComplete = [];
checkLineHor = () => {
  let i = 0, id, div, n = 5;
  do {
    id = "box" + i;
    div = document.getElementById(id);
    // console.log(div);
    if(div.children[0].classList[0] === "fix-cross"){
      i++;
      if(i === 4 || i === 9 || i === 14 || i === 19 || i === 24){
        if(!lineComplete.includes(i)){
        console.log("One line completed");
        i = switchLineHor(n);
        if(n <= 20)  n += 5;
        switch(i) {
          case 5:
            lineComplete.push(4);
            break;
          case 10:
            lineComplete.push(9);
            break;
          case 15:
            lineComplete.push(14);
            break;
          case 20:
            lineComplete.push(19);
            break;
          default:
            lineComplete.push(24);
        }
      }
      }
    } else {
      i = switchLineHor(n);
      if(n <= 20)  n += 5;
    }
  } while(i < n)
  // console.log(div);
  console.log(lineComplete);
}

checkLineVer = () => {
  let i = 0, id, div, n = 20;
  do {
    id = "box" + i;
    div = document.getElementById(id);
    if(div.children[0].classList[0] === "fix-cross")  i += 5;
    else{
      switch(n) {
        case 20:
          n = 9;
          i = 5;
          break;
        case 9:
          n = 14;
          i = 10;
          break;
        case 14:
          n = 19;
          i = 15;
          break;
        case 19:
          n = 24;
          i = 20;
          break;
        default:
          i = 25;
          break;
      }
    }
  } while(i < n)
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

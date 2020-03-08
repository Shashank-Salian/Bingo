const container = document.querySelector(".container"),
  autoBtn = document.querySelector("#auto"),
  allBox = document.querySelectorAll(".boxes"),
  rstBtn = document.querySelector("#reset");

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent), counter = 1, hoveredDiv;

autoBtn.addEventListener("click", () => {
  let randNum, n = 25,
  arr = [];
  for (let i = 1; i <= 25; i++) arr[i - 1] = i;

  allBox.forEach(box => {
    randNum = Math.floor(Math.random() * n);
    box.innerText = arr[randNum];
    arr.splice(randNum, 1);
    n--;
    box.removeEventListener("mouseenter", addNum, true);
    box.removeEventListener("mouseleave", remNum, true);
    box.removeEventListener("click", fixNum, true);
    box.style.color = "#000";
    box.style.cursor = "default";
  });
  startGame()
});
      
      
rstBtn.addEventListener("click", () => {
  allBox.forEach(box => {
    box.innerText = "";
  });
  counter = 1;
  addEvent();
});

addNum = e => {
  hoveredDiv = e.target;
  hoveredDiv.style.color = "rgba(0,0,0,0.7)"
  hoveredDiv.style.cursor = "pointer";
  hoveredDiv = e.target;
  hoveredDiv.innerText = counter;
}

remNum = () => {
  hoveredDiv.innerText = "";
}

fixNum = () => {
  hoveredDiv.removeEventListener("mouseenter", addNum, true);
  hoveredDiv.removeEventListener("mouseleave", remNum, true);
  hoveredDiv.removeEventListener("click", fixNum, true);
  hoveredDiv.style.color = "#000";
  hoveredDiv.style.cursor = "default";
  counter++;
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

addCross = e => {
  hoveredDiv = e.target;
  if(hoveredDiv.classList !== "boxes") hoveredDiv = hoveredDiv.parentNode;
  hoveredDiv.children[0].classList += "cross";
  hoveredDiv.children[1].classList += "cross2"
}

remCross = () => {}

fixCross = () => {}

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

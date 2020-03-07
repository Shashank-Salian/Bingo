const container = document.querySelector(".container"),
    autoBtn = document.querySelector("#auto"),
    allBox = document.querySelectorAll(".boxes"),
    rstBtn = document.querySelector("#reset");


addCross = () => {
    allBox.forEach(box => {
        box.style.cursor = "pointer";
        let childOne = document.createElement("div");
        let childTwo = document.createElement("div");
        box.appendChild(childOne);
        box.appendChild(childTwo);
        childOne.classList += "cross";
        childTwo.classList += "cross2";
        window.secondHalf.selectedDivs.push(box.id);
        box.removeEventListener("mouseenter", secondHalf.enterMouse, true);
    });
}
    
autoBtn.addEventListener("click", () => {
    let randNum, n = 25,
        arr = [];
    for (let i = 1; i <= 25; i++) arr[i - 1] = i;

    allBox.forEach(box => {
        randNum = Math.floor(Math.random() * n);
        box.innerText = arr[randNum];
        arr.splice(randNum, 1);
        n--;
        box.removeEventListener("mouseenter", firstHalf.enterMouse, true);
        box.removeEventListener("mouseleave", firstHalf.leaveMouse, true);
        box.removeEventListener("click", firstHalf.clickDiv, true);
        box.style.color = "#000";
        box.style.cursor = "default";
    });
    startGame()
});
    
    
rstBtn.addEventListener("click", () => {
        allBox.forEach(box => {
        box.innerText = "";
    });
    firstHalf.counter = 1;
    firstHalf.selectedDivs = [];
    container.removeEventListener("mouseenter", secondHalf.parentEvent, true);
    container.addEventListener("mouseenter", firstHalf.parentEvent, true);
});

class Bingo {
    constructor(eve) {
        this.eve = eve;
        this.divFound = false;
        this.counter = 1;
        this.selectedDivs = [];
    }

    enterMouse = e => {
        this.hoveredDiv.style.cursor = "pointer";
        this.hoveredDiv = e.target;
        this.hoveredDiv.innerText = this.counter;
    }

    leaveMouse = e => {
        this.hoveredDiv = e.target;
        this.hoveredDiv.innerText = "";
    }

    clickDiv = e => {
        if (!this.eve) {
            this.hoveredDiv = e.target;
            this.selectedDivs.push(this.hoveredDiv.id);
            this.hoveredDiv.removeEventListener("mouseenter", this.enterMouse, true);
            this.hoveredDiv.removeEventListener("mouseleave", this.leaveMouse, true);
            this.hoveredDiv.removeEventListener("click", this.clickDiv, true);
            this.hoveredDiv.style.color = "#000";
            this.hoveredDiv.style.cursor = "default";
            this.counter++;
            if (this.counter === 26) {
                container.removeEventListener("mouseenter", firstHalf.parentEvent, true);
                autoBtn.disabled = true;
                startGame();
            }
        } else {
            if(this.hoveredDiv.classList[0] === "cross" || this.hoveredDiv.classList[0] === "cross2"){
                this.hoveredDiv = this.hoveredDiv.parentNode;
            }
            this.selectedDivs.push(this.hoveredDiv.id);
            const cross = this.hoveredDiv.children;
            cross[0].classList = "fix-cross";
            cross[1].classList = "fix-cross2";
            this.hoveredDiv.removeEventListener("click", this.clickDiv, true);
        }
    }

    addEventsDivs() {
        if(!this.eve){
            this.hoveredDiv.addEventListener("mouseenter", this.enterMouse, true);
            this.hoveredDiv.addEventListener("mouseleave", this.leaveMouse, true);
            this.hoveredDiv.addEventListener("click", this.clickDiv, true);
        } else {
            this.hoveredDiv.addEventListener("click", this.clickDiv, true);
        }
    }

    parentEvent = e => {
        this.hoveredDiv = e.target;
        // console.log(this.hoveredDiv);
        if (this.hoveredDiv.classList[0] === "boxes") {
            let i = 0;
            this.divFound = false;
            do {
                if (this.hoveredDiv.id === this.selectedDivs[i]) {
                    this.divFound = true;
                    break;
                }
                i++;
            } while (i < this.selectedDivs.length)

            if (!this.divFound) {
                this.addEventsDivs();
            }
        }
    }
}


const firstHalf = new Bingo(0);


container.addEventListener("mouseenter", firstHalf.parentEvent, true);


startGame = () => {
    container.removeEventListener("mouseenter", firstHalf.parentEvent, true);
    window.secondHalf = new Bingo(1);
    addCross();
    secondHalf.selectedDivs = [];
    container.addEventListener("mouseenter", secondHalf.parentEvent, true);
}

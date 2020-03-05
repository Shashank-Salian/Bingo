const container = document.querySelector(".container"),
    autoBtn = document.querySelector("#auto"),
    allBox = document.querySelectorAll(".boxes"),
    rstBtn = document.querySelector("#reset");


class Bingo {
    constructor(eve) {
        this.eve = eve;
        this.divFound = false;
        this.counter = 1;
        this.selectedDivs = [];
    }

    enterMouse = (e) => {
        if (!this.eve) {
            this.hoveredDiv.style.cursor = "pointer";
            this.hoveredDiv = e.target;
            this.hoveredDiv.innerText = this.counter;
        } else {
            console.log(this.hoveredDiv.childElementCount);
            if (this.hoveredDiv.childElementCount === 0) {
                // console.log( toString(allBox[0].childNodes) );
                this.hoveredDiv.style.cursor = "pointer";
                this.childOne = document.createElement("div");
                this.childTwo = document.createElement("div");
                this.hoveredDiv.appendChild(this.childOne);
                this.hoveredDiv.appendChild(this.childTwo);
                this.childOne.classList += "selected";
                this.childTwo.classList += "selected2";
            }
        }
    }

    leaveMouse = (e) => {
        if (!this.eve) {
            this.hoveredDiv = e.target;
            this.hoveredDiv.innerText = "";
        } else {
            while (this.hoveredDiv.firstChild) {
                this.hoveredDiv.removeChild(this.hoveredDiv.firstChild);
            }
        }
    }

    clickDiv = (e) => {
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
            }
        } else {
            this.childOne.style.opacity = "1";
            this.childTwo.style.opacity = "1";
            this.hoveredDiv.removeEventListener("mouseenter", this.enterMouse, true);
        }
    }

    addEventsDivs() {
        this.hoveredDiv.addEventListener("mouseenter", this.enterMouse, true);
        this.hoveredDiv.addEventListener("mouseleave", this.leaveMouse, true);
        this.hoveredDiv.addEventListener("click", this.clickDiv, true);
        // console.log(this.hoveredDiv);
    }

    parentEvent = (e) => {
        this.hoveredDiv = e.target;
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


let startGame = () => {
    const secondHalf = new Bingo(1);
    container.addEventListener("mouseenter", secondHalf.parentEvent, true);
}

autoBtn.addEventListener("click", () => {
    let randNum, n = 25,
        arr = [];
    for (let i = 1; i <= 25; i++) {
        arr[i - 1] = i;
    }

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
    container.removeEventListener("mouseenter", firstHalf.parentEvent, true);
    startGame();
});


rstBtn.addEventListener("click", () => {
    allBox.forEach(box => {
        box.innerText = "";
    });
    firstHalf.counter = 1;
    firstHalf.selectedDivs = [];
    container.addEventListener("mouseenter", firstHalf.parentEvent, true);
});

const container = document.querySelector(".container"),
autoBtn = document.querySelector("#auto"),
allBox = document.querySelectorAll(".boxes");

class Bingo {
    constructor(eve){
        this.eve = eve;
        this.divFound = false;
        this.counter = 1;
        this.selectedDivs = [];
    }

    enterMouse(e){
        if(!this.eve){
            this.hoveredDiv = e.target;
            // console.log(this.counter);
            this.hoveredDiv.innerText = this.counter;
        }else{
            
        }
    }

    leaveMouse(e){
        if(!this.eve){
            this.hoveredDiv = e.target;
            this.hoveredDiv.innerText = "";
        }else{
            while(hoveredDiv.firstChild) { hoveredDiv.removeChild(hoveredDiv.firstChild); }
        }
    }

    clickDiv(e){
        if(!this.eve){
            this.hoveredDiv = e.target;
            this.selectedDivs.push(this.hoveredDiv.id);
            this.hoveredDiv.removeEventListener("mouseenter", this.enterMouse, true);
            this.hoveredDiv.removeEventListener("mouseleave", this.leaveMouse, true);
            this.hoveredDiv.removeEventListener("click", this.clickDiv, true);
            this.hoveredDiv.style.color = "#000";
            this.hoveredDiv.style.cursor = "default";
            this.counter++;
        }else{
            this.enterMouse(1, hoveredDiv);
            this.newDiv.style.opacity = "1";
            this.newDiv2.style.opacity = "1";
            this.hoveredDiv.removeEventListener("mouseenter", this.enterMouse, true);
        }
    }

    addEventsDivs(){
        this.hoveredDiv.addEventListener("mouseenter", this.enterMouse, true);
        this.hoveredDiv.addEventListener("mouseleave", this.leaveMouse, true);
        this.hoveredDiv.addEventListener("click", this.clickDiv, true);
    }

    parentEvent = (e)=>{
        this.hoveredDiv = e.target;
        if(this.hoveredDiv.classList[0] === "boxes"){
            console.log(this.hoveredDiv);
            let i = 0;
            do{
                if(this.hoveredDiv.id === this.selectedDivs[i]){
                    console.log(this.selectedDivs);
                    this.divFound = true;
                    break;
                }
                i++;
            }while(i < this.selectedDivs.length)

            if(!this.divFound){
                this.addEventsDivs();
            }
        }
    }
}


const FirstHalf = new Bingo(0);

autoBtn.addEventListener("click", ()=>{
    let randNum, n = 25, arr = [];
    for(let i = 1; i <= 25; i++){ arr[i - 1] = i; }

    for(let i = 1; i <= 25; i++){
        randNum = Math.floor(Math.random() * n );
            // console.log(randNum);
            let aDivId = "box" + i;
            let ele = document.getElementById(aDivId);
            ele.innerText = arr[randNum];
            arr.splice(randNum, 1);
            n--;
            ele.removeEventListener("mouseenter", FirstHalf.enterMouse, true);
            ele.removeEventListener("mouseleave", FirstHalf.leaveMouse, true);
            ele.removeEventListener("click", FirstHalf.clickDiv, true);
            ele.style.color = "#000";
            ele.style.cursor = "default";
    }

    container.removeEventListener("mouseenter", FirstHalf.parentEvent, true);
});

container.addEventListener("mouseenter", FirstHalf.parentEvent, true);

let player = document.getElementById("player");
let trash = document.getElementById("trash");
let powerup = document.getElementById("powerup");
let toxic = document.getElementById("toxic");
let mask = document.getElementById("mask");
let obstacle = document.getElementById("obstacle")
let messagebox = document.getElementById("messagebox");
const livesBox = document.getElementById("lives");
const door = document.getElementById("door");
const screen = document.getElementById("screen")
const h1 = document.getElementById("level-up")
var counterclock = document.getElementById("timer")
const resumebutton = document.getElementById("start-button")
const popupContainer = document.getElementById('popup-container')
const explainerContainer = document.getElementById("explainerContainer")
const menu = document.getElementById("gameMenu")
const background = document.getElementById("background");
let trashArr = ["images/papertrash.png", "images/trashbag.png", "images/trashcan.png"]
let lives = 3;
let scoreCounter = 0;
let level = 1;
var count = 61;
let counter;
let menuOpen = false;
let help = false;

let randomTrash = trashArr[Math.floor(Math.random() * trashArr.length)];

function afsluiten(){
    location.reload();
}

function startGame() {
    if (!counter) {
        background.style.display = "block";
        counter = setInterval(timer, 1000);
        menu.style.display = "none";
        explainerContainer.style.display = "none";
    } else {
        clearInterval(counter);
        console.log("else active")
        counter = setInterval(timer, 1000);
        menu.style.display = "none";
    }
}

function uitleg(){
    if (!help){
        help = true;
        explainerContainer.style.display = "block";
        popupContainer.classList.add('show');
        menu.style.display = "none";
        background.style.display = "none";
    } else {
        explainerContainer.style.display = "none";
        popupContainer.classList.remove('show')
        menu.style.display = "flex";
        help = false;
    }
}

    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "KeyP":
                if (!menuOpen) {
                    clearInterval(counter);
                    menu.style.display = "flex";
                    resumebutton.innerHTML = "Resume";
                    menuOpen = true;
                } else {
                    clearInterval(counter);
                    console.log("else active")
                    counter = setInterval(timer, 1000);
                    menu.style.display = "none";
                    menuOpen = false;
                }
                break;
            case "KeyW":
                if (player.offsetTop > 0) {
                    player.style.top = player.offsetTop - 30 + "px";
                }
                break;
            case "KeyA":
                if (player.offsetLeft > 0) {
                    player.style.left = player.offsetLeft - 30 + "px";
                }
                break;
            case "KeyS":
                if (player.offsetTop + player.clientHeight < window.innerHeight - 100) {
                    player.style.top = player.offsetTop + 30 + "px";
                }
                break;
            case "KeyD":
                if (player.offsetLeft + player.clientWidth < window.innerWidth - 80) {
                    player.style.left = player.offsetLeft + 30 + "px";
                }
                break;
        }
    });

    function death(){
        lives -= 1;
            player.style.display = "none";
            player.style.top = Math.floor(Math.random() * window.innerHeight - 80) + "px";
            player.style.left = Math.floor(Math.random() * window.innerWidth - 80) + "px";
            player.style.display = "block";
            if (lives === 2){
                livesBox.innerHTML = "♥♥"
            } if (lives === 1){
                livesBox.innerHTML = "♥"
            }
            messagebox.innerHTML = `${lives} lives left`;
            messagebox.style.visibility = "visible";
            setTimeout(() => {
            messagebox.style.visibility = "hidden";
            }, 5000);

        if (lives === 0){
            livesBox.innerHTML = ""
            location.reload(true)
            alert("Game Over, Press F5 to restart")
        }
    }

    setInterval(function() {

        const levels = [100, 250, 375, 500, 750, 1000, 1250]; // add the new level threshold here

        if (scoreCounter >= levels[level - 1]) {
            door.style.display = "block";
            if (collision(player, door)) {
              level++;
                background.classList.add("background_class");
                door.style.display = "none";
                screen.style.display = "flex";
                h1.innerHTML = `Level ${level}`;
                h1.classList.add("center");
                count = level === 4 ? 20 : 30;
                if (count <= 0) {
                  count = level === 4 ? 20 : 30;
              }
            }
                setTimeout(function(){
                  screen.style.display = "none";
                }, 4000);          
          }          
        

        if (collision(player, trash)) {
            trash.style.display = "none";
            trash.style.top = Math.floor(Math.random() * window.innerHeight - 80) + "px";
            trash.style.left = Math.floor(Math.random() * window.innerWidth - 80) + "px";
            trash.src = randomTrash;
            trash.style.display = "block";
            scoreCounter += 10;
            messagebox.innerHTML = `Score is ${scoreCounter}`;
            messagebox.style.visibility = "visible";
            setTimeout(() => {
            messagebox.style.visibility = "hidden";
            }, 8000);
        }
        if (collision(player, powerup)) {
            powerup.style.display = "none";
            powerup.style.top = Math.floor(Math.random() * window.innerHeight - 80) + "px";
            powerup.style.left = Math.floor(Math.random() * window.innerWidth - 80) + "px";
            powerup.style.display = "block";
            player.classList.add("invincible");
            setTimeout(() => {
            player.classList.remove("invincible");
            }, 15000);
        }
        if (collision(player, toxic)) {
            if (player.src.includes("blobwithmask")|| player.classList.contains("invincible")) {
            toxic.style.display = "none";
            toxic.style.top = Math.floor(Math.random() * window.innerHeight - 80) + "px";
            toxic.style.left = Math.floor(Math.random() * window.innerWidth - 80) + "px";
            toxic.style.display = "block";
            scoreCounter += 30;
            messagebox.innerHTML = `Score is ${scoreCounter}`;
            messagebox.style.visibility = "visible";
            setTimeout(() => {
            messagebox.style.visibility = "hidden";
            }, 8000);
            }
            else{
                death()
            }
        }
        if (collision(player, mask)) {
            mask.style.display = "none";
            mask.style.top = Math.floor(Math.random() * window.innerHeight - 80) + "px";
            mask.style.left = Math.floor(Math.random() * window.innerWidth - 80) + "px";
            mask.style.display = "block";
            player.src = "images/blobwithmask.png";
            setTimeout(() => {
            player.src = "images/blob.png";
            }, 10000);
        }
        if (collision(player, obstacle)) {
            if (player.classList.contains("invincible")){
            obstacle.style.display = "none";
            obstacle.style.top = Math.floor(Math.random() * window.innerHeight - 80) + "px";
            obstacle.style.left = Math.floor(Math.random() * window.innerWidth - 80) + "px";
            obstacle.style.display = "block";
            } else {
                death()
            }
        }
    }, 100);

    function timer() {
        count = count - 1;
        if (count < 10) {
            counterclock.style.color = "red";
            counterclock.style.fontSize = "30px";
            background.classList.toggle("flash");
        }
        if (count <= 0) {
            death();
            count = 10;
        }
        if (count > 10) {
            counterclock.style.color = "#FFF";
            counterclock.style.fontSize = "15px";
            background.classList.remove("flash");
        }
    
        document.getElementById("timer").innerHTML=count + " secs"; 
    }

    function collision(player, item) {
        let playerRect = player.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        return !(playerRect.bottom < itemRect.top || 
                playerRect.top > itemRect.bottom || 
                playerRect.right < itemRect.left || 
                playerRect.left > itemRect.right);
    }
const ch1Btn = document.getElementById("btn1")
const ch2Btn = document.getElementById("btn2")
const ch3Btn = document.getElementById("btn3")
const char = document.getElementById("char")
const bg = document.getElementById("bgs")
const frame = document.getElementById("frame")

const characters = [
    "images/characters/annem-doodle.png",
    "images/characters/asyalı-doodle.png",
    "images/characters/luca-doodle.png",
    "images/characters/reception-doodle.png",
    "images/characters/taksici-doodle.png",
    "images/characters/yuki-doodle.png",
]

const backgrounds = [
    "images/backgrounds/airport1.jpg",
    "images/backgrounds/airport2.jpg",
    "images/backgrounds/bedroom.jpg",
    "images/backgrounds/cafe.jpg",
    "images/backgrounds/CityCentre.jpg",
    "images/backgrounds/Dorm.jpg",
    "images/backgrounds/Pizzeria.png",
    "images/backgrounds/plane.jpg",
    "images/backgrounds/Reception.jpg",
    "images/backgrounds/taxi.jpg",
    "images/backgrounds/RiverNight.jpg",
]

let chIndex = 0
let bgIndex = 0

ch2Btn.disabled = true
ch3Btn.disabled = true

setInterval(() => {

    char.classList.add("fade-out")

    setTimeout(() => {

        chIndex++
        if(chIndex >= characters.length){
            chIndex = 0
        }

        char.src = characters[chIndex]

        char.classList.remove("fade-out")

    },800)

},4000)

setInterval(() => {

    bg.classList.add("fade-out")
    frame.classList.add("fade-out")

    setTimeout(() => {

        bgIndex++
        if(bgIndex >= backgrounds.length){
            bgIndex = 0
        }

        bg.src = backgrounds[bgIndex]

        bg.classList.remove("fade-out")
        frame.classList.remove("fade-out")

    },800)

},6000)

ch1Btn.onclick = () => {
    localStorage.setItem("currentChapter","1")
    window.location.href = "./game/game.html"
}

if(localStorage.getItem("ch2Unlocked") === "true"){
    ch2Btn.disabled = false
    ch2Btn.classList.add("available")
    ch2Btn.onclick = () =>{
        localStorage.setItem("currentChapter","2")
        window.location.href = "./game/game.html"
    }
}

/* CHAPTER 3 Temp
if(localStorage.getItem("ch3Unlocked") === "true"){
    ch3Btn.disabled = false
    ch3Btn.classList.add("available")
    ch3Btn.onclick = () =>{
        localStorage.setItem("currentChapter","3")
        window.location.href = "game/game.html"
    }
}
*/
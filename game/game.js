import {Ch1Story, Ch1StartData} from "./chapter1.js"
import {Ch2Story, Ch2StartData} from "./chapter2.js"
import {typeWriter, speedTypeWriter, stopTypeWriter, restoreHearts, isTypeWriterRunning} from "./utils.js"

async function preloadImages(imageUrls) {
    return Promise.all(
        imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve(url)
                img.onerror = () => reject(new Error(`Failed to load: ${url}`))
                img.src = url
            })
        })
    )
}

const imagesToPreload = [
    // Chapter 1 backgrounds
    "../images/backgrounds/airport1.jpg",
    "../images/backgrounds/airport1-blur.jpg",
    "../images/backgrounds/airport2.jpg",
    "../images/backgrounds/bedroom.jpg",
    "../images/backgrounds/cafe.jpg",
    "../images/backgrounds/plane.jpg",
    "../images/backgrounds/plane-blur.jpg",
    "../images/backgrounds/taxi.jpg",
    "../images/backgrounds/taxi-blur.jpg",
    // Chapter 2 backgrounds
    "../images/backgrounds/Reception.jpg",
    "../images/backgrounds/Reception-Blur.png",
    "../images/backgrounds/Dorm.jpg",
    "../images/backgrounds/Dorm-Blur.png",
    "../images/backgrounds/CityCentre.jpg",
    "../images/backgrounds/CityCentre-Blur.png",
    "../images/backgrounds/Pizzeria.png",
    "../images/backgrounds/Pizzeria-Blur.png",
    "../images/backgrounds/RiverNight.jpg",
    "../images/backgrounds/DormNight.png",
    // Character images
    "../images/characters/barbaros-doodle.png",
    "../images/characters/annem-doodle.png",
    "../images/characters/taksici-doodle.png",
    "../images/characters/asyalı-doodle.png",
    "../images/characters/luca-doodle.png",
    "../images/characters/yuki-doodle.png",
    "../images/characters/reception-doodle.png",
    // UI elements
    "../images/elements/heart.png",
    "../images/elements/skip.png",
    "../images/elements/icon.png"
]

// Preload images when page loads
preloadImages(imagesToPreload).then(() => {
    console.log("All images preloaded!")
}).catch(error => {
    console.warn("Some images failed to load:", error)
})

const body = document.querySelector("body")
const background = document.querySelector("#background")
const startBtn = document.querySelector("#start-btn")
const startTitle = document.querySelector("#start-title")

const black = document.querySelector("#black")
const blackText = document.querySelector("#black-text")

const skipBtn = document.querySelector("#skip-btn")

const minigameHeader = document.querySelector("#header-text")

const endState = document.querySelector("#end-state")
const endYap = document.querySelector("#end-yap")
const replayBtn = document.querySelector("#replay-btn")
const returnBtn = document.querySelector("#return-btn")

let stopAll = false
let storyIndex = -1
let inputLocked = false

const StartDatas = [Ch1StartData,Ch2StartData]
const Stories = [Ch1Story,Ch2Story]
const currentCh = Number(localStorage.getItem("currentChapter")) || 1

const Story = Stories[currentCh-1]
const StartData = StartDatas[currentCh-1]

function onDeath(){
    setTimeout(()=>{
        black.classList.add("active")
        typeWriter(blackText,"You Lost All Your Hearts.","../audios/voices/sans_voice.m4a",50)
        setTimeout(()=>{
            stopTypeWriter()
            storyEnd(false)
            black.classList.remove("active")
        },4000)
    },1000)
}

function storyEnd(won){
    background.className = "end"
    body.style.backgroundImage = `url(${StartData.Image})`
    startTitle.textContent = StartData.Title
    if (won) {
        endState.textContent = "Good Job!"
        endYap.textContent = "The chapter has ended!. You unlocked the next chapter."
        localStorage.setItem(`ch${currentCh + 1}Unlocked`, "true")
    } else {
        endState.textContent = "Better Luck Next Time!"
        endYap.textContent = "You lost all your hearts. Click the replay button to try again"
    }

    replayBtn.textContent = "Replay"
    replayBtn.addEventListener("click",()=>{
        resetToStart()
        continueStory()
    },{ once: true })
    returnBtn.textContent = "Return"
    returnBtn.addEventListener("click",()=>{
        window.location.href = "../index.html"
    },{ once: true })
}

function continueStory(){
    if (stopAll) {return}
    storyIndex++
    if (storyIndex >= Story.length){
        black.classList.add("active")
        typeWriter(blackText,"To be continued...","../audios/voices/sans_voice.m4a",50)
        setTimeout(()=>{
            stopTypeWriter()
            storyEnd(true)
            black.classList.remove("active")
        },4000)
        return
    }
    const pageData = Story[storyIndex]
    if (pageData.type === "dialog"){
        body.style.backgroundImage = `url("${pageData.background}")`
        pageData.character.speak(pageData.text)
    } else if(pageData.type ==="minigame"){
        body.style.backgroundImage = `url("${pageData.background}")`
        minigameHeader.textContent = pageData.header
        pageData.minigame.render()
    } else if(pageData.type ==="transition"){
        black.classList.add("active")
        blackText.textContent = ""
        setTimeout(()=>{
            body.style.backgroundImage = `url("${pageData.newBackground}")`
            typeWriter(blackText,pageData.text,"../audios/voices/sans_voice.m4a",50)
            setTimeout(()=>{
                black.classList.remove("active")
                continueStory()
            },pageData.time)
        },2000)
    }
}

function resetToStart(){
    storyIndex= -1
    body.style.backgroundImage = `url(${StartData.Image})`
    startTitle.textContent = StartData.Title
    background.className = "start",
    restoreHearts()
}

document.addEventListener("death", onDeath)

startBtn.addEventListener("click",continueStory)

skipBtn.addEventListener("click", () => {
    const running = isTypeWriterRunning()
    if(running){
        speedTypeWriter()
        inputLocked = false
        return
    } else{
        stopTypeWriter()
        continueStory()
    }
})

document.addEventListener("keydown", (event) => {
    skipBtn.blur()
    if(inputLocked) return

    if(event.code !== "Space" && event.code !== "Enter") return
    if(black.classList.contains("active")) return
    if(!background.classList.contains("speech")) return

    inputLocked = true
    const running = isTypeWriterRunning()
    if(running){
        speedTypeWriter()
        inputLocked = false
        return
    } else{
        stopTypeWriter()
        continueStory()
    }

    setTimeout(() => {
        inputLocked = false
    }, 100)
})

resetToStart()
import {Ch1Story, Ch1StartData} from "./chapter1.js"
import {typeWriter, speedTypeWriter, stopTypeWriter, restoreHearts, isTypeWriterRunning} from "./utils.js"

const background = document.querySelector("#background")
const startBtn = document.querySelector("#start-btn")
const startTitle = document.querySelector("#start-title")

const black = document.querySelector("#black")
const blackText = document.querySelector("#black-text")

const skipBtn = document.querySelector("#skip-btn")

const minigameHeader = document.querySelector("#header-text")

const heart1 = document.querySelector("#heart1")
const heart2 = document.querySelector("#heart2")
const heart3 = document.querySelector("#heart3")

let stopAll = false
let storyIndex = -1
let inputLocked = false

//TODO: Chapter seçme ekranı
//TODO: Düzgün başlangıç ve bitiş ekranları

const Story = [...Ch1Story]

function onDeath(){
    setTimeout(()=>{
        black.classList.add("active")
        typeWriter(blackText,"You Lost All Your Hearts.","audios/voices/voice_sans.wav",50)
        setTimeout(()=>{
            stopTypeWriter()
            resetToStart()
            black.classList.remove("active")
        },4000)
    },1000)
}

function continueStory(){
    if (stopAll) {return}
    storyIndex++
    if (storyIndex >= Story.length){
        resetToStart()
        return
    }
    const pageData = Story[storyIndex]
    if (pageData.type === "dialog"){
        background.style.backgroundImage = `url("${pageData.background}")`
        pageData.character.speak(pageData.text)
    } else if(pageData.type ==="minigame"){
        background.style.backgroundImage = `url("${pageData.background}")`
        minigameHeader.textContent = pageData.header
        pageData.minigame.render()
    } else if(pageData.type ==="transition"){
        black.classList.add("active")
        blackText.textContent = ""
        setTimeout(()=>{
            background.style.backgroundImage = `url("${pageData.newBackground}")`
            typeWriter(blackText,pageData.text,"audios/voices/voice_sans.wav",50)
            setTimeout(()=>{
                black.classList.remove("active")
                continueStory()
            },pageData.time)
        },2000)
    }
}

function resetToStart(){
    storyIndex= -1
    //Şu anda otomatik chapter 1
    background.style.backgroundImage = `url(${Ch1StartData.Image})`
    startTitle.textContent = Ch1StartData.Title
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
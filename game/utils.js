let currentInterval = null
let hearts = 3
let lastText = {}
const heart1 = document.querySelector("#heart1")
const heart2 = document.querySelector("#heart2")
const heart3 = document.querySelector("#heart3")

export function loseHeart(){
    hearts--
    if (hearts===2){
        heart3.classList.add("lost")
    } else if (hearts===1){
        heart2.classList.add("lost")
    } else if(hearts===0){
        heart1.classList.add("lost")
        document.dispatchEvent(new CustomEvent("death"))
    }
}

export function restoreHearts(){
    hearts = 3
    heart1.classList.remove("lost")
    heart2.classList.remove("lost")
    heart3.classList.remove("lost")
}

export function typeWriter(element, text, sound, speed) {
    let i = 0
    element.textContent = ""
    lastText.element = element
    lastText.text = text
    
    const textSound = new Audio(sound)
    textSound.volume = 0.5
    
    currentInterval = setInterval(() => {
        if (i%3 === 0){
            textSound.currentTime = 0
            textSound.play()
        }
        element.textContent = text.slice(0, ++i)
        
        if (i >= text.length) {
            clearInterval(currentInterval)
            currentInterval = null
            lastText = {}
        }
    }, speed)
}

export function isTypeWriterRunning(){
    return (currentInterval)
}

export function speedTypeWriter(){
    if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
    }
    if (!lastText.element) return
    lastText.element.textContent = lastText.text
    lastText = {}
}

export function stopTypeWriter() {
    if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
        lastText = {}
    }
}


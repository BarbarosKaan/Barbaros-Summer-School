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

let audioContext = null
let soundBuffer = null
let loadedSound = null

async function loadSound(sound) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }

    if (loadedSound !== sound) {
        const response = await fetch(sound)
        const arrayBuffer = await response.arrayBuffer()
        soundBuffer = await audioContext.decodeAudioData(arrayBuffer)
        loadedSound = sound
    }
}

function playSound() {
    if (!soundBuffer) return
    const source = audioContext.createBufferSource()
    source.buffer = soundBuffer
    source.connect(audioContext.destination)
    source.start(0)
}

export function typeWriter(element, text, sound, speed) {
    let i = 0
    element.textContent = ""
    lastText.element = element
    lastText.text = text

    // Sesi yükle, bitince yazmaya başla
    loadSound(sound).then(() => {
        currentInterval = setInterval(() => {
            if (i % 3 === 0) {
                playSound()
            }
            element.textContent = text.slice(0, ++i)

            if (i >= text.length) {
                clearInterval(currentInterval)
                currentInterval = null
                lastText = {}
            }
        }, speed)
    })
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


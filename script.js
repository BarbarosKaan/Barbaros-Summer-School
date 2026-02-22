const background = document.querySelector("#background")
const startBtn = document.querySelector("#start-btn")

const black = document.querySelector("#black")
const blackText = document.querySelector("#black-text")

const personImg = document.querySelector("#person-img")
const personName = document.querySelector("#person-name")
const speakText = document.querySelector("#text")
const skipBtn = document.querySelector("#skip-btn")

const quizCont = document.querySelector("#quiz-cont")
const quizQuestion = document.querySelector("#quiz-question")

const heart1 = document.querySelector("#heart1")
const heart2 = document.querySelector("#heart2")
const heart3 = document.querySelector("#heart3")

let stopAll = false
let hearts = 3
let currentInterval = null;
let storyIndex = -1

class Character{
    constructor(name,image,sound){
        this.name = name
        this.image = image
        this.sound = sound
    }

    speak(text){
        background.className = ""
        background.classList.add("speech")
        personImg.src = this.image
        personName.textContent = this.name

        if (this.name === "Barbaros"){
            background.classList.add("main")
        }
        typeWriter(speakText,text,this.sound,50)
    }
}

//TODO: *Diğer minigame'leri de ekle

class Quiz {
    constructor(question, answers, correctIndex, correctFunc, incorrectFunc) {
        this.question = question
        this.answers = answers
        this.correctIndex = correctIndex
        this.onCorrect = correctFunc
        this.onIncorrect = incorrectFunc
    }

    render(){
        background.className = ""
        background.classList.add("minigame","quiz")
        quizQuestion.textContent = this.question
        this.clickable = true

        const buttons = []

        this.answers.forEach((answer, index) => {
            const btn = document.getElementById("quiz-answer" + (index+1))
            if (!btn) return

            buttons.push(btn)

            btn.classList.remove("correct","incorrect")
            btn.textContent = answer

            btn.onclick = () => {
                if (!this.clickable) return
                this.clickable = false
                const isCorrect = index === this.correctIndex

                if (isCorrect) {
                    btn.classList.add("correct")
                } else {
                    loseHeart()
                    btn.classList.add("incorrect")
                    buttons[this.correctIndex].classList.add("correct")
                }

                setTimeout(() => {
                    buttons.forEach(b => {
                        b.classList.remove("correct","incorrect")
                        b.onclick = null
                    })
                    if (stopAll){return}
                    if (isCorrect){
                        this.onCorrect()
                    } else {
                        this.onIncorrect()
                    }
                }, 1000)
            }
        })
    }
}

const Characters = {
    "Barbaros": new Character("Barbaros","images/barbaros-temp.png","audios/voice_sans.wav"),
}

const Images = {
    "Airport": "/images/airport.jpg",
    "Cafe": "/images/cafe.jpg",
}

const Minigames = {
    //TODO: **Doğru yada yanlış cevapla birden fazla yazı yazabilmeyi ekle
    "Quiz1": new Quiz("What does a cow drink",
        ["Milk","Water","Lemonade","Juice"],
        1,
        ()=>{
            Characters["Barbaros"].speak("Good Job!")
        },
        ()=>{
            Characters["Barbaros"].speak("Oopsie doopsie!")
        },
    )
}

const Story = [
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport"],
        text:"Hello World"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport"],
        text:"How are you"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport"],
        text:"Fine thanks and you"
    },
    {
        type:"transition",
        newBackground: Images["Cafe"],
        text:"Barbaros goes to a cafe",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Cafe"],
        text:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet ratione, libero voluptas quaerat laudantium cupiditate rem inventore unde molestiae quasi ad est facilis non laborum doloribus modi tempora commodi sapiente?"
    },
    {
        type:"minigame",
        background: Images["Cafe"],
        minigame:Minigames["Quiz1"]
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Cafe"],
        text:"Pomney!"
    },
    {
        type:"minigame",
        background: Images["Cafe"],
        minigame:Minigames["Quiz1"]
    },
    {
        type:"minigame",
        background: Images["Cafe"],
        minigame:Minigames["Quiz1"]
    },
]

function typeWriter(element, text, sound , speed) {
        let i = 0
        element.textContent = ""

        currentInterval = setInterval(() => {
            const textSound = new Audio(sound)
            textSound.play()
            element.textContent += text[i]
            i++

            if (i >= text.length) {
                clearInterval(currentInterval)
                currentInterval = null
            }
        }, speed)
}

function loseHeart(){
    hearts--
    if (hearts===2){
        heart3.classList.add("lost")
    } else if (hearts===1){
        heart2.classList.add("lost")
    } else if(hearts===0){
        heart1.classList.add("lost")
        stopAll = true
        setTimeout(()=>{
            black.classList.add("active")
            typeWriter(blackText,"You Lost All Your Hearts.","audios/voice_sans.wav",50)
            setTimeout(()=>{
                if (currentInterval){
                    clearInterval(currentInterval)
                    currentInterval=null
                }
                storyIndex= -1
                background.className=""
                background.classList.add("start")
                black.classList.remove("active")
                stopAll = false
            },4000)
        },1000)
    }
}

function continueStory(){
    if (stopAll) {return}
    storyIndex++
    if (storyIndex >= Story.length){return}
    const pageData = Story[storyIndex]
    if (pageData.type === "dialog"){
        background.style.backgroundImage = `url("${pageData.background}")`
        pageData.character.speak(pageData.text)
    } else if(pageData.type ==="minigame"){
        background.style.backgroundImage = `url("${pageData.background}")`
        pageData.minigame.render()
    } else if(pageData.type ==="transition"){
        black.classList.add("active")
        blackText.textContent = ""
        setTimeout(()=>{
            background.style.backgroundImage = `url("${pageData.newBackground}")`
            typeWriter(blackText,pageData.text,"audios/voice_sans.wav",50)
            setTimeout(()=>{
                black.classList.remove("active")
                continueStory()
            },pageData.time)
        },2000)
    }
}

startBtn.addEventListener("click",continueStory)

skipBtn.addEventListener("click", () => {
    if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
    }
    continueStory()
})
const background = document.querySelector("#background")
const startBtn = document.querySelector("#start-btn")

const black = document.querySelector("#black")
const blackText = document.querySelector("#black-text")

const personImg = document.querySelector("#person-img")
const personName = document.querySelector("#person-name")
const speakText = document.querySelector("#text")
const skipBtn = document.querySelector("#skip-btn")

const minigameHeader = document.querySelector("#header-text")

const quizQuestion = document.querySelector("#quiz-question")

const listeningAudio = document.querySelector("#listening-audio")
const listeningQuestion = document.querySelector("#listening-question")

const grammarText1 = document.querySelector("#grammar-text1")
const grammarText2 = document.querySelector("#grammar-text2")
const grammarInput = document.querySelector("#grammar-input")
const grammarSubmit = document.querySelector("#grammar-submit")

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

class Listening {
    constructor(sound, question, answers, correctIndex, correctFunc, incorrectFunc) {
        this.sound = sound
        this.question = question
        this.answers = answers
        this.correctIndex = correctIndex
        this.onCorrect = correctFunc
        this.onIncorrect = incorrectFunc
    }

    render(){
        background.className = ""
        background.classList.add("minigame","listening")
        listeningQuestion.textContent = this.question
        listeningAudio.src = this.sound
        listeningAudio.load()
        listeningAudio.play()
        this.clickable = true

        const buttons = []

        this.answers.forEach((answer, index) => {
            const btn = document.getElementById("listening-answer" + (index+1))
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
                
                listeningAudio.pause()
                setTimeout(() => {
                    listeningAudio.pause()
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

class Grammar {
    constructor(text1,text2,answer,onCorrect,onIncorrect){
        this.text1 = text1
        this.text2 = text2
        this.answer = answer.toLowerCase()
        this.clickable = true
        this.onCorrect = onCorrect
        this.onIncorrect = onIncorrect
    }

    render(){
        background.className = ""
        background.classList.add("minigame","grammar")
        grammarText1.textContent = this.text1
        grammarText2.textContent = this.text2
        grammarInput.readOnly = false
        
        grammarSubmit.onclick = ()=>{
            if (!this.clickable) return
            this.clickable = false
            grammarInput.readOnly = true
            const isCorrect = grammarInput.value.toLowerCase() === this.answer

            if (isCorrect) {
                grammarInput.classList.add("correct")
            } else {
                loseHeart()
                grammarInput.classList.add("incorrect")
                grammarInput.value = this.answer
            }

            setTimeout(()=>{
                grammarInput.className = ""
                grammarInput.value = ""
                grammarInput.readOnly = false
                if (stopAll){return}
                if (isCorrect){
                    this.onCorrect()
                } else {
                    this.onIncorrect()
                }
            },1000)
        }
    }
}

const Characters = {
    "Barbaros": new Character("Barbaros","images/barbaros-temp.png","audios/voice_sans.wav"),
}

const Images = {
    "Airport": "/images/airport.jpg",
    "Cafe": "/images/cafe.jpg",
}

const Audios = {
    "Monitoring": "audios/Monitoring.mp3"
}

const Minigames = {
    "Quiz1": new Quiz(
        "What does a cow drink",
        ["Milk","Water","Lemonade","Juice"],
        1,
        ()=>{
            Characters["Barbaros"].speak("Good Job!")
        },
        ()=>{
            Characters["Barbaros"].speak("Oopsie doopsie!")
        },
    ),
    "Listening1": new Listening(
        Audios["Monitoring"],
        "Who is the singer of this banger",
        ["Kasane Teto","Barbaros Kaan Lale","Kagamine Len","Hatsune Miku"],
        3,
        ()=>{
            Characters["Barbaros"].speak("Good Job!")
        },
        ()=>{
            Characters["Barbaros"].speak("Oopsie doopsie!")
        },
    ),
    "Grammar1": new Grammar(
        "My ",
        " is Barbaros",
        "name",
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
        type:"transition",
        newBackground: Images["Cafe"],
        text:"Barbaros goes to a cafe",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Cafe"],
        text:"Lorem, ipsum dolor sit amet sapiente?"
    },
    {
        type:"minigame",
        header:"Listen and pick the correct answer",
        background: Images["Cafe"],
        minigame:Minigames["Listening1"]
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Cafe"],
        text:"Pomney!"
    },
    {
        type:"minigame",
        header:"Complete the sentence",
        background: Images["Cafe"],
        minigame:Minigames["Grammar1"]
    },
    {
        type:"minigame",
        header:"Pick the correct answer",
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
                background.className="start"
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
        minigameHeader.textContent = pageData.header
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

function onStart(){
    background.className = "start"
}

startBtn.addEventListener("click",continueStory)

skipBtn.addEventListener("click", () => {
    if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
    }
    continueStory()
})

onStart()
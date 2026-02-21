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

        console.log(this.name)
        if (this.name === "Barbaros"){
            background.classList.add("main")
        }
        typeWriter(speakText,text,this.sound,50)
    }
}

class Quiz {
    constructor(question, answers, correctIndex) {
        this.question = question
        this.answers = answers
        this.correctIndex = correctIndex
    }

    checkAnswer(index) {
        return index === this.correctIndex
    }

    render(){
        background.className = ""
        background.classList.add("minigame","quiz")
        quizQuestion.textContent = this.question

        this.answers.forEach((answer, index) => {
            const btn = document.getElementById("quiz-answer" + (index+1))
            btn.textContent = answer

            btn.onclick = () => {
                const correct = this.checkAnswer(index)

                if (correct) {
                    console.log("Doğru")
                    continueStory()
                } else {
                    console.log("Yanlış")
                    continueStory()
                }
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
    "Quiz1": new Quiz("What does a cow drink",["Milk","Water","Lemonade","Juice"],1)
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
        text:"Barbaros goes to a cafe"
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
        text:"Good Job!"
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

function continueStory(){
    storyIndex++
    if (storyIndex >= Story.length){return}
    const currentPage = Story[storyIndex]
    if (currentPage.type === "dialog"){
        background.style.backgroundImage = `url("${currentPage.background}")`
        currentPage.character.speak(currentPage.text)
    } else if(currentPage.type ==="minigame"){
        background.style.backgroundImage = `url("${currentPage.background}")`
        currentPage.minigame.render()
    } else if(currentPage.type ==="transition"){
        black.classList.add("active")
        blackText.textContent = ""
        setTimeout(()=>{
            background.style.backgroundImage = `url("${currentPage.newBackground}")`
            typeWriter(blackText,currentPage.text,"audios/voice_sans.wav",50)
            setTimeout(()=>{
                black.classList.remove("active")
                continueStory()
            },5000)
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
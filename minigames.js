import {loseHeart} from "./utils.js"

const background = document.querySelector("#background")

const quizQuestion = document.querySelector("#quiz-question")

const listeningAudio = document.querySelector("#listening-audio")
const listeningQuestion = document.querySelector("#listening-question")

const grammarText1 = document.querySelector("#grammar-text1")
const grammarText2 = document.querySelector("#grammar-text2")
const grammarInput = document.querySelector("#grammar-input")
const grammarSubmit = document.querySelector("#grammar-submit")

const sentenceWords = document.querySelector("#sent-words")
const sentenceAnswer = document.querySelector("#sent-answer")
const sentenceSubmit = document.querySelector("#sent-submit")

let stopAll = false

document.addEventListener("death",()=>{
    stopAll = true
    setTimeout(()=>{
        stopAll = false
    },5000)
})

export class Quiz {
    constructor(question, answers, correctIndex, correctFunc, incorrectFunc) {
        this.question = question
        this.answers = answers
        this.correctIndex = correctIndex
        this.onCorrect = correctFunc
        this.onIncorrect = incorrectFunc
    }

    render(){
        background.className = "minigame quiz"
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

export class Listening {
    constructor(sound, question, answers, correctIndex, correctFunc, incorrectFunc) {
        this.sound = sound
        this.question = question
        this.answers = answers
        this.correctIndex = correctIndex
        this.onCorrect = correctFunc
        this.onIncorrect = incorrectFunc
    }

    render(){
        background.className = "minigame listening"
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

export class Grammar {
    constructor(text1,text2,answer,onCorrect,onIncorrect){
        this.text1 = text1
        this.text2 = text2
        this.answer = answer.toLowerCase()
        this.clickable = true
        this.onCorrect = onCorrect
        this.onIncorrect = onIncorrect
    }

    render(){
        background.className = "minigame grammar"
        grammarText1.textContent = this.text1
        grammarText2.textContent = this.text2
        grammarInput.readOnly = false
        this.clickable = true
        
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

export class Sentence {
    constructor(words,onCorrect,onIncorrect){
        this.words = [...words]
        this.correct = [...words]
        this.onCorrect = onCorrect
        this.onIncorrect = onIncorrect
        this.clickable = true
        this.playerAnswer=[]
    }

    render(){
        this.playerAnswer = []
        this.clickable = true
        background.className = "minigame sentence"
        sentenceWords.innerHTML = ""
        sentenceAnswer.innerHTML = ""
        sentenceAnswer.className = ""

        for (let i = this.words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [this.words[i], this.words[j]] = 
            [this.words[j], this.words[i]];
        }

        this.words.forEach((word,index) =>{
            const newWord = document.createElement("span")
            newWord.textContent = word
            const answerWord = document.createElement("span")
            answerWord.textContent = word

            newWord.onclick = ()=>{
                if (!this.clickable) return
                if (newWord.classList.contains("picked")){
                    newWord.classList.remove("picked")
                    const index = this.playerAnswer.indexOf(word)
                    if (index !== -1) {
                        this.playerAnswer.splice(index, 1)
                    }
                    sentenceAnswer.removeChild(answerWord)
                } else {
                    newWord.classList.add("picked")
                    this.playerAnswer.push(word)
                    sentenceAnswer.appendChild(answerWord)
                }
            }

            answerWord.onclick = ()=>{
                if (!this.clickable) return
                newWord.classList.remove("picked")
                sentenceAnswer.removeChild(answerWord)
                const index = this.playerAnswer.indexOf(word)
                if (index !== -1) {
                    this.playerAnswer.splice(index, 1)
                }
            }
            
            sentenceWords.appendChild(newWord)
        })

        sentenceSubmit.onclick = ()=>{
            if (!this.clickable) return
            this.clickable = false
            let isCorrect = true
            for (let i = 0; i < this.correct.length; i++){
                if (this.playerAnswer[i] !== this.correct[i]){
                    isCorrect = false
                    break
                }
            }
            if (isCorrect) {
                sentenceAnswer.classList.add("correct")
            } else {
                loseHeart()
                sentenceAnswer.classList.add("incorrect")
            }
            setTimeout(()=>{
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
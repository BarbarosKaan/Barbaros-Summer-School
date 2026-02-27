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

const sentenceWords = document.querySelector("#sent-words")
const sentenceAnswer = document.querySelector("#sent-answer")
const sentenceSubmit = document.querySelector("#sent-submit")

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

class Quiz {
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

class Sentence {
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

const Characters = {
    "Barbaros": new Character("Barbaros",
        "images/characters/barbaros-doodle.png",
        "audios/voices/barbaros_voice.m4a"
    ),
    "Anne" : new Character("Anne",
        "images/characters/annem-doodle.png",
        "audios/voices/anne_voice.m4a"
    ),
    "Taksici" : new Character("Taxi Driver",
        "images/characters/taksici-doodle.png",
        "audios/voices/taksici_voice.m4a"
    ),
    "AsyalıNpc" : new Character("???",
        "images/characters/asyalı-doodle.png",
        "audios/voices/asyali_voice.m4a"
    )
}

const Images = {
    "Airport1": "images/backgrounds/airport1.jpg",
    "Airport1-Blur": "images/backgrounds/airport1-blur.jpg",
    "Airport2": "images/backgrounds/airport2.jpg",
    "Bedroom": "images/backgrounds/bedroom.jpg",
    "Cafe": "images/backgrounds/cafe.jpg",
    "Plane": "images/backgrounds/plane.jpg",
    "Plane-Blur": "images/backgrounds/plane.jpg",
    "Taxi": "images/backgrounds/taxi.jpg",
    "Taxi-Blur": "images/backgrounds/taxi-blur.jpg"
}

const Audios = {
    "Plane-Announcement": "audios/listenings/plane_announcement.mp3"
}

/*
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
    ),
    "Sentence1": new Sentence(
        ["Hello","My","Dear","Friends"],
        ()=>{
            Characters["Barbaros"].speak("Good Job!")
        },
        ()=>{
            Characters["Barbaros"].speak("Oopsie doopsie!")
        },
*/

const Minigames = {
    "Plane-Announcement": new Listening(
        Audios["Plane-Announcement"],
        "Which gate should Barbaros go?",
        ["Gate 1", "Gate 3", "Gate 5", "Gate 7"],
        2,
        ()=>{
            background.style.backgroundImage = `url("${Images["Airport1"]}")`
            Characters["Barbaros"].speak("Gate 5. Tamam, anladım. Sanırım sandığımdan daha hazırım.")
        },
        ()=>{
            background.style.backgroundImage = `url("${Images["Airport1"]}")`
            Characters["Barbaros"].speak("Sanırım yakındaki birine sormam gerekecek...")
        }
    ),
    "Plane1": new Grammar(
        "I hope this experience ",
        " help me become more independent.",
        "will",
        ()=>{
            background.style.backgroundImage = `url("${Images["Plane"]}")`
            Characters["AsyalıNpc"].speak("That’s a mature way to think.")
        },
        ()=>{
            background.style.backgroundImage = `url("${Images["Plane"]}")`
            Characters["AsyalıNpc"].speak("You should say ‘will help.’")
        },
    ),
    "Plane2": new Sentence(
        ["I", "will", "not", "waste", "this", "opportunity"],
        ()=>{
            background.style.backgroundImage = `url("${Images["Plane"]}")`
            Characters["AsyalıNpc"].speak("I believe you won’t.")
        },
        ()=>{
            background.style.backgroundImage = `url("${Images["Plane"]}")`
            Characters["AsyalıNpc"].speak("It should be ‘I will not waste this opportunity.’")
        }
    ),
    "Taxi1": new Sentence(
        ["I", "am", "going", "to", "the", "school", "dormitory"],
        ()=>{
            background.style.backgroundImage = `url("${Images["Taxi"]}")`
            Characters["Taksici"].speak("Your English is very clear. Don’t worry, I know exactly where that is.")
        },
        ()=>{
            background.style.backgroundImage = `url("${Images["Taxi"]}")`
            Characters["Taksici"].speak("Sorry? Oh, I understand now. You should say ‘I am going to the school dormitory.’ No problem, let’s go!")
        }
    ),
    "Taxi2": new Quiz(
        "Which building is the symbol of Rome?",
        ["Eiffel Tower","Colosseum","Statue Of Liberty","Big Ben"],
        1,
        ()=>{
            background.style.backgroundImage = `url("${Images["Taxi"]}")`
            Characters["Taksici"].speak("Exactly! It’s very close to your dormitory. You should visit it tomorrow.")
        },
        ()=>{
            background.style.backgroundImage = `url("${Images["Taxi"]}")`
            Characters["Taksici"].speak("Haha, no! That’s in another country. It’s the Colosseum! You will see it soon.")
        }
    )
}
/*
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
        type:"minigame",
        header:"Put the words in the correct order",
        background: Images["Cafe"],
        minigame:Minigames["Sentence1"]
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
*/

const Chapter1 = [
    {
        type:"dialog",
        character:Characters["Anne"],
        background: Images["Bedroom"],
        text:"Barbaros, valizini tamamen hazırladın mı? Pasaportunu ve yaz okulu belgelerini koyduğundan emin misin?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Bedroom"],
        text:"Evet anne, birkaç kez kontrol ettim. Roma’daki yaz okulu için her şey hazır."
    },
    {
        type:"dialog",
        character:Characters["Anne"],
        background: Images["Bedroom"],
        text:"Bu yaz okulu senin için gerçekten büyük bir fırsat. Roma’da geçireceğin bu süre sana çok şey katacak."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Bedroom"],
        text:"Biliyorum anne, yaz okuluna gitmek istiyordum ama yine de evden ilk kez bu kadar uzak kalacağım."
    },
    {
        type:"dialog",
        character:Characters["Anne"],
        background: Images["Bedroom"],
        text:"İngilizcen gelişecek ve kendi başına ayakta durmayı öğreneceksin."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Bedroom"],
        text:"Elimden geleni yapacağım. Bu yaz okulunu en iyi şekilde değerlendirmek istiyorum."
    },
    {
        type:"dialog",
        character:Characters["Anne"],
        background: Images["Bedroom"],
        text:"Hadi hazırlan, seni birazdan havalimanına ben bırakacağım."
    },
    {
        type:"transition",
        newBackground: Images["Airport1"],
        text:"To the airport",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport1"],
        text:"İşte başlıyoruz... Annem de gittiğine göre artık ipler tamamen benim elimde. Biraz gerginim ama dürüst olmam gerekirse bu durum acayip heyecan verici."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport1"],
        text:"Hata yapsam da kimse beni tanımıyor sonuçta, o yüzden kasmaya gerek yok. Sadece akışına bırakacağım."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport1"],
        text:"Bir saniye... Bir anons yapılıyor sanırım. Dikkat kesilsem iyi olacak."
    },
    {
        type:"minigame",
        header:"Listen and pick the correct answer",
        background: Images["Airport1-Blur"],
        minigame:Minigames["Plane-Announcement"]
    },
    {
        type:"transition",
        newBackground: Images["Plane"],
        text:"On the flight",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Plane"],
        text:"Gerçekten ilk defa tek başıma bir uçakta olduğuma inanamıyorum. Çok heyecanlı!"
    },
    {
        type:"dialog",
        character:Characters["AsyalıNpc"],
        background: Images["Plane"],
        text:"Hi, I couldn’t help noticing you look a bit nervous. Is this your first time flying alone?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Plane"],
        text:"Oh Yes, it is. I’m going to Rome for summer school, and I guess I’m still getting used to everything."
    },
    {
        type:"dialog",
        character:Characters["AsyalıNpc"],
        background: Images["Plane"],
        text:"That’s brave. Spending your summer in another country at your age takes courage. What do you hope to gain from it?"
    },
    {
        type:"minigame",
        header:"Type the missing word and complete the sentence",
        background: Images["Plane-Blur"],
        minigame:Minigames["Plane1"]
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Plane"],
        text:"I’ve always studied English in class, but this time I’ll have to use it in real life."
    },
    {
        type:"dialog",
        character:Characters["AsyalıNpc"],
        background: Images["Plane"],
        text:"That’s when you truly start learning. Real conversations make all the difference."
    },
    {
        type:"minigame",
        header:"Organize the words and form a sentence",
        background: Images["Plane-Blur"],
        minigame:Minigames["Plane2"]
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Plane"],
        text:"Maybe I was nervous before, but now I feel more ready."
    },
    {
        type:"transition",
        newBackground: Images["Airport2"],
        text:"Arrival at Rome",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport2"],
        text:"Uçaktan indim... Tabelalar, insanlar, sesler... Her şey çok farklı. Demek gerçekten Roma’dayım."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport2"],
        text:"Şu an her yer çok kalabalık ve herkes İtalyanca konuşuyor gibi hissediyorum. Panik yok, sadece tabelaları takip etmeliyim."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport2"],
        text:"Annem haklıydı, bu büyük bir fırsat. Kendi başıma halletmem gereken ilk şey buradan sağ salim yurda ulaşmak."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Airport2"],
        text:"Tamam, şimdi dışarı çıkıp bir taksi bulma vakti. İngilizce konuşmaya hazırım. Let’s do this!"
    },
    {
        type:"transition",
        newBackground: Images["Taxi"],
        text:"In a taxi",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Taksici"],
        background: Images["Taxi"],
        text:"Welcome to Rome. The city is beautiful at this time of year. Where are you heading?"
    },
    {
        type:"minigame",
        header:"Organize the words and form a sentence",
        background: Images["Taxi-Blur"],
        minigame:Minigames["Taxi1"]
    },
    {
        type:"dialog",
        character:Characters["Taksici"],
        background: Images["Taxi"],
        text:"So, you are a student? Are you here for the summer school at the university?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Taxi"],
        text:"Yes, I am here to study English and explore the history of Rome."
    },
    {
        type:"dialog",
        character:Characters["Taksici"],
        background: Images["Taxi"],
        text:"That is great! Rome is like a big museum. Do you know which famous building is the symbol of our city?"
    },
    {
        type:"minigame",
        header:"Pick the correct answer",
        background: Images["Taxi-Blur"],
        minigame:Minigames["Taxi2"]
    },
    {
        type:"dialog",
        character:Characters["Taksici"],
        background: Images["Taxi"],
        text:"You look a bit tired from the flight. Do you want to stop for a quick water or snack?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Taxi"],
        text:"No, thank you. I just want to go to the dormitory and rest."
    },
    {
        type:"dialog",
        character:Characters["Taksici"],
        background: Images["Taxi"],
        text:"Alright! We are almost there. Welcome to your new home for the summer."
    },
]

//TODO: Her chapter için ayrı modül ayrı script
//TODO: Chapter seçme ekranı
//TODO: Düzgün başlangıç ve bitiş ekranları

const Story = [...Chapter1]

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
                background.style.backgroundImage = `url("${Images["Bedroom"]}")`
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
    background.style.backgroundImage = `url("${Images["Bedroom"]}")`
    background.className = "start",
    hearts = 3
    heart1.className="heart"
    heart2.className="heart"
    heart3.className="heart"
}

startBtn.addEventListener("click",continueStory)

skipBtn.addEventListener("click", () => {
    if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
    }
    continueStory()
})

let inputLocked = false
document.addEventListener("keydown",(event)=>{
    if(inputLocked) return
    if(black.classList.contains("active")) return
    if(!background.classList.contains("speech")) return
    if(event.code !== "Space" && event.code !== "Enter") return
    inputLocked = true
    if (currentInterval) {
        clearInterval(currentInterval)
        currentInterval = null
    }
    continueStory()
    setTimeout(()=>{
        inputLocked = false
    }, 500)
})

resetToStart()
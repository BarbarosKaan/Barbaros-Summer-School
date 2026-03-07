import Character from "./character.js"
import {Quiz, Listening, Grammar, Sentence} from "./minigames.js"

const Characters = {
    "Barbaros": new Character("Barbaros",
        "../images/characters/barbaros-doodle.png",
        "../audios/voices/barbaros_voice.m4a"
    ),
    "Anne" : new Character("Anne",
        "../images/characters/annem-doodle.png",
        "../audios/voices/anne_voice.m4a"
    ),
    "Taksici" : new Character("Taxi Driver",
        "../images/characters/taksici-doodle.png",
        "../audios/voices/taksici_voice.m4a"
    ),
    "AsyalıNpc" : new Character("???",
        "../images/characters/asyalı-doodle.png",
        "../audios/voices/asyali_voice.m4a"
    )
}

const Images = {
    "Airport1": "../images/backgrounds/airport1.jpg",
    "Airport1-Blur": "../images/backgrounds/airport1-blur.jpg",
    "Airport2": "../images/backgrounds/airport2.jpg",
    "Bedroom": "../images/backgrounds/bedroom.jpg",
    "Cafe": "../images/backgrounds/cafe.jpg",
    "Plane": "../images/backgrounds/plane.jpg",
    "Plane-Blur": "../images/backgrounds/plane.jpg",
    "Taxi": "../images/backgrounds/taxi.jpg",
    "Taxi-Blur": "../images/backgrounds/taxi-blur.jpg"
}

const Audios = {
    "Plane-Announcement": "../audios/listenings/plane_announcement.mp3"
}

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

export const Ch1Story = [
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
        text:"Moralini bozma sakın. İngilizcen gelişecek ve kendi başına ayakta durmayı öğreneceksin."
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
        text:"İşte başlıyoruz... Biraz gerginim ama dürüst olmam gerekirse bu durum acayip heyecan verici."
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
        header:"Complete the sentence",
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
        text:"Tamam, şimdi dışarı çıkıp bir taksi bulma vakti. İngilizce konuşmaya hazırım."
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

const startImg = "../images/backgrounds/chapter1Cover.jpg"
const startTitle = "The Departure"

export const Ch1StartData = {
    "Image": startImg,
    "Title": startTitle
}
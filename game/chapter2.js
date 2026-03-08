import Character from "./character.js"
import {Quiz, Listening, Grammar, Sentence} from "./minigames.js"
const body = document.querySelector("body")

const Characters = {
    "Barbaros": new Character("Barbaros",
        "../images/characters/barbaros-doodle.png",
        "../audios/voices/barbaros_voice.m4a"
    ),
    "Luca" : new Character("Luca",
        "../images/characters/luca-doodle.png",
        "../audios/voices/luca_voice.m4a"
    ),
    "Yuki" : new Character("Yuki",
        "../images/characters/yuki-doodle.png",
        "../audios/voices/yuki_voice.m4a"
    ),
    "Reception" : new Character("Receptionist",
        "../images/characters/reception-doodle.png",
        "../audios/voices/reception_voice.m4a"
    )
}

const Images = {
    "Reception": "../images/backgrounds/Reception.jpg",
    "Reception-Blur": "../images/backgrounds/Reception-Blur.png",
    "Dorm": "../images/backgrounds/Dorm.jpg",
    "Dorm-Blur": "../images/backgrounds/Dorm-Blur.png",
    "CityCentre": "../images/backgrounds/CityCentre.jpg",
    "CityCentre-Blur": "../images/backgrounds/CityCentre-Blur.png",
    "Pizzeria": "../images/backgrounds/Pizzeria.png",
    "Pizzeria-Blur": "../images/backgrounds/Pizzeria-Blur.png",
    "River": "../images/backgrounds/RiverNight.jpg",
    "DormNight": "../images/backgrounds/DormNight.png",
}

const Audios = {
    "Pizzeria": "../audios/listenings/pizzeria.mp3",
    "Reception": "../audios/listenings/reception.mp3"
}

const Minigames = {
    "Reception": new Listening(
        Audios["Reception"],
        "What is Barbaros' room number?",
        ["203", "320", "302", "312"],
        2,
        ()=>{
            body.style.backgroundImage = `url("${Images["Reception"]}")`
            Characters["Barbaros"].speak("Room 302, on the third floor. Got it! Thank you for your help.")
        },
        ()=>{
            body.style.backgroundImage = `url("${Images["Reception"]}")`
            Characters["Barbaros"].speak("Wait, what did you say? Oh, I see it on the key now, it's 302. Thank you!")
        }
    ),
    "Dorm": new Sentence(
        ["how", "far", "is", "the", "city", "centre"],
        ()=>{
            body.style.backgroundImage = `url("${Images["Dorm"]}")`
            Characters["Luca"].speak("It’s only a ten-minute walk. Let's go!")
        },
        ()=>{
            body.style.backgroundImage = `url("${Images["Dorm"]}")`
            Characters["Luca"].speak("You mean 'How far is the city center?' It's very close!")
        }
    ),
    "CityCentre": new Quiz(
        "Which is one of Yuki's hobbies",
        ["Drawing Manga","Singing","Playing Volleyball","Watching Series"],
        0,
        ()=>{
            body.style.backgroundImage = `url("${Images["CityCentre"]}")`
            Characters["Barbaros"].speak("Did you say you draw manga? I love reading mangas!")
        },
        ()=>{
            body.style.backgroundImage = `url("${Images["CityCentre"]}")`
            Characters["Barbaros"].speak("I must pay more attention.")
        }
    ),
    "Pizza": new Listening(
        Audios["Pizzeria"],
        "What did Luca ask the waiter for?",
        ["A new T-shirt and a menu", "Napkins and a glass of water", "More pizza and a fork", "A bill and a dessert"],
        1,
        ()=>{
            body.style.backgroundImage = `url("${Images["Pizzeria"]}")`
            Characters["Barbaros"].speak("Luca! lend me the napkins. Let me clean it up for you Yuki.")
        },
        ()=>{
            body.style.backgroundImage = `url("${Images["Pizzeria"]}")`
            Characters["Luca"].speak("Yuki! I got the napkins, Let me clean it up for you.")
        }
    ),
}

export const Ch2Story = [
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Reception"],
        text:"This building is even more impressive from the inside."
    },
    {
        type:"dialog",
        character:Characters["Reception"],
        background: Images["Reception"],
        text:"Welcome to the student residence! Checking in?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Reception"],
        text:"Yes, I am here for the summer language program. My name is Barbaros."
    },
    {
        type:"dialog",
        character:Characters["Reception"],
        background: Images["Reception"],
        text:"Let me check the system. Ah, here you are."
    },
    {
        type:"minigame",
        header:"Listen and pick the correct answer",
        background: Images["Reception-Blur"],
        minigame:Minigames["Reception"]
    },
    {
        type:"transition",
        newBackground: Images["Dorm"],
        text:"Meeting the roommates",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Dorm"],
        text:"Hello! I think I am your new roommate. My name is Barbaros."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["Dorm"],
        text:"Hey there! Welcome to the squad. I’m Luca. I’m from Milan, Italy. I arrived just an hour ago."
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["Dorm"],
        text:" Hi Barbaros, nice to meet you. I am Yuki, from Tokyo, Japan. I was trying to organize my desk."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Dorm"],
        text:"Nice to meet you both! I’m from Istanbul. It’s my first time living with roommates."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["Dorm"],
        text:"Don't worry, we are all new here. I was just telling Yuki that I am starving. Is anyone else hungry?"
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["Dorm"],
        text:"I am! I heard there is a great place for street food nearby."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Dorm"],
        text:"Count me in. I want to see the city as soon as possible."
    },
    {
        type:"minigame",
        header:"Organize the words and form a sentence",
        background: Images["Dorm-Blur"],
        minigame:Minigames["Dorm"]
    },
    {
        type:"transition",
        newBackground: Images["CityCentre"],
        text:"Exploring the city centre",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["CityCentre"],
        text:"Look at these fountains! Rome is like an open-air museum, isn't it?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["CityCentre"],
        text:"It really is. In Istanbul, we have a lot of history too, but this architecture is very different."
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["CityCentre"],
        text:"I want to take a photo of every building. Barbaros, what do you usually do in your free time in Turkey?"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["CityCentre"],
        text:"I like playing video games and hanging out with my friends at seaside cafes. What about you, Yuki?"
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["CityCentre"],
        text:"I love photography and drawing manga. That’s why I love the art here in Italy"
    },
    {
        type:"minigame",
        header:"Pick the correct answer",
        background: Images["CityCentre-Blur"],
        minigame:Minigames["CityCentre"]
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["CityCentre"],
        text:"What about you Luca? Do you have any special hobbies?"
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["CityCentre"],
        text:"I love football, of course! But I also play the guitar. Maybe I can play something for you guys later this week."
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["CityCentre"],
        text:"That would be amazing! Learning about different cultures is the best part of this trip."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["CityCentre"],
        text:"I agree. I was worried about my English, but talking to you guys feels very natural."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["CityCentre"],
        text:"That’s the spirit! Hey, look the pizzeria is over there. The smell is incredible. Let’s go!"
    },
    {
        type:"transition",
        newBackground: Images["Pizzeria"],
        text:"At the pizzeria",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Pizzeria"],
        text:"This is unbelievable. It's so thin and delicious!"
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["Pizzeria"],
        text:"I agree! It is the best... Oh no! I am so sorry! A big piece of tomato sauce just fell on my shirt!"
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["Pizzeria"],
        text:"Don't panic, Yuki! It's just a small accident. Let me ask the waiter for help immediately."
    },
    {
        type:"minigame",
        header:"Listen and pick the correct answer",
        background: Images["Pizzeria-Blur"],
        minigame:Minigames["Pizza"]
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["Pizzeria"],
        text:"Thank you so much, guys! You are lifesavers. I was so embarrassed."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["Pizzeria"],
        text:"Don't mention it! In Italy, we say a meal without a little mess is not a real meal."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["Pizzeria"],
        text:"Then this is definitely a real meal."
    },
    {
        type:"transition",
        newBackground: Images["River"],
        text:"A walk by the river",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["River"],
        text:"The sun is finally starting to set. The light on the water is beautiful."
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["River"],
        text:"This is the perfect shot. I'm so glad we decided to walk after dinner."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["River"],
        text:"It’s getting a bit chilly, though. We should start heading back to the dormitory. Remember, the orientation starts at eight-thirty tomorrow morning at the main hall."
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["River"],
        text:"Eight-thirty? That's quite early, but it's okay since the school is right next to our building."
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["River"],
        text:"I'm too excited to sleep anyway! I want to see our classrooms and meet the teachers."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["River"],
        text:"Me too. A good rest is the best preparation for the first day. Let's go!"
    },
    {
        type:"transition",
        newBackground: Images["DormNight"],
        text:"End of the first day",
        time:5000
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["DormNight"],
        text:"What a long and amazing day. From Istanbul to Rome..."
    },
    {
        type:"dialog",
        character:Characters["Yuki"],
        background: Images["DormNight"],
        text:"Goodnight guys. I’m so tired but very happy."
    },
    {
        type:"dialog",
        character:Characters["Luca"],
        background: Images["DormNight"],
        text:"Goodnight roommies. See you at breakfast!"
    },
    {
        type:"dialog",
        character:Characters["Barbaros"],
        background: Images["DormNight"],
        text:"Goodnight."
    },
]

const startImg = "../images/backgrounds/CityCentre.jpg"
const startTitle = "The First Day"

export const Ch2StartData = {
    "Image": startImg,
    "Title": startTitle
}
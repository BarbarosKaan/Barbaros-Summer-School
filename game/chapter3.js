import Character from "./character.js"
import {Quiz, Listening, Grammar, Sentence} from "./minigames.js"
const body = document.querySelector("body")

const Characters = {
    "Barbaros": new Character("Barbaros",
        "../images/characters/barbaros-doodle.png",
        "../audios/voices/barbaros_voice.m4a"
    ),
    "Luca": new Character("Luca",
        "../images/characters/luca-doodle.png",
        "../audios/voices/luca_voice.m4a"
    ),
    "Yuki": new Character("Yuki",
        "../images/characters/yuki-doodle.png",
        "../audios/voices/yuki_voice.m4a"
    ),
    "Oskar": new Character("Oskar",
        "../images/characters/oskar-doodle.png",
        "../audios/voices/oskar_voice.m4a"
    ),
    "Clara": new Character("Clara",
        "../images/characters/clara-doodle.png",
        "../audios/voices/clara_voice.m4a"
    ),
    "MsDavies": new Character("Ms. Davies",
        "../images/characters/asyalı-doodle.png",
        "../audios/voices/asyali_voice.m4a"
    ),
    "Mudur": new Character("Mr. Ferretti",
        "../images/characters/mudur-doodle.png",
        "../audios/voices/taksici_voice.m4a"
    ),
    "ProfBianchi": new Character("Prof. Bianchi",
        "../images/characters/bianchi-doodle.png",
        "../audios/voices/bianchi_voice.m4a"
    ),
    "Ogrenci": new Character("Student",
        "../images/characters/ogrenci-doodle.png",
        "../audios/voices/anne_voice.m4a"
    )
}

const Images = {
    "Room": "../images/backgrounds/Dorm.jpg",
    "Room-Blur": "../images/backgrounds/Dorm-Blur.png",
    "SchoolEntrance": "../images/backgrounds/SchoolEntrance.jpg",
    "SchoolEntrance-Blur": "../images/backgrounds/SchoolEntrance-blur.png",
    "MainHall": "../images/backgrounds/main-hall.jpg",
    "MainHall-Blur": "../images/backgrounds/main-hall-blur.jpg",
    "ClassroomA": "../images/backgrounds/classroom-a.jpg",
    "ClassroomA-Blur": "../images/backgrounds/classroom-a-blur.jpg",
    "Cafeteria": "../images/backgrounds/cafeteria.jpg",
    "Cafeteria-Blur": "../images/backgrounds/cafeteria-blur.jpg",
    "SchoolGarden": "../images/backgrounds/school-garden.jpg",
    "SchoolGarden-Blur": "../images/backgrounds/school-garden-blur.jpg",
    "DormNight": "../images/backgrounds/DormNight.png",
    "DormNight-Blur": "../images/backgrounds/DormNight-Blur.png",
}

const Audios = {
    "Mudur-ClassRooms": "../audios/listenings/ch3_mudur_classrooms.mp3",
    "Yuki-Exhibition": "../audios/listenings/ch3_yuki_exhibition.mp3",
    "Mudur-Cafeteria": "../audios/listenings/ch3_mudur_cafeteria.mp3",
}

const Minigames = {
    "OrientationTime": new Quiz(
        "What time does the orientation start?",
        ["7:55", "8:00", "8:15", "8:30"],
        3,
        () => {
            body.style.backgroundImage = `url("${Images["Room"]}")`
            Characters["Barbaros"].speak("Eight-thirty. Okay. I can do this. Where are my shoes?!")
        },
        () => {
            body.style.backgroundImage = `url("${Images["Room"]}")`
            Characters["Luca"].speak("Eight-thirty, Barbaros! Focus! Where are your shoes?!")
        }
    ),
    "DontBeLate": new Sentence(
        ["I", "do", "not", "want", "to", "be", "late"],
        () => {
            body.style.backgroundImage = `url("${Images["SchoolEntrance"]}")`
            Characters["Luca"].speak("Then keep up! Come on!")
        },
        () => {
            body.style.backgroundImage = `url("${Images["SchoolEntrance"]}")`
            Characters["Luca"].speak("You mean 'I do not want to be late.' Now come on, keep up!")
        }
    ),
    "SchoolBuiltWhen": new Grammar(
        "The school building ",
        " built in the nineteen twenties.",
        "was",
        () => {
            body.style.backgroundImage = `url("${Images["SchoolEntrance"]}")`
            Characters["Yuki"].speak("See? History is useful!")
        },
        () => {
            body.style.backgroundImage = `url("${Images["SchoolEntrance"]}")`
            Characters["Yuki"].speak("It should be 'was built.' Passive voice!")
        }
    ),
    "ClassAFloor": new Listening(
        Audios["Mudur-ClassRooms"],
        "Which floor is Class A on?",
        ["Ground floor", "First floor", "Second floor", "Third floor"],
        1,
        () => {
            body.style.backgroundImage = `url("${Images["MainHall"]}")`
            Characters["Barbaros"].speak("First floor, room one-oh-one. Got it.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["MainHall"]}")`
            Characters["Barbaros"].speak("Wait, I missed that. Let me check the board... First floor, room one-oh-one. Okay.")
        }
    ),
    "OskarCountry": new Quiz(
        "Where is Oskar from?",
        ["Czech Republic", "Hungary", "Poland", "Slovakia"],
        2,
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["Oskar"].speak("Yep, Poland! Kraków, to be specific. Small city but very beautiful.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["Oskar"].speak("Poland, actually! Kraków, to be specific. Small city but very beautiful.")
        }
    ),
    "ImproveEnglish": new Sentence(
        ["I", "want", "to", "improve", "my", "English", "speaking"],
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["MsDavies"].speak("That's a great goal. And I think you are already doing better than you think.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["MsDavies"].speak("You mean 'I want to improve my English speaking.' And that is a wonderful goal!")
        }
    ),
    "HeComesFrom": new Grammar(
        "His name is Oskar and he ",
        " from Poland.",
        "comes",
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["MsDavies"].speak("Well done! 'Comes from' is correct. Excellent introduction.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["MsDavies"].speak("Almost! We say 'he comes from Poland.' Great effort though!")
        }
    ),
    "SpreadMeaning": new Quiz(
        "What does the word 'spread' mean in this context?",
        ["To open something wide", "A large variety of food on a table", "A type of bread", "To share something with others"],
        1,
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["Oskar"].speak("See, you're already teaching the class things. Impressive.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["MsDavies"].speak("'Spread' here means a large variety of food laid out on a table. A very useful word!")
        }
    ),
    "CafeteriaActivity": new Listening(
        Audios["Mudur-Cafeteria"],
        "What will happen after lunch?",
        ["Students will go back to their classrooms", "Students will take a test", "Students will do a team activity at their tables", "Students will go on a tour of the school"],
        2,
        () => {
            body.style.backgroundImage = `url("${Images["Cafeteria"]}")`
            Characters["Luca"].speak("A team challenge! Perfect. We are going to win this.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["Cafeteria"]}")`
            Characters["Luca"].speak("A team challenge at our table! Come on, we are going to win this.")
        }
    ),
    "HowManyRecommendations": new Quiz(
        "How many recommendations does the challenge ask for?",
        ["Two", "Three", "Four", "Five"],
        1,
        () => {
            body.style.backgroundImage = `url("${Images["Cafeteria"]}")`
            Characters["Barbaros"].speak("At least three. And we have five people, so we're already ahead.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["Cafeteria"]}")`
            Characters["Clara"].speak("At least three recommendations. We can definitely do more than that!")
        }
    ),
    "GreatTeam": new Sentence(
        ["We", "make", "a", "great", "team"],
        () => {
            body.style.backgroundImage = `url("${Images["Cafeteria"]}")`
            Characters["Luca"].speak("The greatest!")
        },
        () => {
            body.style.backgroundImage = `url("${Images["Cafeteria"]}")`
            Characters["Luca"].speak("'We make a great team.' And we really do!")
        }
    ),
    "FashionCapital": new Quiz(
        "Which Italian city is considered the fashion capital of the world?",
        ["Rome", "Florence", "Milan", "Venice"],
        2,
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["Oskar"].speak("Milan! That's where Luca is from! I have to tell him this.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["ProfBianchi"].speak("It's Milan! The home of some of the world's greatest fashion designers. A city of style.")
        }
    ),
    "Buongiorno": new Grammar(
        "In Italian, 'good morning' is ",
        ".",
        "buongiorno",
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["ProfBianchi"].speak("Perfetto! You are already learning. By the end of this summer, you will know much more.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["ProfBianchi"].speak("It's 'buongiorno!' You will hear it everywhere in Rome. A very useful word.")
        }
    ),
    "FoodInCulture": new Sentence(
        ["Food", "is", "very", "important", "in", "Italian", "culture"],
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["ProfBianchi"].speak("Absolutely! You are already thinking like an Italian.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["ClassroomA"]}")`
            Characters["ProfBianchi"].speak("'Food is very important in Italian culture.' And that is one hundred percent true!")
        }
    ),
    "ExhibitionCost": new Listening(
        Audios["Yuki-Exhibition"],
        "How much does the exhibition cost for students?",
        ["Five euros", "Ten euros", "It depends on the time", "It is free with a school ID"],
        3,
        () => {
            body.style.backgroundImage = `url("${Images["SchoolGarden"]}")`
            Characters["Luca"].speak("Free?! Even better. Saturday it is.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["SchoolGarden"]}")`
            Characters["Yuki"].speak("It's free! As long as you bring your school ID. So don't forget it, Barbaros.")
        }
    ),
    "TodayWas": new Grammar(
        "Today ",
        " even better than I expected.",
        "was",
        () => {
            body.style.backgroundImage = `url("${Images["DormNight"]}")`
            Characters["Barbaros"].speak("Was. Yeah. It really was.")
        },
        () => {
            body.style.backgroundImage = `url("${Images["DormNight"]}")`
            Characters["Barbaros"].speak("'Was.' Today was even better than I expected. And that's true.")
        }
    ),
}

export const Ch3Story = [
    // --- ACT 1: GEÇ KALAN BARBAROS ---
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Room"],
        text: "Ugh... What time is it?"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Room"],
        text: "Barbaros! Wake up! It's seven fifty-five! The orientation starts at eight-thirty!"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Room"],
        text: "Wait, what?! That can't be right..."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Room"],
        text: "I already tried to wake you up twice! Yuki is ready and waiting at the door. Let's go!"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Room"],
        text: "Okay, okay! Give me five minutes!"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Room"],
        text: "You have three!"
    },
    {
        type: "minigame",
        header: "Pick the correct answer",
        background: Images["Room-Blur"],
        minigame: Minigames["OrientationTime"]
    },

    // --- TRANSITION: ROOM -> SCHOOL ENTRANCE ---
    {
        type: "transition",
        newBackground: Images["SchoolEntrance"],
        text: "First Day of School",
        time: 5000
    },

    // --- SCHOOL ENTRANCE ---
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolEntrance"],
        text: "You look like you just woke up thirty seconds ago, Barbaros."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolEntrance"],
        text: "That's because I did."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolEntrance"],
        text: "No time for jokes, we have to move. How far is the main hall from here?"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolEntrance"],
        text: "I checked the map last night. It should be straight ahead, through the main entrance and then left."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolEntrance"],
        text: "You checked the map last night?"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolEntrance"],
        text: "Of course. I always prepare."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolEntrance"],
        text: "See, Barbaros? That's what you should have done instead of sleeping."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolEntrance"],
        text: "Okay, okay, I get it. Can we just walk faster?"
    },
    {
        type: "minigame",
        header: "Organize the words and form a sentence",
        background: Images["SchoolEntrance-Blur"],
        minigame: Minigames["DontBeLate"]
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolEntrance"],
        text: "Wow. This building is huge."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolEntrance"],
        text: "It says on the website that it was built in the nineteen twenties. The architecture is incredible."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolEntrance"],
        text: "Yuki, we really don't have time for a history lesson right now."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolEntrance"],
        text: "I'm just saying!"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolEntrance"],
        text: "No, she's right. This place is amazing. I didn't expect it to look like this."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolEntrance"],
        text: "Alright, alright. It's beautiful. Now let's find the main hall before we miss everything."
    },
    {
        type: "minigame",
        header: "Complete the sentence",
        background: Images["SchoolEntrance-Blur"],
        minigame: Minigames["SchoolBuiltWhen"]
    },

    // --- TRANSITION: SCHOOL ENTRANCE -> MAIN HALL ---
    {
        type: "transition",
        newBackground: Images["MainHall"],
        text: "Orientation",
        time: 5000
    },

    // --- MAIN HALL ---
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["MainHall"],
        text: "There are so many students here. Where are they all from?"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["MainHall"],
        text: "I heard someone speaking Spanish near the door. And I think I saw a group of German students over there."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["MainHall"],
        text: "This is amazing. Everyone came here from a different country just to learn English together."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["MainHall"],
        text: "When you put it like that, it sounds really cool."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["MainHall"],
        text: "It IS really cool. This is exactly what I was hoping for."
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["MainHall"],
        text: "Good morning, everyone! Welcome to the Roma Summer Language Academy! My name is Mr. Ferretti, and I am the director of this programme."
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["MainHall"],
        text: "I hope you all had a good first night in Rome. This summer, you will study English and Italian culture, make new friends, and hopefully fall in love with this beautiful city."
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["MainHall"],
        text: "Now, I will announce the class groups. Please listen carefully for your name."
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["MainHall"],
        text: "Barbaros Lale... Class A. Luca Ricci... Class B. Yuki Tanaka... Class B."
    },
    {
        type: "minigame",
        header: "Listen and pick the correct answer",
        background: Images["MainHall-Blur"],
        minigame: Minigames["ClassAFloor"]
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["MainHall"],
        text: "Oh no. We are not together."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["MainHall"],
        text: "It's okay, Luca. We will still see each other at lunch and after school."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["MainHall"],
        text: "It feels weird. We've only known each other for one day and I already don't want to be in a different class."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["MainHall"],
        text: "One day is enough, my friend. We are roommates. That makes us brothers."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["MainHall"],
        text: "And sister!"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["MainHall"],
        text: "Of course, and sister! Okay. Let's go find our rooms. We'll meet at the cafeteria at noon, yes?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["MainHall"],
        text: "Deal. Good luck, guys."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["MainHall"],
        text: "You too, Barbaros. Don't fall asleep in class!"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["MainHall"],
        text: "I make no promises."
    },

    // --- TRANSITION: MAIN HALL -> CLASSROOM A ---
    {
        type: "transition",
        newBackground: Images["ClassroomA"],
        text: "Class A",
        time: 5000
    },

    // --- CLASSROOM A ---
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Room one-oh-one... This is it. Okay. Deep breath. Let's go."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "There are only a few people here so far. Where should I sit..."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Hey! Are you also in Class A?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Oh, yes. Yes I am. Hi."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Cool! Come sit here, I saved this seat. I'm Oskar, by the way. From Poland."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Nice to meet you. I'm Barbaros, from Turkey."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Turkey! That's awesome. Istanbul, right? I've seen so many cool videos about Istanbul online."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Haha, yes, Istanbul. Have you been?"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Never, but I really want to. Do you know the game 'Assassin's Creed'? There's a whole game set there."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Are you serious? I love that game! I actually played it before coming here."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "No way! Which part is your favourite?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Probably the parkour parts. Running across the rooftops felt so real because I actually know those places."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "That is the coolest thing I have ever heard. I'm more into strategy games myself. Do you play anything else?"
    },
    {
        type: "minigame",
        header: "Pick the correct answer",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["OskarCountry"]
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "I play a lot of things. Mostly action and adventure. You?"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Strategy, simulation, sometimes RPGs. I spend probably too much time gaming, to be honest."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Same. My mum always says I should go outside more."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "My dad says the exact same thing! And then I came all the way to Italy, so I think that counts."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Definitely counts."
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "Good morning, Class A! Please find your seats. We are about to begin."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Okay, that voice... I know that voice."
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "My name is Ms. Davies. I will be your English teacher for this summer. I am very happy to meet you all, and I hope we are going to have a wonderful few weeks together."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Oh my... That's the woman from the plane!"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "What? You know her?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "I sat next to her on the flight from Istanbul. She spoke to me! She helped me feel less nervous!"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "That is insane. Are you going to say something?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "I don't know! Should I?"
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "Now, let's start with something simple. Can everyone tell me one thing they are hoping to improve this summer? Let's go around the room."
    },
    {
        type: "minigame",
        header: "Organize the words and form a sentence",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["ImproveEnglish"]
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Wait, did she just say 'better than you think'? Does she remember you?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "I think... she does?"
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "Alright, now let's do a short activity. I want you to interview the person next to you and then introduce them to the class. You have five minutes. Go ahead!"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Okay! Let's do this properly. What is your full name?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Barbaros Lale."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "How do you spell 'Barbaros'?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "B-A-R-B-A-R-O-S."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Cool name. What do you like doing in your free time?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Gaming, hanging out with friends, going to cafes by the sea. What about you?"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Gaming, obviously. I also like building computers. I built my own PC last year."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "No way, that's awesome. I have no idea how to do that."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "I can teach you sometime. It's not as hard as it sounds."
    },
    {
        type: "minigame",
        header: "Complete the sentence",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["HeComesFrom"]
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "Now, for the second part of our lesson, we are going to talk about daily routines. This is one of the most useful topics in everyday English."
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "I want each of you to tell me one thing you do every morning. Use the present simple tense. For example, 'I wake up at seven o'clock.'"
    },
    {
        type: "dialog",
        character: Characters["Ogrenci"],
        background: Images["ClassroomA"],
        text: "I eat breakfast with my family every morning."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "I usually skip breakfast and go straight to my computer."
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "Oskar, that is honest! Though I hope you will eat breakfast here in Italy. The food is too good to skip."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "I usually have tea and watch something before school. In Turkey, breakfast is very important. My mum always makes a big spread."
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "A 'spread' — that's a great word. It means a large variety of food laid out on a table. Well done for using it naturally."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Oh! I didn't realise I used it. I just said what felt right."
    },
    {
        type: "dialog",
        character: Characters["MsDavies"],
        background: Images["ClassroomA"],
        text: "That is exactly how language learning should work."
    },
    {
        type: "minigame",
        header: "Pick the correct answer",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["SpreadMeaning"]
    },

    // --- TRANSITION: CLASSROOM A -> CAFETERIA ---
    {
        type: "transition",
        newBackground: Images["Cafeteria"],
        text: "Lunch Break",
        time: 5000
    },

    // --- CAFETERIA ---
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "Oskar, over here! My roommates are already at that table."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "Nice. Let's go."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "Barbaros! How was Class A? Tell me everything."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "You will not believe this. The English teacher — she was the woman from the plane. The one I told you about last night."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "The one who talked to you during the flight?!"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "Yes! Ms. Davies! She's our English teacher!"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "That is such a coincidence! Did she recognise you?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "I think so. She said something like 'you're doing better than you think' and kind of smiled at me."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "That's amazing. Rome is full of surprises."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "Hi, I'm Oskar. I'm guessing you two are the famous roommates."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "Famous? I like that. Yes, I'm Luca. From Milan."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "And I'm Yuki. From Tokyo. It's nice to meet you, Oskar."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "You too. How was Class B?"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "Really good actually. The teacher is very energetic. And we met someone interesting, right Yuki?"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "Oh yes! This is Clara."
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "Hello everyone! Sorry, I was just getting my food. It smells incredible in here."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "Hi Clara, I'm Barbaros. Where are you from?"
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "I'm from Lyon, in France. It's my first time in Italy. Everything is so different from home but in a good way."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "I'm Oskar, from Poland. First time in Italy too."
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "Oh really? What do you think so far?"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "Honestly? The food alone makes the whole trip worth it."
    },
    {
        type: "minigame",
        header: "Listen and pick the correct answer",
        background: Images["Cafeteria-Blur"],
        minigame: Minigames["CafeteriaActivity"]
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "What kind of challenge, do you think?"
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "Maybe a quiz? Or something creative?"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "I hope it's not a sports thing. I am not very athletic."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "Don't worry, Yuki. If it's football, I'll carry the whole team."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "And if it's gaming, Oskar and I have it covered."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "Exactly. Between the five of us, we have all areas covered."
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "I am quite good at trivia. And languages, obviously."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "I can draw and do anything creative."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "See? Unstoppable."
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["Cafeteria"],
        text: "Alright everyone, let's begin! Each table has an envelope in front of them. Inside is a challenge. Open it now!"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "Okay, opening it... It says: 'Create a short travel guide for a visitor coming to your home country. Include at least three recommendations. You have fifteen minutes. Present it to the room.'"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "We have five different countries at this table. Whose country do we do?"
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "Why not all of us? One recommendation each, from our own country."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "That's a great idea, Clara!"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "Okay, who goes first?"
    },
    {
        type: "minigame",
        header: "Pick the correct answer",
        background: Images["Cafeteria-Blur"],
        minigame: Minigames["HowManyRecommendations"]
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "I'll go first. If you visit Italy, you must eat a real Neapolitan pizza. Not the ones from other countries. The real thing."
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "If you visit France, go to Lyon, not just Paris. Lyon has the best food in the entire country. Better than Paris, in my opinion."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "If you visit Poland, go to Kraków. Walk around the old town square at night. It's like stepping back in time. Oh, and try the pierogi."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "If you visit Japan, go to Kyoto, not just Tokyo. Tokyo is amazing but Kyoto has a different kind of beauty. More quiet and traditional."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "If you visit Turkey, go to Istanbul, but don't just stay on the tourist side. Go to the local neighbourhoods. Sit at a cafe by the Bosphorus. Have tea and just watch the sea."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "That sounds amazing."
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["Cafeteria"],
        text: "I want to visit all five places now."
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["Cafeteria"],
        text: "Excellent work, everyone! I have listened to several tables and I am very impressed. But I have to say, this table here — the mixed group — had the most creative and heartfelt presentation. Well done!"
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["Cafeteria"],
        text: "I KNEW it. I knew we would win!"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["Cafeteria"],
        text: "What's the surprise?"
    },
    {
        type: "dialog",
        character: Characters["Mudur"],
        background: Images["Cafeteria"],
        text: "Free gelato vouchers for the school café this afternoon. One each!"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["Cafeteria"],
        text: "That is the best prize I have ever heard of."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["Cafeteria"],
        text: "Agreed. Completely agreed."
    },
    {
        type: "minigame",
        header: "Organize the words and form a sentence",
        background: Images["Cafeteria-Blur"],
        minigame: Minigames["GreatTeam"]
    },

    // --- TRANSITION: CAFETERIA -> CLASSROOM A ---
    {
        type: "transition",
        newBackground: Images["ClassroomA"],
        text: "Afternoon Lessons",
        time: 5000
    },

    // --- CLASSROOM A (AFTERNOON) ---
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "That was such a good lunch break. I didn't expect the activity to be that fun."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "Same. And now we have to go back to class."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "What do we have this afternoon?"
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "I think it's Italian Culture. New teacher."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Right. Let's see what that's like."
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Buongiorno, Class A! My name is Professor Bianchi. Welcome to Italian Culture. In this class, we will not just talk about history. We will talk about food, art, music, film, and everyday life in Italy. Sound good?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "Sounds very good actually."
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Let's start with a simple question. Before coming to Italy, what did you already know about Italian culture? Anything at all."
    },
    {
        type: "dialog",
        character: Characters["Ogrenci"],
        background: Images["ClassroomA"],
        text: "Pizza and pasta?"
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Classic answer! And completely correct. But Italy is so much more. Let me ask you this — does anyone know which Italian city is considered the fashion capital of the world?"
    },
    {
        type: "minigame",
        header: "Pick the correct answer",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["FashionCapital"]
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Now, another important part of Italian culture is how we greet each other. In Italy, greetings are very important. We are warm, expressive people. You will notice that Italians often speak with their hands too."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "I already noticed that with my roommate Luca. He talks with his whole body."
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Ha! A true Italian! Now, can anyone tell me — how do you say 'good morning' in Italian?"
    },
    {
        type: "minigame",
        header: "Complete the sentence",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["Buongiorno"]
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Let's finish today with one last thing. I want each of you to share one thing from your own culture that you think is similar to Italian culture. Think about food, family, greetings, anything."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["ClassroomA"],
        text: "In Turkey, we also have tea culture. Like in Italy with coffee, tea is everywhere in Turkey. You drink it with everyone, at any time of day."
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Interesting! In Italy, coffee is almost a ritual. We have very specific rules about when to drink cappuccino, for example."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["ClassroomA"],
        text: "In Poland, family meals are very important too. Sunday lunch is a big deal. Everyone comes together."
    },
    {
        type: "dialog",
        character: Characters["ProfBianchi"],
        background: Images["ClassroomA"],
        text: "Wonderful. Family and food — it seems we are not so different after all."
    },
    {
        type: "minigame",
        header: "Organize the words and form a sentence",
        background: Images["ClassroomA-Blur"],
        minigame: Minigames["FoodInCulture"]
    },

    // --- TRANSITION: CLASSROOM A -> SCHOOL GARDEN ---
    {
        type: "transition",
        newBackground: Images["SchoolGarden"],
        text: "End of Classes",
        time: 5000
    },

    // --- SCHOOL GARDEN ---
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolGarden"],
        text: "Finally! My brain is full."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["SchoolGarden"],
        text: "Good full or bad full?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolGarden"],
        text: "Good full. Definitely good full. I actually really enjoyed today."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolGarden"],
        text: "Barbaros! Oskar! Over here!"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolGarden"],
        text: "How was Italian Culture class?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolGarden"],
        text: "Really good. The teacher is very passionate. And funny."
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["SchoolGarden"],
        text: "We had it too but in a different room. Ours was great as well. We talked about Italian art."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolGarden"],
        text: "I learned things about my own country I didn't even know."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["SchoolGarden"],
        text: "That's a bit embarrassing, Luca."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolGarden"],
        text: "Very embarrassing. Don't tell anyone."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["SchoolGarden"],
        text: "Clara and I were talking earlier — there's a small art exhibition near the school this weekend. Would anyone want to go?"
    },
    {
        type: "dialog",
        character: Characters["Clara"],
        background: Images["SchoolGarden"],
        text: "It's a contemporary Italian artist. I looked it up and it looks really interesting."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["SchoolGarden"],
        text: "I'm in."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["SchoolGarden"],
        text: "If there's gelato nearby, I'm in."
    },
    {
        type: "dialog",
        character: Characters["Oskar"],
        background: Images["SchoolGarden"],
        text: "I'll go anywhere with this group, honestly."
    },
    {
        type: "minigame",
        header: "Listen and pick the correct answer",
        background: Images["SchoolGarden-Blur"],
        minigame: Minigames["ExhibitionCost"]
    },

    // --- TRANSITION: SCHOOL GARDEN -> ROOM ---
    {
        type: "transition",
        newBackground: Images["DormNight"],
        text: "Back at the Dorm",
        time: 5000
    },

    // --- ROOM (KAPANIŞ) ---
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "What a day. I am exhausted."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["DormNight"],
        text: "A good exhausted though."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "Definitely. I didn't expect to enjoy it this much. I thought the first day would be awkward and slow."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "Same. But it flew by."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["DormNight"],
        text: "And we already have plans for the weekend."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "And I have a new friend who builds computers and loves games."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "And I found out Milan is the fashion capital of the world, which I already knew, but it's nice to hear it officially."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["DormNight"],
        text: "You did not already know that."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "I did!"
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["DormNight"],
        text: "You absolutely did not."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "I'm staying out of this one."
    },
    {
        type: "minigame",
        header: "Complete the sentence",
        background: Images["DormNight-Blur"],
        minigame: Minigames["TodayWas"]
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "Goodnight guys. Same time tomorrow?"
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "Please set an alarm this time. Multiple alarms."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "I set three this morning and you still didn't wake up."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "Then set five."
    },
    {
        type: "dialog",
        character: Characters["Yuki"],
        background: Images["DormNight"],
        text: "Goodnight, both of you."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "Goodnight. And hey — thanks for waking me up this morning, Luca."
    },
    {
        type: "dialog",
        character: Characters["Luca"],
        background: Images["DormNight"],
        text: "Always. That's what roommates are for."
    },
    {
        type: "dialog",
        character: Characters["Barbaros"],
        background: Images["DormNight"],
        text: "Yeah. I think I'm starting to really like this place."
    },
]

const startImg = "../images/backgrounds/SchoolEntrance.jpg"
const startTitle = "First Day of School"

export const Ch3StartData = {
    "Image": startImg,
    "Title": startTitle
}

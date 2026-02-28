import {typeWriter} from "./utils.js"

const background = document.querySelector("#background")
const personImg = document.querySelector("#person-img")
const personName = document.querySelector("#person-name")
const speakText = document.querySelector("#text")

export default class Character{
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
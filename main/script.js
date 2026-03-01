const ch1Btn = document.getElementById("btn1")
const ch2Btn = document.getElementById("btn2")
const ch3Btn = document.getElementById("btn3")
ch2Btn.disabled = true
ch3Btn.disabled = true

ch1Btn.onclick = () => {
    localStorage.setItem("currentChapter","1")
    window.location.href = "../game/game.html"
}

if(localStorage.getItem("ch2Unlocked") === "true"){
    ch2Btn.disabled = false
    ch2Btn.classList.add("available")
    ch2Btn.onclick = () =>{
        localStorage.setItem("currentChapter","2")
        window.location.href = "../game/game.html"
    }
}

if(localStorage.getItem("ch3Unlocked") === "true"){
    ch3Btn.disabled = false
    ch3Btn.classList.add("available")
    ch3Btn.onclick = () =>{
        localStorage.setItem("currentChapter","3")
        window.location.href = "../game/game.html"
    }
}
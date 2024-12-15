import allCards from "./utils/ques-answ.js"
const isTouch = () => 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
const allSets = document.querySelectorAll(".popup__set")
const popup = document.querySelector(".popup")
const popupTitle = document.querySelector(".popup__title")
const popupDescription = document.querySelector(".popup__description")
const popupSets = document.querySelector(".popup__sets")
const findAPair = document.querySelector(".popup__find-a-pair")
const checkMemory = document.querySelector(".popup__check-memory")
const chosenSet = document.querySelector(".popup__chosen-set")
const pool = document.querySelector(".pool")
const card = document.querySelector(".template").content.querySelector(".card")
const next = document.querySelector(".next")
const poolContainer = document.querySelector(".pool__container")
const timer = document.querySelector(".timer")
const buttonCoverR = document.querySelector(".cover-r")
const buttonCoverL = document.querySelector(".cover-l")
const pictureR = document.querySelector(".picture-right")
const pictureL = document.querySelector(".picture-left")
const timeSeconds = document.getElementById("seconds")
const timeMiliseconds = document.getElementById("tens")
const tryAgainButton = document.querySelector(".try-again")
const scrollLeft = document.querySelector(".scroll-left")
const scrollRight = document.querySelector(".scroll-right")
let selectCard = null
let chosenArray = null
let min = 0
let max = 6
let tens = "00"
let seconds = "00"
let interval = null
let count = 0

function startTimer() {
    tens++;
    if (tens <= 9) {
        timeMiliseconds.textContent = "0" + tens;
    }
    if (tens > 9) {
        timeMiliseconds.textContent = tens;
    }
    if (tens > 99) {
        seconds++;
        timeSeconds.textContent = "0" + seconds;
        tens = 0;
        timeMiliseconds.textContent = "0" + 0;
    }
    if (seconds > 9) {
        timeSeconds.textContent = seconds;
    }
}

function nextCards() {
    poolContainer.innerHTML = ""
    // очистили контейнер
    if (max === chosenArray.length) {
        finishGame()
    } else {
        min = min + 6
        max = max + 6 > chosenArray.length ? chosenArray.length : max + 6
        count = 0
        renderCards("ru")
        renderCards("eng")
    }
}
function chooseSet(text, set) {
    tryAgainButton.classList.add("hidden")
    popupTitle.textContent = "Вы выбрали набор:"
    popupDescription.textContent = "Варианты тренировок"
    popupSets.classList.add("hide")
    checkMemory.classList.add("show")
    findAPair.classList.add("show")
    chosenSet.classList.add("show")
    chosenSet.textContent = text
}
function startGameFindPairs() {
    renderCards("ru")
    renderCards("eng")
    popup.classList.add("close")
    pool.classList.add("open")
    interval = setInterval(startTimer, 10);
}

function startGameCheckMemory() {
    startGameFindPairs()
    coverCards(pictureL)
}

allSets.forEach((set) => {
    // console.log(set)
    set.addEventListener("click", (evt) => {
        getArray(evt.target.dataset.set)
        chooseSet(evt.target.textContent, evt.target.dataset.set)
    })
})

function renderCards(lang) {
    let array = readyArray()
    // console.log(min,max)
    let shuffle = array.sort(function () {
        return Math.random() - 0.5;
    });
    for (let i = 0; i < shuffle.length; i++) {
        const someCard = card.cloneNode(true)
        someCard.textContent = shuffle[i][lang]
        someCard.classList.add(lang)
        someCard.addEventListener("click", match)
        someCard.dataset.id = shuffle[i].id
        poolContainer.append(someCard)
    }
}
// получаем и массив ниже и рандомно перемешиваем через готовую функции
function getArray(set) {
    chosenArray = null
    chosenArray = allCards[set].sort(function () {
        return Math.random() - 0.5;
    });
}
function readyArray() {
    return chosenArray.slice(min, max)
}
function match(evt) {
    if (!!selectCard) {
        if (selectCard.dataset.id === evt.target.dataset.id && selectCard !== evt.target) {
            selectCard.classList.add("delete")
            evt.target.classList.add("delete")
            count++
            console.log(count)
            count === max - min ? nextCards() : null
        }
        selectCard.classList.remove("select")
        selectCard = null
    } else {
        evt.target.classList.add("select")
        selectCard = evt.target
    }
}

function coverCards(picture) {
    picture.classList.contains("again") ?
        picture.classList.remove("shown", "again") :
        picture.classList.contains("shown") ?
            picture.classList.add("again") :
            picture.classList.add("shown")
}
function uncoverCards(picture) {
    picture.classList.remove("shown","again")
}


function finishGame() {
    clearInterval(interval)
    uncoverCards(pictureL)
    uncoverCards(pictureR)
    tryAgainButton.classList.remove("hidden")
    popup.classList.remove("close")
    pool.classList.remove("open")
    popupTitle.textContent = `Вы справились за: ${timer.textContent}`
    popupDescription.innerHTML = "Тренировать другой набор"
    timeMiliseconds.textContent = "00"
    timeSeconds.textContent = "00"
    popupSets.classList.remove("hide")
    checkMemory.classList.remove("show")
    findAPair.classList.remove("show")
    chosenSet.classList.remove("show")
    
    
    min = 0
    max = 6
    tens = "00";
    seconds = "00";
    poolContainer.innerHTML = ""
    count = 0
}



function scroll(direction) {
    popupSets.scrollBy(direction, 0)
}

checkMemory.addEventListener("click", startGameCheckMemory)
findAPair.addEventListener("click", startGameFindPairs)
next.addEventListener("click", nextCards)
tryAgainButton.addEventListener("click", startGameFindPairs)

buttonCoverR.addEventListener("click", () => {
    coverCards(pictureR)
})
buttonCoverL.addEventListener("click", () => {
    coverCards(pictureL)
})

if (isTouch()) {
    scrollLeft.addEventListener("touchstart", () => {
        interval = setInterval(() => {
            scroll(-2)
        }, 0);
    })
    scrollLeft.addEventListener("touchend", () => {
        clearInterval(interval)
    })
    scrollRight.addEventListener("touchstart", () => {
        interval = setInterval(() => {
            scroll(2)
        }, 0);
    })
    scrollRight.addEventListener("touchend", () => {
        clearInterval(interval)
    })
} else {
    scrollLeft.addEventListener("mouseup", () => {
        clearInterval(interval)
    })

    scrollLeft.addEventListener("mousedown", () => {
        interval = setInterval(() => {
            scroll(-2)
        }, 0);
    })
    scrollLeft.addEventListener("mouseout", () => {
        clearInterval(interval)
    })
    scrollRight.addEventListener("mousedown", () => {
        interval = setInterval(() => {
            scroll(2)
        }, 0);
    })
    scrollRight.addEventListener("mouseup", () => {
        clearInterval(interval)
    })
    scrollRight.addEventListener("mouseout", () => {
        clearInterval(interval)
    })
}
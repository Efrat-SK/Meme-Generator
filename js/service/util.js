'use strict'

function addClass(existClass , newClass) {
    const element = document.querySelector(`.${existClass}`)
    element.classList.add(newClass)
}

function removeClass(existClass , oldClass) {
    const element = document.querySelector(`.${existClass}`)
    element.classList.remove(oldClass)
}
'use strict'

function onSwichPage() {
    document.querySelector('.editor').classList.add('hidden')
    document.querySelector('.gallery').classList.remove('hidden')
}

function toggleMenu() {
    document.body.classList.toggle("menu-open")
}
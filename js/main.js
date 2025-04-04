'use strict'

function onSwichPageGallery() {
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.editor').classList.add('hidden')
    document.querySelector('.saved').classList.add('hidden')
}

function onSwichPageSaved() {
    document.querySelector('.saved').classList.remove('hidden')
    document.querySelector('.editor').classList.add('hidden')
    document.querySelector('.gallery').classList.add('hidden')
}


function toggleMenu() {
    document.body.classList.toggle("menu-open")
}
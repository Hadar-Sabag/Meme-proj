'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    renderGallery()
    // resizeCanvas()
}

function renderMeme() {
    const elImg = new Image()
    elImg.src = getImgMeme().url
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, 50, 50)
        })
    }
}

function onSetline(txt) {
    setLine(txt)
    renderMeme()
}


function onSelectImg(imgId) {
    setImgId(imgId)
    renderMeme()
    // gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    // renderDraw()
}

function renderDraw() {
    drawText(gMeme.lines[0].txt, 50, 50)
}

function drawText(text, x, y) {
    // gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    // gCtx.font = '45px Arial'
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    // gCtx.fillText(text, x, y)
    gCtx.font = '45px Arial'
    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the default mouse behavior
        ev.preventDefault()

        //* Gets the first touch point (could be multiple in touch event)
        ev = ev.changedTouches[0]

        /* 
        * Calculate touch coordinates relative to canvas 
        * position by subtracting canvas offsets (left and top) from page coordinates
        */
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            // x: ev.pageX ,
            // y: ev.pageY ,
        }
    }
    return pos
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.clientWidth
}
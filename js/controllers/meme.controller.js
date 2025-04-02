'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    renderGallery()
}

function renderMeme() {
    const elImg = new Image()
    elImg.src = getImgMeme().url
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, line.color, line.size, 50, 50)
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
}

function drawText(text, color, size, x, y) {
    // gCtx.lineWidth = 2
    gCtx.strokeStyle = 'transparent'
    gCtx.fillStyle = color
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    // gCtx.fillText(text, x, y)
    gCtx.font = `${size}px Arial`
    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)
}

function onSetColor(color) {
    const img = gMeme
    img.lines[0].color = color
    renderMeme()
}

function onSetFontSize(elBtn) {
    const img = gMeme
    if (elBtn.innerText === 'A+') {
        if (img.lines[0].size < 50) img.lines[0].size += 1
    }
    else {
        if (img.lines[0].size > 10) img.lines[0].size -= 1
    }
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
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
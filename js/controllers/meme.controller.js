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
    elImg.src = getMeme().url
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

        gMeme.lines.forEach((line, idx) => {
            const isSelected = (gMeme.selectedLineIdx == idx) ? true : false
            drawText(line.txt, line.color, line.size, 50, (idx + 1) * 50, isSelected)
        })
    }
}

function onSetline(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function setFrameAround(text, x, y, size, isSelected) {
    if (isSelected) {
        const textWidth = gCtx.measureText(text).width
        const textHeight = size

        gCtx.beginPath()
        gCtx.strokeStyle = 'white'
        gCtx.lineWidth = 2
        gCtx.strokeRect(x - 5, y - textHeight, textWidth + 10, textHeight + 10)
    }
}

function drawText(text, color, size, x, y, isSelected) {
    // gCtx.lineWidth = 40
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    gCtx.strokeStyle = 'transparent'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`

    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)

    setFrameAround(text, x, y, size, isSelected)
}

function onSetColor(color) {
    const img = gMeme
    img.lines[gMeme.selectedLineIdx].color = color
    // gMeme.lines.map(line => line.color = color)
    renderMeme()
}

function onSetFontSize(elBtn) {
    const img = gMeme
    if (elBtn.innerText === 'A+') {
        if (img.lines[gMeme.selectedLineIdx].size < 50) img.lines[gMeme.selectedLineIdx].size += 1
    }
    else {
        if (img.lines[gMeme.selectedLineIdx].size > 10) img.lines[gMeme.selectedLineIdx].size -= 1
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
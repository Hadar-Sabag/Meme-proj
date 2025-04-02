'use strict'

let gCanvas
let gCtx

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 20,
            color: 'red'
        }
    ]
}

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    // resizeCanvas()

}

function renderMeme() {


}
function setLine() {
    gMeme.lines[0].txt += '1'


    onDraw()
}

function onSelectImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    onDraw()
}

function onDraw(ev) {
    // var pos = getEvPos(ev)
    drawText(gMeme.lines[0].txt, 50, 50)
}

function drawText(text, x, y) {
    // gCtx.lineWidth = 2
    // gCtx.strokeStyle = 'brown'
    // gCtx.fillStyle = 'black'
    // gCtx.font = '45px Arial'
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    // gCtx.fillText(text, x, y)
    // gCtx.strokeText(text, x, y)
    gCtx.font = '45px Arial'
    gCtx.fillText(text, x, y)
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
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
    gElCanvas.width = elContainer.clientWidth
}
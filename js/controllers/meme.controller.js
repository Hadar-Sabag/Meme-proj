'use strict'

let gCanvas
let gCtx
let gIsTextDragged = false

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    renderGallery()
    renderPics()
}

function renderMeme() {
    const elImg = new Image()
    elImg.src = getMeme().url
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

        gMeme.lines.forEach((line, idx) => {
            const isSelected = (gMeme.selectedLineIdx == idx) ? true : false
            drawText(line.txt, line.color, line.size, line.pos.x, line.pos.y, isSelected, idx)
        })
    }
}

function onSetline(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(imgId) {
    document.querySelector('.editor').classList.remove('hidden')
    document.querySelector('.gallery').classList.add('hidden')
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

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSelectText(ev) {
    const { offsetX, offsetY } = ev
    const clickedLine = gMeme.lines.find((line, idx) => {
        const textWidth = getLineWidth(idx)
        const textHeight = line.size

        const inXRange = offsetX >= line.pos.x && offsetX <= (line.pos.x + textWidth)
        const inYRange = offsetY >= (line.pos.y - textHeight / 2) && offsetY <= (line.pos.y + textHeight / 2)

        return inXRange && inYRange
    })

    if (clickedLine) {
        const idx = gMeme.lines.indexOf(clickedLine)
        gMeme.selectedLineIdx = idx
        renderMeme()
    }
}



function onMoveText(ev) {
    if (!gIsTextDragged) return

    const { offsetX, offsetY } = ev
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

    const dx = offsetX - selectedLine.pos.x
    const dy = offsetY - selectedLine.pos.y

    selectedLine.pos.x += dx
    selectedLine.pos.y += dy

    renderMeme()
}

function onReleaseText() {
    gIsTextDragged = false
}

function onDown(ev) {
    onSelectText(ev) // בודק אם הטקסט נבחר
    const { offsetX, offsetY } = ev
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

    const textWidth = getLineWidth(gMeme.selectedLineIdx)
    const textHeight = selectedLine.size

    const inXRange = offsetX >= selectedLine.pos.x && offsetX <= (selectedLine.pos.x + textWidth)
    const inYRange = offsetY >= (selectedLine.pos.y - textHeight / 2) && offsetY <= (selectedLine.pos.y + textHeight / 2)

    if (inXRange && inYRange) {
        gIsTextDragged = true
    }
}

function onUp() {
    onReleaseText()
}



function setFrameAround(text, x, y, size, isSelected, idx) {
    if (isSelected) {
        const textWidth = getLineWidth(idx)
        const textHeight = size

        gCtx.beginPath()
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 3
        gCtx.strokeRect(x - 5, y - textHeight, textWidth + 10, textHeight + 10)
    }
}

function drawText(text, color, size, x, y, isSelected, idx) {
    // gCtx.lineWidth = 40
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    gCtx.strokeStyle = 'transparent'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`

    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)

    setLineWidth(gCtx.measureText(text).width, idx)
    setFrameAround(text, x, y, size, isSelected, idx)
}

function onSetColor(color) {
    const img = gMeme
    img.lines[gMeme.selectedLineIdx].color = color
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

function clearFrame() {
    gMeme.selectedLineIdx = -1
    renderMeme()
}


function onDownloadImg(elLink) {
    clearFrame()

    setTimeout(() => {
        const imgContent = gCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent

        gMeme.selectedLineIdx = 0
        renderMeme()
    }, 100)
}

function onUploadToFB(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gCanvas.toDataURL('image/jpeg')

    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        onUploadToFB(encodedUploadedImgUrl)
    }
    uploadImg(canvasData, onSuccess)
}

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}


// function getEvPos(ev) {
//     const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

//     if (TOUCH_EVS.includes(ev.type)) {
//         //* Prevent triggering the default mouse behavior
//         ev.preventDefault()

//         //* Gets the first touch point (could be multiple in touch event)
//         ev = ev.changedTouches[0]

//         /* 
//         * Calculate touch coordinates relative to canvas 
//         * position by subtracting canvas offsets (left and top) from page coordinates
//         */
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//             // x: ev.pageX ,
//             // y: ev.pageY ,
//         }
//     }
//     return pos
// }

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = { x: ev.offsetX, y: ev.offsetY }

    if (TOUCH_EVS.includes(ev.type)) {
        // מונע פעולה ברירת מחדל (כמו גלילה או זום)
        ev.preventDefault()

        // אם מדובר בטאץ', נשתמש ב-touches
        pos = {
            x: ev.touches[0].pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.touches[0].pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.clientWidth
}
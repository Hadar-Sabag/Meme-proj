'use strict'
let gNextId = 1
let maxLine = 7

let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }
]

function _creatImg() {
    return { id: gNextId++, url: 'img/1.jpg', keywords: ['funny', 'cat'] }
}

function _creatImgs() {

}

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 45,
            color: 'white'
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gImgs.find(img => +gMeme.selectedImgId === img.id)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.lines = [
        {
            txt: 'Add Text Here',
            size: 45,
            color: 'white',
            pos: { x: 50, y: 50 },
            width: 0
        }
    ]
}

function setLineTxt(txt) {
    gMeme.lines.map(line => line.txt = txt)
}

function setLineWidth(width, idx) {
    gMeme.lines[idx].width = width
}

function getLineWidth(idx) {
    return gMeme.lines[idx].width
}

function addLine() {
    if (gMeme.lines.length < maxLine) {
        gMeme.lines.push({
            txt: 'Add Text Here',
            size: 45,
            color: 'white',
            pos: { x: 50, y: (gMeme.lines.length + 1) * 50 },
            width: 0
        })
    }
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.selectedLineIdx) gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}


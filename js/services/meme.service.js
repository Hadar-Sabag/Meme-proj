'use strict'
let gNextId = 1
let maxLine = 7
const gKeyWords = ['funny', 'animal', 'angry', 'awkward', 'politics']
let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['angry', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animal'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['awkward'] },
    { id: 10, url: 'img/10.jpg', keywords: ['angry'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['angry', 'politics'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny'] }
]

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
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
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

function deleteLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
    renderMeme()
}


function _creatImg() {
    return { id: gNextId++, url: `img/${gNextId++}.jpg`, keywords: ['funny', 'cat'] }
}


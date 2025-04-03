'use strict'

let maxLine = 7
let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }
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
            color: 'white'
        }
    ]
}

function setLineTxt(txt) {
    gMeme.lines.map(line => line.txt = txt)
}

function addLine() {
    if (gMeme.lines.length < maxLine) {
        gMeme.lines.push({
            txt: 'Add Text Here',
            size: 45,
            color: 'white'
        })
    }
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.selectedLineIdx) gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx === maxLine) gMeme.selectedLineIdx = 0
}


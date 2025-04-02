'use strict'

let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }
]

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 20,
            color: 'white'
        },
        {
            txt: 'Add Text Here',
            size: 20,
            color: 'white'
        }
    ]

}
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgMeme() {
    return gImgs.find(img => +gMeme.selectedImgId === img.id)
}

function setImgId(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.lines = [
        {
            txt: 'Add Text Here',
            size: 45,
            color: 'white'
        }
    ]
}

function setLine(txt) {
    gMeme.lines[0].txt = txt
}

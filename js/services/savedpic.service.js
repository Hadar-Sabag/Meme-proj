'use strict'

const STORAGE_KEY = 'picDB'

var gPics = loadFromStorage(STORAGE_KEY) || []

function getPics() {
    return gPics
}

function removePic(picId) {
    const picIdx = gPics.findIndex(pic => picId === pic.id)
    if (picIdx !== -1) gPics.splice(picIdx, 1)

    _savePicsToStorage()
}

function addPic(imgUrl) {
    var pic = _createPic(imgUrl)
    gPics.unshift(pic)

    _savePicsToStorage()
    return pic
}

function getPicById(picId) {
    return gPics.find(pic => picId === pic.id)
}

function _createPic(imgUrl) {
    return {
        id: makeId(),
        imgUrl
    }
}

function _savePicsToStorage() {
    saveToStorage(STORAGE_KEY, gPics)
}

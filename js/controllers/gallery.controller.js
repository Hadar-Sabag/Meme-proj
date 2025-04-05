'use strict'

let gFilterBy

function renderGallery() {
    const imgs = getImgs()
    let strHTMLs = imgs.map(img =>
        `<img src="${img.url}" onclick="onImgSelect('${img.id}')">`)
    document.querySelector('.pic-gallery').innerHTML = strHTMLs.join('')
}

function onSetFilterBy(elInput) {
    const filterBy = elInput.value
    setFilterBy(filterBy)
    renderGallery()
}




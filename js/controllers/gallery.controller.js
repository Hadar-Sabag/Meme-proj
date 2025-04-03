'use strict'

function renderGallery() {
    let imgs = gImgs
    let strHTMLs = imgs.map(img =>
        `<img src="${img.url}" onclick="onImgSelect('${img.id}')">`)
    document.querySelector('.pic-gallery').innerHTML = strHTMLs.join('')
}
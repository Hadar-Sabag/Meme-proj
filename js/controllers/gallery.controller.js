'use strict'

function renderGallery() {
    let imgs = gImgs
    let strHTMLs = imgs.map(img =>
        `<img src="${img.url}" onclick="onImgSelect('${img.id}')">`)
    document.querySelector('.pic-gallery').innerHTML = strHTMLs.join('')
}

// function filterGalleryByKeyword(keyword) {
//     const filteredImgs = gImgs.filter(img => img.keywords.includes(keyword.toLowerCase()))
//     renderImgs(filteredImgs)
// }

// function renderImgs(imgs) {
//     const galleryContainer = document.querySelector('.pic-gallery')
//     galleryContainer.innerHTML = ''

//     imgs.forEach(img => {
//         const imgElement = document.createElement('img')
//         imgElement.src = img.url
//         imgElement.alt = img.keywords.join(', ')
//         imgElement.onclick = () => onImgSelect(img.id)
//         galleryContainer.appendChild(imgElement)
//     })
// }

// function handleSearchInput(event) {
//     const selectedKeyword = event.target.value.toLowerCase()
//     const filteredImgs = selectedKeyword && gKeyWords.includes(selectedKeyword)
//         ? gImgs.filter(img => img.keywords.includes(selectedKeyword))
//         : gImgs
//     renderImgs(filteredImgs)
// }

// document.getElementById('searchInput').oninput = handleSearchInput



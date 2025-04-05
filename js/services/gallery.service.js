'use strict'

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function getImgs() {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img =>
        img.keywords.some(keyword => keyword.toLowerCase().includes(gFilterBy.toLowerCase()))
    )
}

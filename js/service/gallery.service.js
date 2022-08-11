'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['famous', 'fingers', 'smile'] },
    { id: 2, url: 'img/2.jpg', keywords: ['love', 'dog', 'two'] },
    { id: 3, url: 'img/3.jpg', keywords: ['sleep', 'dog', 'two'] },
    { id: 4, url: 'img/4.jpg', keywords: ['sleep', 'cat', 'computer'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'sea'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'fingers', 'smile'] },
    { id: 7, url: 'img/7.jpg', keywords: ['eyes', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['eyes', 'smile'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'fingers', 'baby', 'smile', 'sea'] },
    { id: 10, url: 'img/10.jpg', keywords: ['famous', 'funny', 'smile'] },
    { id: 11, url: 'img/11.jpg', keywords: ['love', 'two', 'fight'] },
    { id: 12, url: 'img/12.jpg', keywords: ['fingers', 'you'] },
    { id: 13, url: 'img/13.jpg', keywords: ['movie', 'smile', 'wine'] },
    { id: 14, url: 'img/14.jpg', keywords: ['movie', 'fight'] },
    { id: 15, url: 'img/15.jpg', keywords: ['movie', 'fingers', 'smile'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'smile'] },
    { id: 17, url: 'img/17.jpg', keywords: ['famous', 'fingers', 'two'] },
    { id: 18, url: 'img/18.jpg', keywords: ['movie', 'two', 'smile'] }]

var selectedImgId
var gTagList

function creatTagList() {
    let tagList = {}
    gImgs.forEach(img => img.keywords.forEach(keyword => {
        if (!(keyword in tagList)) tagList[keyword] = getRandomInt(0, 7)
    }))
    gTagList = tagList
}

function getTagsList() {
    return gTagList
}

function addTagClick(keyWord) {
    ++gTagList[keyWord]
}

function getFilterImgs(keyWord){
    return  gImgs.filter(img => img.keywords.some(kw => kw.includes(keyWord)))
}

function getImgs() {
    return gImgs
}

function selectImg(imgId) {
    selectedImgId = imgId
}

function getImgId() {
    return selectedImgId
}


'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 30,
            align: 'center',
            fillColor: '#fefefe',
            strokeColor: '#22252c',
            yPos: 70,
            fontFamily: 'impact'
        }
    ]
}

function getMeme() {
    gMeme.selectedImgId = getImgId()
    return gMeme
}

function getSelectedLine() {    
    return gMeme.lines[gMeme.selectedLineIdx]
}

function editLine(newText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newText
}

function editTextProperties(action) {
    switch (action) {
        case 'increaseFont':
            ++gMeme.lines[gMeme.selectedLineIdx].size
            break;
        case 'decreaseFont':
            --gMeme.lines[gMeme.selectedLineIdx].size
            break;
        case 'alignLeft':
            gMeme.lines[gMeme.selectedLineIdx].align = 'left'
            break;
        case 'alignCenter':
            gMeme.lines[gMeme.selectedLineIdx].align = 'center'
            break;
        case 'alignRight':
            gMeme.lines[gMeme.selectedLineIdx].align = 'right'
            break;
    }
}

function setTextFont(newFont) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = newFont
}

function colorChange(element, newColor) {
    switch (element) {
        case 'stroke':
            gMeme.lines[gMeme.selectedLineIdx].strokeColor = newColor
            break;
        case 'fill':
            gMeme.lines[gMeme.selectedLineIdx].fillColor = newColor
            break;
    }
}

function moveLine(direction) {
    if (gMeme.lines[gMeme.selectedLineIdx].yPos - direction <= 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].yPos - direction >= getMemeHight()) return
    gMeme.lines[gMeme.selectedLineIdx].yPos -= direction
}

function addNewLine() {
    let line =
    {
        txt: '',
        size: 30,
        align: 'center',
        fillColor: '#fefefe',
        strokeColor: '#22252c',
        yPos: 70,
        fontFamily: 'impact'
    }

    if (gMeme.lines.length === 1) line.yPos = getMemeHight() - 50
    if (gMeme.lines.length >= 2) line.yPos = getMemeHight() / 2

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function toggleLine() {
    gMeme.selectedLineIdx = ++gMeme.selectedLineIdx % gMeme.lines.length
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    toggleLine()
}
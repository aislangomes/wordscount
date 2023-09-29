const fn = require('./functions')
const path = require('path')

const myPath = path.join(__dirname, 'legendas')
const symbols = ['.','?','!','-','"','♪','_','<i>','</i>','\r',',','[',']','(',')','...','&']



fn.readDirFolder(myPath)
    .then(fn.filterByExtension('.srt')) 
    .then(fn.readManyFiles)
    .then(fn.mergeContent)
    .then(fn.separeBy('\n'))
    .then(fn.removeBlankLines)
    .then(fn.removeIfIncludes('-->'))
    .then(fn.removeLinesWithNumbers)
    .then(fn.removeSymbols(symbols))
    .then(fn.mergeContent)
    .then(fn.separeBy(' '))
    .then(fn.removeBlankLines)
    .then(fn.removeLinesWithNumbers)
    .then(fn.groupWords)
    .then(fn.arrangeByAttibute('qtt','dsc'))
    .then(console.log) 

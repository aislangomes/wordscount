const fs = require('fs')
const path = require('path')

function readDirFolder(myPath) {
  return new Promise((resolve, reject) => {
    try{
      const myArchives = fs.readdirSync(myPath)
    resolve(myArchives.map(archive => path.join(myPath, archive)))
    } catch (err){
      reject(err)
    }
  })
}

function filterByExtension(extension) {
  return function(array){
    return array.filter(str => str.includes(extension))
  }
}

function readFile(value){
  return new Promise((resolve,reject) => {
    try{
      const content = fs.readFileSync(value)
      resolve(content.toString())
    }catch(e){
      reject(e)
    }
  })
}

function readManyFiles(path){
  return Promise.all(path.map(path => readFile(path)))
}

function removeIfIncludes(include){
  return function(lines){
    return lines.filter(value => !value.includes(include))
  }
}

function removeBlankLines(array){
  return array.filter(el => el.trim())
}

function removeLinesWithNumbers(array){
  return array.filter(el => {
    const num = parseInt(el.trim())
    return num !== num
  })
}

function removeSymbols(symbols){
  return function(array){
    return array.map(el => {
      return symbols.reduce((acc, symbol) => {
        return acc.split(symbol).join('')
      }, el)
    })
  }
}

function breakLines(inputArray){
  return inputArray.join(' ').split('\n')
}

const mergeContent = content => content.join(' ')
const separeBy = (el) => {
  return array => array.split(el)
}

function groupWords(array){
  return Object.values(array.reduce((group, word) => {
      const letter = word.toLowerCase()
      const qtt = group[letter] ? group[letter].qtt + 1 : 1
      group[letter]={element: letter, qtt}
      return group
  }, {}))
}

function arrangeByAttibute(attr, arg = 'asc'){
  return function(array){
    const asc = (o1, o2) => o1[attr] - o2[attr]
    const dsc = (o1, o2) => o2[attr] - o1[attr]
    return array.sort(arg === 'asc' ? asc : dsc)
  }
}

module.exports = {
  readDirFolder,
  filterByExtension,
  readFile,
  readManyFiles,
  removeIfIncludes,
  removeBlankLines,
  removeLinesWithNumbers,
  removeSymbols,
  breakLines,
  mergeContent,
  separeBy,
  groupWords,
  arrangeByAttibute
}

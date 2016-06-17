//mock player data
//possible qualities are: red, yellow, blue, green, circle, square, triangle
//qualities are not separated by type

const utils = require('./utils')

var player = [
  {quality: 'red', value: 10},
  {quality: 'blue', value: 2},
  {quality: 'circle', value: 3},
  {quality: 'square', value: 8}
  ]
  

function record (quality){
  console.log('PROCESSING ' + quality)
    if (quality === undefined){
      return
    }
    else if (player[quality.name]){
      player[quality.name] += quality.value
    }
    else player.push(quality)
  }
  console.log('PLAYER UPDATED: ' + player)

module.exports = record

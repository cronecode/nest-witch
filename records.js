//mock player data
//possible qualities are: red, yellow, blue, green, circle, square, triangle
//qualities are not separated by type


var player = [
  {quality: 'red', value: 10},
  {quality: 'green', value: 2},
  {quality: 'circle', value: 3},
  {quality: 'square', value: 8}
  ]


function record (quality){
  if (quality.name === ''){
    return
  }
  var exists = player.filter((item) => {
    return item.quality === quality.name
  })
  if (exists.length === 0) {
    player.push(quality)
    console.log('UPDATE: player has quality ' + quality.name)
  } else {
      player.forEach((item) => {
        if (item.quality === quality.name) {
          quality.value = Number(quality.value)
          item.value += quality.value
          console.log('UPDATE: ' + item.quality + ' is now ' + item.value)
        }

    })
  }

}

module.exports = record

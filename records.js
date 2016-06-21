var player = require ('./player')

function record (quality){
  if (quality.name === ''){
    return
  }
  var exists = player.pattern.filter((item) => {
    return item.quality === quality.name
  })
  if (exists.length === 0) {
    player.pattern.push(quality)
    console.log('UPDATE: player has quality ' + quality.name)
  } else {
      player.pattern.forEach((item) => {
        if (item.quality === quality.name) {
          quality.value = Number(quality.value)
          item.value += quality.value
          console.log('UPDATE: ' + item.quality + ' is now ' + item.value)
        }

    })
  }

}

module.exports = record

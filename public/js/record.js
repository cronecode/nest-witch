
//pattern: {quality: 'name', value: number}
//played: 'episodeName'

var pattern = [{quality: 'blue', value: 30}, {quality: 'red', value: 80}]

var played = ['first']

function record (quality, pattern){
    
    var exists = pattern.filter((item) => {
        return item.quality === quality.name
    })
    if (exists.length === 0){
        pattern.push(quality)
        console.log('QUALITY ACQUIRED: ' + quality.name)
    } else {
        pattern.forEach((item) => {
            if (item.quality === quality.name){
                quality.value = Number(quality.value)
                item.value += quality.value
                console.log('PLAYER IS MORE ' + item.quality + 'THAN EVER')
            }
        })
    }
    return pattern
}


//called if !localStorage
function init (){
    var player = {
        pattern: []

    }
}


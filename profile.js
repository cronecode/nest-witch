var classHash = {
    arch: [
        'you are the HYSTERARCH ASCENDING (the autocrypt)',
        'you are the HYSTERARCH DESCENDING (the least queen)',
        'secondary arch thing'
    ],
    naut: [
        'you are the SANGUINAUT ASCENDING (the lover superior)',
        'you are the SANGUINAUT DESCENDING (the contragloss)' ,
        'secondary naut thing'
    ],
    necro: [
        'you are the NECRONAUT ASCENDING (the metacide)',
        'you are the NECRONAUT DESCENDING (the uxorist)',
        'secondary necro thing'
    ],
    cata: [
        'you are the CATAMORPH ASCENDING (the psychoscope)',
        'you are the CATAMORPH DESCENDING (the bathyplasm)',
        'secondary cata thing'
    ]
}

var equipList = {
    crown: 'wearing the piss crown',
    porn: 'slick with porn blood',
    cross: 'bearing the body cross',
    candy: 'full of scream candy'
}

function primary(sorted){
    if (sorted[0].value - sorted[1].value >= 10){
            var i = 0
        } else {
            var i = 1
        }
    console.log(i)
    var p = sorted[0].name
    var text = classHash[p][i]
    console.log(text)
}

function secondary(sorted){
    var s = sorted[1].name
    var text = classHash[s][2]
    console.log(text)
}

function wearables(equipped){
    equipped.forEach((item) =>{
        var text = equipList[item]
        console.log(text)
    })
}

exports.print = (pattern, equipped) =>{
    var sorted = pattern.sort(function(a,b){
        if (a.value > b.value){
            return -1
        }
        if (a.value < b.value){
            return 1
        }
        return 0
    })
    primary(sorted)
    secondary(sorted)
    wearables(equipped)
}
var episodeIndex = require('./episodeIndex.js')
var playerData = require('./records.js')

//sort player data by value (ascending)
var p = playerData.sort(function(a,b){
    if (a.value > b.value){
        return 1
    }
    if (a.value < b.value){
        return -1
    }
    return 0
})

//calculate quartiles for player data

function getQuartiles(arr){
    var last = arr.length - 1
    var q0 = arr[0].value
    var q4 = arr[last].value
    var diff = q4 - q0
    console.log(diff)
    var q1 = diff / 4
    var q2 = q1 * 2
    var q3 = q1 * 3
    return([q0, q1, q2, q3, q4])
}

var q = getQuartiles(p)

//using quartiles as break points,
//sort player data by rank

function rank(arr, q){
    var r1 = []
    var r2 = []
    var r3 = []
    var r4 = []
    each (item in arr)
        if (item.value >= q[3]){
            r1.push(item)
        } else if (item.value >= q[2]){
            r2.push(item)
        } else if (item.value >= q[1]) {
            r3.push(item)
        } else {
            r4.push(item)
        }
    return([r1, r2, r3, r4])
}

var r = rank(p, q)

//get the subset of episodes whose primary quality
//matches any of the player's top-ranking qualities

var r1 = r[0]

var e = filterEpisodes(r1, episodeIndex, 0)

function filterEpisodes(r, arr, i){
    var filtered = arr.filter(function(item){
        return r.indexOf(item.pattern[i]) > -1
    })
    if (filtered.length = 1) {
        return filtered[0]
    } else {
        var arr = filtered
        var i = i + 1
        //repeat... seems like this should be in a do...while loop?
    }
}

//if more than one episode matches,
//get the subset of episodes whose secondary quality
//matches any of the player's top-ranking qualities,
//and so on

//if there is sill more than one match after comparing
//all the episode qualities,
//repeat this process for the player's second-rank qualities,
//then third, then fourth,
//and after that just choose randomly between matches

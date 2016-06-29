"use strict";

const utils = require('./utils')
const episodes = require('./episodeIndex')
// Returns an array of objects
// { name: episodeName, score: episodeScore }
// where score is the episodes match rating.
// Result is in the same order as the supplied episodes.
function calculateEpisodeScores(player, episodes) {
    return episodes.map((episode, index, episodeArr) => {
        let score = 0
        player.forEach((item) => {
            if (utils.arrContains(episode.pattern, item.name)) {
                score += item.value
            }
        })
        return {
            name: episode.name,
            score: score
        }
    })
}

//network HANGS when included.length === 1
function excludePlayed(played, episodes) {
    let included = []
    episodes.forEach((item) => {
        if (!utils.arrContains(played, item.name)){
            included.push(item)
            console.log(item.name + ' included!')
        }
    })
   //server will hang if player clicks 'refine' after playing every episode
   //todo: fix this!
    if (included.length === 0 ) {
        included = episodes
    }
    return included
}

// Randomly selects episode
// Episodes with closer match to player
// will be more likely to be selected
// returns episode name
// This approach can return any episode
// but is more likely to return episodes with closer match to player
exports.match = (player, played) => {
    console.log(episodes)
    console.log(played)
    let episodePool = excludePlayed(played, episodes)
    if (episodePool.length === 1) {
        let episode = episodePool[0]
        return episode.name
    }
    let episodeScores = calculateEpisodeScores(player, episodePool)
    let scores = {}
    for (let i = 0; i < episodeScores.length; i++) {
        scores[episodeScores[i].name] = 0
    }
    while(true) {
        let randomIndex = Math.floor( Math.random() * episodeScores.length )
        let episode = episodeScores[randomIndex]
        scores[episode.name] += episode.score || 1
        if (scores[episode.name] >= 100) {
            return episode.name

        }
    }
}
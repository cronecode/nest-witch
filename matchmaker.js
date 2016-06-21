"use strict"

const utils = require('./utils')
const player = require('./player')

// Returns an array of objects
// { name: episodeName, rank: episodeScore }
// where score is the episodes match rating.
// Result is in the same order as the supplied episodes.
function calculateEpisodeScores(player.pattern, episodes) {
    return episodes.map((episode, index, episodeArr) => {
        let score = 0
        player.pattern.forEach((item) => {
            if (utils.arrContains(episode.pattern, item.quality)) {
                score += item.value
            }
        })
        return {
            name: episode.name,
            score: score
        }
    })
}

// Randomly selects episode
// Episodes with closer match to player
// will be more likely to be selected
// returns episode name
// This approach can return any episode
// but is more likely to return episodes with closer match to player
exports.match = (player.pattern, episodes) => {
    let episodeScores = calculateEpisodeScores(player.pattern, episodes)
    let scores = {}
    while(true) {
        let randomIndex = Math.floor( Math.random() * episodeScores.length )
        let episode = episodeScores[randomIndex]
        if (!scores[episode.name]) {
            scores[episode.name] = 0
        }
        scores[episode.name] += episode.score
        if (scores[episode.name] >= 100) {
            return episode.name
        }
    }
}

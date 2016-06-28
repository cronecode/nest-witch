"use strict";

const utils = require('./utils')

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

// Randomly selects episode
// Episodes with closer match to player
// will be more likely to be selected
// returns episode name
// This approach can return any episode
// but is more likely to return episodes with closer match to player
exports.match = (player, episodes) => {
    // if player.qualities is undefined load return random episode?

    let episodeScores = calculateEpisodeScores(player, episodes)
    let scores = {}
    for (let i = 0; i < episodeScores.length; i++) {
        scores[episodeScores[i].name] = 0
    }
    while(true) {
        let randomIndex = Math.floor( Math.random() * episodeScores.length )
        let episode = episodeScores[randomIndex]
        scores[episode.name] += episode.score || 1
        if (scores[episode.name] >= 100) {
            current = episode.name
            return current

        }
    }
}
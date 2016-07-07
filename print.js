"use strict"

function mapInfluence (blueprint){
        var demons = [
                {name: 'abaddon', domains: ['swan pit', 'void deck', 'frigidarium'], score: 0}, 
                {name: 'belial', domains: ['bear pit', 'wine cellar', 'caldarium'], score:0}, 
                {name: 'beelzebub', domains: ['snake pit', 'root cellar', 'tepidarium'], score: 0}
                ]
        return demons.map((demon, index, demonArr) =>{
                let score = 0
                blueprint.forEach((item) =>{
                        if (demon.domains.indexOf(item.name) > -1){
                                score++
                        }
                })
                return {
                        name: demon.name,
                        score: score
                }
        })        
}


exports.ruler = (blueprint) =>{
        var mapped = mapInfluence(blueprint)
        var sorted = mapped.sort(function(a,b){
                if (a.score > b.score){
                        return -1
                }
                if (a.score < b.score){
                        return 1
                }
                return 0
        })
        var name = sorted[0].name
        var titles = {
                abaddon: 'ABADDON, destroyer, the necropath',
                belial: 'BELIAL, idolator, the hysterarch',
                asmodeus: 'ASMODEUS, seducer, the sanguinaut',
                beelzebub: 'BEELZEBUB, polluter, the catamorph'
        }
        var message = titles[name]
        return message
}



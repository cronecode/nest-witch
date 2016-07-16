var room = {
    scenes: [
        {
            id: 0,
            description: 'You catch your breath; the sun is rising, and the dewy hills sparkle like the residue of an arts-and-crafts orgy. You then realize that a backlit figure you had taken for a lawn sculpture is rapidly advancing. Is that a goddamn <red>UNICORN</red>?'
        },
        {
            id: 1,
            description: 'As the silouette draws closer, you see that it isn\'t a unicorn at all, but no less majestic; it is in fact Heart of Darkness cosplayer Vladimir Putin, shirtless, on <red>HORSEBACK</red>, and brandishing a spear.'
        },
        {
            id: 2
        }
    ],
    interactions: {
        unicorn: {
            message: 'Are you going to stick around to find out?',
            choices: [
                {
                    option: 'a',
                    description: 'You\'re already gathering flowers with which to braid its unicorn-ass hair.',
                    move: {
                        room: 'TERRACE',
                        scene: 1
                    }
                },
                {
                    option: 'b',
                    description: 'Nope. HARD pass on this Snow White shit.',
                    move: {
                        room: 'exit'
                    }
                }
            ]
        },
        horseback: {
            message: 'He dismounts and walks the horse within your reach. "Do you like animals?" he says, glistening.',
            choices: [
                {
                    option: 'a',
                    description: '"Yes." (Consummate your new relationship with Vladimir "definitely not Rasputin" Putin)',
                    move: {
                        room: 'end',
                        scene: 8,
                        ending: 'At the point of (his) climax, the president impales you on the spear. In hindsight, it seems perfectly natural that he should kill his mates and take their power.'
                    }
                },
                {
                    option: 'b',
                    description: '"No." (Risk the president\'s wrath)',
                    move: {
                        room: 'end',
                        scene: 8,
                        ending: 'He impales you immediately, and for some reason sings "the horse is a noble creature" in a horrible minor key over and over while you die.'
                    }
                }
                
            ]
        }
    }
}

module.exports = room
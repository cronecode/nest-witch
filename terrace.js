var room = {
    scenes: [
        {
            id: 0,
            description: 'You catch your breath; the sun is rising, and the dewy hills sparkle like the residue of an arts-and-crafts orgy. You then realize that a backlit figure you had taken for a lawn sculpture is rapidly advancing. Is that a goddamn <red>UNICORN</red>?'
        },
        {
            id: 1,
            description: 'As the silouette draws closer, you see that it isn\'t a unicorn at all, but no less majestic; it is in fact anthropomorphized hard-on Vladimir Putin, shirtless, on horseback, and brandishing a spear.'
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
        }
    }
}

module.exports = room
var room = {
    scenes: [
        {
            id: 0,
            description: 'You gather your tactical equipment – clear eyes, full heart, rolled napkin – and climb onto the dining table. The sadistic housefly responsible for the <red>SOUND</red> circles you, waiting.'
        }
    ],
    interactions: {
        sound: {
            message: 'MAKE IT STOP',
            choices: [
                {
                    option: 'a',
                    description: 'GTFO',
                    move: {
                        room: 'exit'
                    }
                },
                {
                    option: 'b',
                    description: 'Launch yourself straight at the foul beast! He\'ll never see it coming.',
                    move: {
                        room: 'end',
                        scene: 2
                    }
                }
            ]
        }
    }
}

module.exports = room
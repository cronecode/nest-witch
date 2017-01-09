var room = {
    scenes: [
        {
            id: 0,
            description: 'The fluorescent track lighting shatters ecstatically and the room lurches into ultraviolet, revealing a rash of neon pentagrams covering the walls and ceiling. There is also evidence of someone with cloven hooves having been very careless and tracked blood, on more than one occasion, over to the <red>DOOR</red> on the other side of the room.'
        }
    ],
    interactions: {
        door: {
            message: 'Seriously?',
            choices: [
                {
                    option: 'a',
                    description: 'Like a lamb to slaughter',
                    lock: {
                        name: 'POWDER ROOM',
                        flag: false
                    },
                    move: {
                        room: 'POWDER ROOM',
                        scene: 0
                    }
                },
                {
                    option: 'b',
                    description: 'Maybe not',
                    move: {
                        room: 'exit'
                    }
                }
            ]
        }
    }
}

module.exports = room
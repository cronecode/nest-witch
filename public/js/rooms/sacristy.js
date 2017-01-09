var room = {
    scenes: [
        {
            id: 0,
            description: 'The sacristy contains a half-dozen Barbie Dream Churches, all of which are home to delicious Catholic tchochkes (i.e. the <red>LORD</red>).'
        }
    ],
    interactions: {
        lord: {
            message: 'You know precisely how to nourish your soul.',
            choices: [
                {
                    option: 'a',
                    description: 'Eat the Eucharist, which is the literal body of Christ',
                    move: {
                        room: 'SACRISTY',
                        scene: 0
                    }
                },
                {
                    option: 'b',
                    description: 'Eat the Eucharist, which is the body of Christ in spirit',
                    move: {
                        room: 'SACRISTY',
                        scene: 0
                    }
                },
                {
                    option: 'c',
                    description: 'Hail Satan',
                    lock: {
                        name: 'SHRINE',
                        flag: false
                    },
                    move: {
                        room: 'SHRINE',
                        scene: 0
                    }
                }

            ]
        }
    }

}

module.exports = room
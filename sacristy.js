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
                        scene: 1
                    }
                },
                {
                    option: 'b',
                    description: 'Eat the Eucharist, which is a symbolic representation of the body of Christ',
                    move: {
                        room: 'SACRISTY',
                        scene: 2
                    }
                },
                {
                    option: 'c',
                    description: 'Hail Satan',
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
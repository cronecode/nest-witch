var room = {
    scenes: [
        {
            id: 0,
            description: 'The sacristy contains a half-dozen Barbie Dream Churches, all of which are home to delicious Catholic tchochkes (i.e. the LORD).'
        }
    ],
    interactions: {
        lord: {
            message: 'something...',
            choices: [
                {
                    option: 'a',
                    description: 'Eat the Eucharist, which is the literal body of Christ',
                    move: {
                        room: 'sacristy',
                        scene: 1
                    }
                },
                {
                    option: 'b',
                    description: 'Eat the Eucharist, which is the figurative representation of the body of Christ',
                    move: {
                        room: 'sacristy',
                        scene: 2
                    }
                },
                {
                    option: 'c',
                    description: 'Hail Satan',
                    move: {
                        room: 'shrine',
                        scene: 0
                    }
                }

            ]
        }
    }

}
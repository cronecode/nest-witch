var room = {
    scenes: [
        {
            id: 0,
            description: 'At the centre of the labyrinth lies an Abercrombie-looking fuck called <red>CHAD</red> is here, spread-eagled on the bed and proudly naked.'
        }
    ],
    interactions: {
        chad: {
            message: 'He is the color of a sugar-dusted crepe and probably tastes just as good. Afterwards, of course, he will want to read to you aloud from his new favorite book, ATLAS SHRUGGED.',
            choices: [
                {
                    option: 'a',
                    description: 'Engage in enthusiastic carnal relations with Chad',
                    move: {
                        room: 'end',
                        scene: 7,
                        ending: 'It takes him four days to finish the book, but mercifully you are able to cut off your own head long before then.'
                    }
                },
                {
                    option: 'b',
                    description: 'Engage in reluctant but seemingly necessary carnal relations with Chad',
                    move: {
                        room: 'end',
                        scene: 7,
                        ending: 'It takes him four days to finish the book, but mercifully you are able to cut off your own head long before then.'
                    }
                },
                {
                    option: 'c',
                    description: 'Resist the sticky temptations of the so-called Chad',
                    lock: {
                        name: 'LABYRINTH',
                        flag: true
                    },
                    move: {
                        room: 'exit'
                    }
                }
            ]
        }
    }
}

module.exports = room
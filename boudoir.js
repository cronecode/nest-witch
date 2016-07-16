var room = {
    scenes: [
        {
            id: 0,
            description: 'You walk into the boudoir and your mouth fills with silk. An Abercrombie-looking fuck called <red>CHAD</red> is here, spread-eagled on the bed and proudly naked.'
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
                        scene: 0,
                        ending: 'It takes him four days to finish the book, but mercifully you are able to slit your wrists long before then.'
                    }
                },
                {
                    option: 'b',
                    description: 'Engage in reluctant but seemingly necessary carnal relations with Chad',
                    move: {
                        room: 'end',
                        scene: 0,
                        ending: 'It takes him four days to finish the book, but mercifully you are able to slit your wrists long before then.'
                    }
                },
                {
                    option: 'c',
                    description: 'Resist the sticky temptations of the so-called Chad',
                    lock: {
                        name: 'LABYRINTH',
                        flag: false
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
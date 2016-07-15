var room = {
    scenes: [
        {
            id: 0,
            description: 'You walk into the boudoir and your mouth fills with silk. An Abercrombie-looking fuck called <red>CHAD</red> is here, spread-eagled on the bed and proudly naked.'

        }
    ],
    interactions: {
        chad: {
            message: 'He is the color of a sugar-dusted crepe and probably tastes just as good. Afterwards, of course, he will want to read aloud to you from his new favorite book, THE FOUNTAINHEAD.',
            choices: [
                {
                    option: 'a',
                    description: 'Engage in enthusiastic carnal relations with Chad',
                    move: {
                        room: 'boudoir',
                        scene: 1
                    }
                },
                {
                    option: 'b',
                    description: 'Engage in reluctant but seemingly necessary carnal relations with Chad',
                    move: {
                        room: 'boudoir',
                        scene: 1
                    }
                },
                {
                    option: 'c',
                    description: 'Resist the sticky temptations of this so-called Chad'
                }
            ]
        }
    }
}
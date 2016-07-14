var room = {
    scenes: [
        {
            id: 0,
            description: 'The <red>SOUND</red> is irritating, certainly, but easily dampened by a few more glasses of the daring Shiraz. Your fellow diners have tastefully fainted into their appetizers.'
        }
    ],
    interactions: {
        sound: {
            message: 'Shrill. Grating. Insistent.',
            choices: [
                {
                    option: 'a',
                    description: 'Ignore it.',
                    move: {
                        room: 'torture-chamber',
                        scene: 0
                    }
                },
                {
                    option: 'b',
                    description: 'Roll up your napkin. This ends now.',
                    move: {
                        room: 'thunderdome',
                        scene: 0
                    }
                }
            ]
        }
    }
}

module.exports = room
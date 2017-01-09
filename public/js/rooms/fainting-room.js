var room = {
    scenes: [
        {
            id: 0,
            description: 'The <red>SOUND</red> is irritating, certainly, but easily dampened by a few more glasses of the cheeky Shiraz. Your fellow diners have tastefully fainted into their appetizers.'
        }
    ],
    interactions: {
        sound: {
            message: 'Shrill. Grating. Insistent.',
            choices: [
                {
                    option: 'a',
                    description: 'DRINKING. GO AWAY.',
                    lock: {
                        name: 'TORTURE CHAMBER',
                        flag: false
                    },
                    move: {
                        room: 'TORTURE CHAMBER',
                        scene: 0
                    }
                },
                {
                    option: 'b',
                    description: 'Roll up a magazine. And your sleeves. And the rim. This ends now.',
                    lock: {
                        name: 'THUNDERDOME',
                        flag: false
                    },
                    move: {
                        room: 'THUNDERDOME',
                        scene: 0
                    }
                }
            ]
        }
    }
}

module.exports = room
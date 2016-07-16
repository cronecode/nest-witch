var room = {
    scenes: [
        {
            id: 0,
            description: 'The SOUND shakes the foundation of your very soul. You press your hands against your ears and howl pitifully. Your dessert course is entirely untouched.'
        }
    ],
    interactions: {
        sound: {
            message: 'Piercing. Shrieking. Hideous!',
            choices: [
                {
                    option: 'a',
                    description: 'This seems like a good time to disengage.',
                    lock: {
                        name: 'DINING ROOM',
                        flag: true
                    },
                    move: {
                        room: 'exit'
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
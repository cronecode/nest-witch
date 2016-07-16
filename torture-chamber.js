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
                    move: {
                        room: 'exit'
                    }
                },
                {
                    option: 'b',
                    description: 'Get a magazine. This ends here.',
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
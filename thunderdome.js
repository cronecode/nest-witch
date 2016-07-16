var room = {
    scenes: [
        {
            id: 0,
            description: 'You gather your tactical equipment -– clear eyes, full heart, respected German publication BUNTE (October issue, 2006, cover: Madonna, headline: \'Drama um ihr adoptiertes Baby\') –- and climb onto the dining table. The sadistic housefly responsible for the <red>SOUND</red> circles you, screaming like a very small banshee.'
        }
    ],
    interactions: {
        sound: {
            message: 'MAKE IT STOP',
            choices: [
                {
                    option: 'a',
                    description: 'Okay, THIS seems like a good time to disengage.',
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
                    description: 'It\'s on the chandelier! It\'s fatigued! A heroic leap is just the thing!',
                    move: {
                        room: 'end',
                        scene: 2,
                        ending: 'The fly blinks-- wait, that\'s not right, flies don\'t-- and your body turns inside out and splits like a cooked peach.'
                    }
                }
            ]
        }
    }
}

module.exports = room
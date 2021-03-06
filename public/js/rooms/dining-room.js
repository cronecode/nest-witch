var room = {
    scenes: [
        {
            id: 0,
            description: 'The dining room comprises a massive communal <red>TABLE</red> long enough to seat forty guests. At the head and foot of this table are two rather tense-looking persons; their utensils stick up from clenched fists, and their food is untouched.'
        },
        {
            id: 1,
            description: 'You tuck the heavy cloth napkin into the collar of your shirt and scoot your chair a little closer to the table, smiling at each of your fellow diners in turn. Neither meets your gaze; their eyes dart around the room, both tracking the same unseen <red>THING.</red>'
        },
        {
            id: 2,
            description: 'With your gizzard full of sweetbreads, you hardly notice the <red>SOUND</red> at all. Your fellow <red>DINERS,</red> though, are looking quite peaky.'
        }
    ],
    interactions: {
        table: {
            message: 'Only one other place setting has been laid out, roughly equidistant from either member of this vivacious pair.',
            choices: [
                {
                    option: 'a',
                    description: 'Join the party',
                    move: {
                        room: 'DINING ROOM',
                        scene: 1
                    }
                },
                {
                    option: 'b',
                    description: 'No thanks',
                    move: {
                        room: 'DINING ROOM',
                        scene: 0
                    }
                }
            ]
        },
        thing: {
            message: 'You become dimly aware of a constant buzz Dopplering around the room.',
            choices: [
                {
                    option: 'a',
                    description: 'NOT THE BEES',
                    move: {
                        room: 'DINING ROOM',
                        scene: 0
                    }
                },
                {
                    option: 'b',
                    description: 'Whatever, leave me alone, I\'m eating',
                    move: {
                        room: 'DINING ROOM',
                        scene: 2
                    }
                }
            ]
        },
        diners: {
            message: 'Have they been holding their breath this whole time?',
            choices: [
                {
                    option: 'a',
                    description: 'Yes',
                    lock: {
                        name: 'FAINTING ROOM',
                        flag: false
                    },
                    move: {
                        room: 'FAINTING ROOM',
                        scene: 0
                    }
                },
                {
                    option: 'b',
                    description: 'No',
                    move: {
                        room: 'DINING ROOM',
                        scene: 2
                    }
                }
            ]
        },
        sound: {
            message: 'Shrill. Grating. Insistent.',
            choices: [
                {
                    option: 'a',
                    description: 'EATING.',
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
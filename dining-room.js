var room = {
    scenes: [
        {
            id: 0,
            description: 'The dining room comprises a massive communal TABLE, long enough to seat forty guests. At the head and foot of this table are two rather tense-looking persons; their utensils stick up from clenched fists, and their food is untouched.'
        },
        {
            id: 1,
            description: 'You tuck the heavy cloth napkin into the collar of your shirt and scoot your chair a little closer to the table, smiling at each of your fellow diners in turn. Neither meets your gaze; their eyes dart around the room, both tracking the same unseen THING.'
        },
        {
            id: 2,
            description: 'With your mouth full of gloriously fluffy bread, you hardly notice the SOUND at all. Your fellow DINERS, though, are looking quite peaky.'
        }
    ],
    interactions: {
        table: {
            message: 'Only one other place setting has been laid out, roughly equidistant from either member of this vivacious pair.',
            choices: [
                {
                    option: 'a',
                    description: 'Join the party',
                    action: function(){
                        this.commands.enter('dining room', 1)
                    }
                },
                {
                    option: 'b',
                    description: 'Never mind',
                    action: function(){
                        this.commands.enter('dining room', 0)
                    }
                }
            ]
        },
        thing: {
            message: 'You become dimly aware of a constant buzz Dopplering around the room.',
            choices: [
                {
                    option: 'a',
                    description: 'Excuse yourself from the table. You\'ll eat in perfect silence or not at all!',
                    action: function(){
                        this.commands.enter('dining room', 0)
                    }
                },
                {
                    option: 'b',
                    description: 'It\'s just a housefly. Tuck in.',
                    action: function(){
                        this.commands.enter('dining room', 2)
                    }
                }
            ]
        },
        diners: {
            message: 'Have they been holding their breath this whole time?',
            choices: [
                {
                    option: 'a',
                    description: 'Yes.',
                    action: function(){
                        this.commands.enter('fainting room', 0)
                    }
                },
                {
                    option: 'b',
                    description: 'No.',
                    action: function(){
                        this.commands.enter('dining room', 2)
                    }
                }
            ]
        },
        sound: {
            message: 'Shrill. Grating. Insistent.',
            choices: [
                {
                    option: 'a',
                    description: 'Ignore it.',
                    action: function(){
                        this.commands.enter('torture chamber', 0)
                    }
                },
                {
                    option: 'b',
                    description: 'Roll up your napkin.',
                    action: function(){
                        this.commands.enter('thunderdome', 0)
                    }
                }
            ]
        }
    }
}
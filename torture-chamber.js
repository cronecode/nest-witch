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
                    description: 'GTFO',
                    action: function(){
                        this.commands.exit()
                    }
                },
                {
                    option: 'b',
                    description: 'Roll up your napkin. This ends here.',
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
var room = {
    scenes: [
        {
            id: 0,
            description: 'The SOUND is irritating, certainly, but easily dampened by a few more glasses of the daring Shiraz. Your fellow diners have tastefully fainted into their appetizers.'
        }
    ],
    interactions: {
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
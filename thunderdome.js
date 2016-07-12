var room = {
    scenes: [
        {
            id: 0,
            description: 'You gather your tactical equipment – clear eyes, full heart, rolled napkin – and climb onto the dining table. The sadistic housefly responsible for the SOUND circles you, waiting.'
        }
    ],
    interactions: {
        sound: {
            message: 'MAKE IT STOP',
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
                    description: 'Launch yourself straight at the foul beast! He\'ll never see it coming.',
                    action: function(){
                        this.commands.end(2)
                    }
                }
            ]
        }
    }
}

module.exports = room
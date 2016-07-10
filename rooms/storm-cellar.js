var stormCellar = {
    scenes: [
        {
            id: 0,
            description: `'In the centre of the room, the flickering LIGHT at
            the end of a bare wire swings gently. The shelves laid into the walls
            are empty save for one BOX, around which several skeletons are sitting.
            It appears the inhabitants did not successfully ride out the STORM.`
        },
        {
            id: 1,
            description: `'You are plunged into darkness, obviously.
            Where the fuck did that LIGHT go?'`
        }
    ],
    interactions: {
        light: {
            message: 'It\'s your basic on/off-type situation.',
            choices: [
                {
                    option: 'a',
                    description: 'ON',
                    action: function(){
                        goto('storm-cellar', 0)
                    }
                },
                {
                    option: 'b',
                    description: 'OFF',
                    action: function(){
                        goto('storm-cellar', 1)
                    }
                }
            ]
        },
        storm: {
            message: 'How\'s the weather?',
            choices: [
                {
                    option: 'a',
                    description: 'BAD',
                    action: function(){
                        goto('storm-cellar', 0)
                    }
                },
                {
                    option: 'b',
                    description: 'PRETTY NICE ACTUALLY',
                    action: function(){
                        goto('wine-cellar', 0)
                    }
                }
            ]
        },
            box: {
                message: 'It\'s so boxy.',
                choices: [
                {
                        option: 'a',
                        description: 'OPEN IT',
                        action: function(){
                            goto('root-cellar', 0)
                        }
                    },
                    {
                        option: 'b',
                        description: 'MAYBE NOT',
                     action: function(){
                        goto('storm-cellar', 0)
                    }
                }
            ]
        }
    }}

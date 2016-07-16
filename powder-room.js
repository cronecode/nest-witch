var room = {
    scenes: [
        {
            id: 0,
            description: 'Actually, it\'s just a cramped powder room with an ornate <red>MIRROR</red> and an even ornater toilet. You wonder if goat demons are prone to UTIs.'
        },
        {
            id: 1,
            description: 'Bloody <red>MARY</red> answers your call, disembowled; she drags her entrails wetly forward and into the sink. "Come," she burbles, through her toothless liquefying mouth.'
        }
    ],
    interactions: {
        mirror: {
            message: 'What\'s that you keep saying?',
            choices: [
                {
                    option: 'a',
                    description: 'Bloody Mary Bloody Mary Bloody Mary Bloody Mary',
                    move: {
                        room: 'POWDER ROOM',
                        scene: 1
                    }
                },
                {
                    option: 'b',
                    description: 'I have a magnetic and dynamic personality. I have a magnetic and dynamic personality.',
                    move: {
                        room: 'POWDER ROOM',
                        scene: 2
                    }
                }
            ]
        },
        mary: {
            message: 'Just like you wanted!',
            choices: [
                {
                    option: 'a',
                    description: 'Tell her you didn\'t know what you were doing',
                    move: {
                        room: 'end',
                        scene: 9,
                        ending: 'Mary rolls what\'s left of the eyes in her soaking red sockets. In a tone that suggests this is a much-practiced speech, she cites Tercon Contractors Ltd. v British Columbia (Transportation and Highways), in which the Supreme Court summarized the factors to be considered in deciding whether a matter constitutes a call for tenders or a non-binding request for proposals: the formality of the procurement process, whether tenders are solicited, whether--'
                    }
                },
                {
                    option: 'b',
                    description: 'Tell her you changed your mind',
                    move: {
                        room: 'end',
                        scene: 9,
                        ending: 'Mary rolls what\'s left of the eyes in her soaking red sockets. In a tone that suggests this is a much-practiced speech, she cites Tercon Contractors Ltd. v British Columbia (Transportation and Highways), in which the Supreme Court summarized the factors to be considered in deciding whether a matter constitutes a call for tenders or a non-binding request for proposals: the formality of the procurement process, whether tenders are solicited, whether--'
                    }
                }
            ]
        }
    }
}

module.exports = room
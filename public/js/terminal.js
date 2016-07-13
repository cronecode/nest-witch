function Terminal(inputElem, outputElem, options) {
    /* OPTIONS
        {
            commands: [
                {
                    name: "",
                    description: "",
                    action: function() {}
                }
            ]
        }
    */

    var self = this;

    // Private Variables
    var _choices;
    var _audioSource = {
        isPlaying: false
    };
    var formatModifiers = [
        {
            tag: 'b',
            wrapStart: "<b>",
            wrapEnd: "</b>"
        },
        {
            tag: 'r',
            wrapStart: '<span style="color: hotpink">',
            wrapEnd: '</span>'
        }

    ];
    var _manual = {
        clear: "Clears terminal output",
        print: "Prints a message",
        restart: "Restart operating system",
        help: "Lists available commands",
        credits: "Lists all contributors",
        about: "Prints information about the current process",
        date: "Prints the current date",
        sandstorm: "Play Sandstorm by Darude"
    };
    var _commands = {};
    _commands.decide = function(selection) {
        if (!_choices || !selection) return;
        var choice;
        _choices.forEach(function(item) {
            if (item.option === selection) {
                choice = item;
            }
        });
        if (choice) {
            var room = choice.move.room
            var scene = choice.move.scene
            if (room === 'exit'){
                self.commands.exit()
            } else if (room === 'end'){
                self.commands.end(scene)
            } else {
                self.commands.enter(room, scene)
                _commands.setState(self.states.idle);
                _commands.printLineBreak();
            }
        }
    }
    _commands.setState = function(newState) {
        self.state = newState;
        switch(newState) {
            case self.states.idle:
                break;
            case self.states.waiting:
                var choices = _choices.map(function(item) {
                    return item.option + " " + item.description;
                });
                _commands.printList(choices)
                break;
        }
    };
    _commands.error = function(message) {
        self.commands.print("ERROR: " + message);
    };
    _commands.printLineBreak = function() {
        self.commands.print("--------------------------------");     
    };
    _commands.printHeader = function(message) {
        _commands.printLineBreak();
        self.commands.print(message);
        _commands.printLineBreak();
    };
    _commands.printList = function(list) {
        list.forEach(function(value) {
            self.commands.print(value);
        });
    };

    // Public Variables
    self.states = {
        idle: 0,
        waiting: 1
    };
    self.state = self.states.idle;
    self.submit = function() {
        var input = inputElem.value.trim();
        if (!input) return;
        self.input.save(input);
        switch(self.state) {
            case self.states.idle:
                var tokens = input.split(" ");
                var name = tokens.shift()
                var param = tokens.join('-').toLowerCase()
                var command = {
                    name: name,
                    param: param
                };
                if (self.commands[command.name]) {
                    self.commands[command.name](command.param);
                } else {
                    _commands.error("'" + input + "', is not a valid command. Use 'help' to view a list of commands.");
                }
                break;
            case self.states.waiting:
                _commands.decide(input);
                break;
        }        
        self.input.clear();
    };
    self.ask = function(message, choices) {
        _commands.printHeader(message);
        _choices = choices;
        _commands.setState(self.states.waiting);
    };
    self.autocomplete = function() {
        var commands = Object.keys(self.commands);
        var commandStr = commands.join(" ");
        var matches = commandStr.match(new RegExp("\\b" + inputElem.value + "\\w+", "g"));
        if (matches && matches.length === 1) {
            inputElem.value = matches[0];
        }
    };
    self.input = {
        history: [],
        currentHistoryIndex: null,
        clear: function() {
            inputElem.value = "";
        },
        set: function(value) {
            inputElem.value = value;
        },
        save: function(input) {
            self.input.history.push(input);
            self.input.currentHistoryIndex = null;
        },
        prev: function() {
            if (self.input.currentHistoryIndex !== 0 && !self.input.currentHistoryIndex) {
                if (self.input.history.length < 1) return;
                self.input.currentHistoryIndex = self.input.history.length - 1;
            } else if (self.input.currentHistoryIndex > 0) {
                self.input.currentHistoryIndex--;
            }
            self.input.set(self.input.history[self.input.currentHistoryIndex]);
        },
        next: function() {
            if (self.input.currentHistoryIndex !== 0 && !self.input.currentHistoryIndex) return;         
            if (self.input.currentHistoryIndex < self.input.history.length - 1) {
                self.input.currentHistoryIndex++;
            }
            self.input.set(self.input.history[self.input.currentHistoryIndex]);
        },
    };
    self.commands = {
        clear: function() {
            outputElem.innerHTML = "";
        },
        print: function(message) {
            if (!message || !message.trim()) {
                return _commands.error("Missing parameter");
            }                    
            var messageElem = document.createElement("li");
            var output = message;
            // this code is pretty garbage... sorry
            // It doesn't support nested tags (should you an Abstract Syntax Tree)
            formatModifiers.forEach(function(modifier) {
                var replaced = false;
                while (!replaced) {
                    match = new RegExp("\\[" + modifier.tag + "\\>[^\\<\\>\\[\\]]+\\<" + modifier.tag + "\]", ["g"]).exec(output);
                    if (match) {
                        output = output.replace(match[0], modifier.wrapStart + match[0].replace(new RegExp("[\\[\\]\\<\\>]", ["g"]), "") + modifier.wrapEnd);
                    } else {
                        replaced = true;
                    }
                }            
            });
            messageElem.innerHTML = output;
            outputElem.appendChild(messageElem);
            outputElem.scrollTop = outputElem.scrollHeight;
        },
        help: function() {
            var commands = Object.keys(_manual);
            var glossary = commands.map(function(value) {
                return value + " - " + _manual[value];
            })
            glossary.sort();
            _commands.printHeader("Help");
            _commands.printList(glossary);
        },
        credits: function() {
            var credits = [
                "Kristina Born, Code Witch",
                "Liam Atticus Clarke, Programmer and self proclaimed Git Wizard" 
            ];
            _commands.printHeader("Credits");         
            _commands.printList(credits);
        }, 
        about: function() {
            var about = "Traditional home automation systems are bound by the laws of time and space. By invoking dark powers beyond its control, Nest Witch is able to comprehensively align your physical reality with the unique hellscape of your mind."
            _commands.printHeader("About");
            self.commands.print(about);            
        },
        date: function() {
            self.commands.print(new Date().toString());
        },
        end: function(ending){
            $.post('/end', {ending: ending})
                .done(function(data){
                    if (data.status === 200){
                        window.location.href = '/'
                    } else {
                        _commands.error('Ending not found')
                    }
                })
        },
        sandstorm: function() {
            if (!_audioSource.player) {
                _audioSource.player = new Audio('audio/sandstorm.mp3');
            }
            if (!_audioSource.isPlaying) {
                _audioSource.isPlaying = true;
                _audioSource.player.play();
            } else {
                _audioSource.isPlaying = false;
                _audioSource.player.pause();
            }
        }
    };

    // Add custom commands
    if (options.commands) {
        options.commands.forEach(function(command) {
            if (self.commands[command.name]) {
                throw new Error("Command " + command.name + " already exists");
            }
            self.commands[command.name] = command.action.bind(self);
            _manual[command.name] = command.description;
        });
    }
}
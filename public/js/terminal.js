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
    var _manual = {
        restart: "Restart operating system",
        credits: "Lists all contributors",
        about: "Prints information about the current process",
        sandstorm: "Play Sandstorm by Darude"
    };
    self._commands = {};
    self._commands.decide = function(selection) {
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
            console.log('choice ' + scene)
            if (room === 'exit'){
                self.commands.exit()
            } else if (room === 'end'){
                var ending = choice.move.ending
                self.commands.end(scene, ending)
            } else {
                self.commands.enter(room, scene)
                self._commands.setState(self.states.idle);
            }
        }
    }
    self._commands.setState = function(newState) {
        self.state = newState;
        switch(newState) {
            case self.states.idle:
                break;
            case self.states.waiting:
                var choices = _choices.map(function(item) {
                    return item.option + " " + item.description;
                });
                self._commands.printList(choices)
                break;
        }
    };
    self._commands.error = function(message) {
        self.commands.print("ERROR: " + message);
    };
    self._commands.printLineBreak = function() {
        self.commands.print("--------------------------------");     
    };
    self._commands.printHeader = function(message) {
        self._commands.printLineBreak();
        self.commands.print(message);
        self._commands.printLineBreak();
    };
    self._commands.printList = function(list) {
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
                    self._commands.error("'" + input + "', is not a valid command. Use 'help' to view a list of commands.");
                }
                break;
            case self.states.waiting:
                self._commands.decide(input);
                break;
        }        
        self.input.clear();
    };
    self.ask = function(message, choices) {
        self._commands.printHeader(message);
        _choices = choices;
        self._commands.setState(self.states.waiting);
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
                return self._commands.error("Missing parameter");
            }                    
            var messageElem = document.createElement("li");
            message = message.replace(new RegExp("\\<script\\>.+\\<\\script\\>"), "");
            messageElem.innerHTML = message;
            outputElem.appendChild(messageElem);
            outputElem.scrollTop = outputElem.scrollHeight;
        },
        help: function() {
            var commands = Object.keys(_manual);
            var glossary = commands.map(function(value) {
                return value + " - " + _manual[value];
            })
            glossary.sort();
            self._commands.printHeader("Help");
            self._commands.printList(glossary);
        },
        credits: function() {
            var credits = [
                "Kristina Born, Code Witch",
                "Liam Atticus Clarke, Code Wizard" 
            ];
            self._commands.printHeader("Credits");         
            self._commands.printList(credits);
        }, 
        about: function() {
            var about = "Traditional home automation systems are bound by the laws of time and space. By invoking dark powers beyond its control, <red>NEST WITCH</red> is able to comprehensively align your physical reality with the unique hellscape of your mind."
            self._commands.printHeader("About");
            self.commands.print(about);            
        },
        end: function(scene, ending){
            self.commands.print("--------------------------------")
            self.commands.print(ending)
            /*use this if the printer doesn't work
            switch (scene) {
                case 0:
                    self.commands.print('Congratulations! You were devoured by <red>THE SPHINX</red>')
                    break
                case 1:
                    self.commands.print('Congratulations! You were devoured by <red>BEELZEBUB, PRINCE OF HELL</red>')
                    break
                case 2:
                    self.commands.print('Congratulations! You were devoured by <red>[REDACTED]</red>')
                    break
                case 3:
                    self.commands.print('Congratulations! You were devoured by <red>(REALLY) BAD WALLPAPER</red>')
                    break
                case 4:
                    self.commands.print('Congratulations! You were devoured by <red>A HOT CHICK</red>')
                    break
                case 5: 
                    self.commands.print('Congratulations! You were devoured by <red>A POOP JOKE</red>')
                    break
                case 6:
                    self.commands.print('Congratulations! You were devoured by <red>APOLOGETIC CANNIBALS</red>')
                    break
                case 7:
                    self.commands.print('Congratulations! You were devoured by <red>THE MINOTAUR</red>')
                    break
                case 8:
                    self.commands.print('Congratulations! You were devoured by <red>THE UNICORN</red>')
                    break
                case 9:
                    self.commands.print('Congratulations! You were devoured by <red>CANADIAN CONTRACT LAW</red>')
                    break
            */
            $.post('/end', {scene: scene})
                .done(function(data){
                    if (data.status === 200){
                        _commands.printHeader('This tale has come to a close, but your suffering need never end. Use RESTART to try again!')
                    } else {
                        self._commands.error('Ending not found')
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
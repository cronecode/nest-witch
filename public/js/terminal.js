function Terminal(inputElem, outputElem) {
    var self = this;
    var lineBreak = "--------------------------------";
    self.states = {
        idle: 0,
        waiting: 1
    };
    self.state = self.states.idle;
    self.choices;
    self.audioPlayer = {
        isPlaying: false
    };
    self.submit = function() {
        var input = inputElem.value.trim();
        if (!input) return;
        self.input.save(input);
        switch(self.state) {
            case self.states.idle:
                var tokens = input.split(" ");
                var command = {
                    name: tokens[0],
                    param: tokens[1]
                };
                if (self.commands[command.name]) {
                    self.commands[command.name](command.param);
                } else {
                    self.error("'" + input + "', is not a valid command. Use 'help' to view a list of commands.");
                }
                break;
            case self.states.waiting:
                self.decide(input);
                break;
        }        
        self.input.clear();
    };
    self.ask = function(message, choices) {
        self.printHeader(message);
        self.choices = choices;
        self.setState(self.states.waiting);
    };
    self.decide = function(selection) {
        if (!self.choices || !selection) return;
        var choice;
        self.choices.forEach(function(item) {
            if (item.option === selection) {
                choice = item;
            }
        });
        if (choice) {
            choice.action();
            self.setState(self.states.idle);
            self.commands.print("You chose: " + selection);
            self.printLineBreak();
        }
    };
    self.setState = function(newState) {
        self.state = newState;
        switch(newState) {
            case self.states.idle:
                break;
            case self.states.waiting:
                var choices = self.choices.map(function(item) {
                    return item.option + " " + item.description;
                });
                self.list(choices)
                break;
        }
    };
    self.error = function(message) {
        self.commands.print("ERROR: " + message);
    };
    self.printHeader = function(message) {
        self.commands.print(lineBreak);
        self.commands.print(message);
        self.commands.print(lineBreak);
    };
    self.printLineBreak = function() {
        self.commands.print(lineBreak);     
    };
    self.autocomplete = function() {
        var commands = Object.keys(self.commands);
        var commandStr = commands.join(" ");
        var matches = commandStr.match(new RegExp("\\b" + inputElem.value + "\\w+", "g"));
        if (matches && matches.length === 1) {
            inputElem.value = matches[0];
        }
    };
    self.list = function(list) {
        list.forEach(function(value) {
            self.commands.print(value);
        });
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
    self.manual = {
        clear: "Clears terminal output",
        print: "Prints a message",
        restart: "Restart operating system",
        help: "Lists available commands",
        credits: "Lists all contributors",
        about: "Prints information about the current process",
        date: "Prints the current date",
        sandstorm: "Play Sandstorm by Darude"
    };
    self.commands = {
        clear: function() {
            outputElem.innerHTML = "";
        },
        print: function(message) {
            if (!message || !message.trim()) {
                return self.error("Missing parameter");
            }                    
            var messageElem = document.createElement("li");
            messageElem.innerText = message;
            outputElem.appendChild(messageElem);
            outputElem.scrollTop = outputElem.scrollHeight;
        },
        help: function() {
            var commands = Object.keys(self.manual);
            var glossary = commands.map(function(value) {
                return value + " - " + self.manual[value];
            })
            glossary.sort();
            self.printHeader("Help");
        },
        credits: function() {
            var credits = [
                "Kristina Born, Programmer Extraordinaire",
                "Liam Atticus Clarke, Programmer and self proclaimed Git Wizard" 
            ];
            self.printHeader("Credits");         
            self.list(credits);
        }, 
        about: function() {
            var about = "This is a description of the project."
            self.printHeader("About");
            self.commands.print(about);            
        },
        date: function() {
            self.commands.print(new Date().toString());
        },
        sandstorm: function() {
            if (!self.audioPlayer.player) {
                self.audioPlayer.player = new Audio('audio/sandstorm.mp3');
            }
            if (!self.audioPlayer.isPlaying) {
                self.audioPlayer.isPlaying = true;
                self.audioPlayer.player.play();
            } else {
                self.audioPlayer.isPlaying = false;
                self.audioPlayer.player.pause();
            }
        }
    };
    self.addCommand = function(name, desc, func) {
        self.commands[name] = func;
        self.manual[name] = desc;
    }
}
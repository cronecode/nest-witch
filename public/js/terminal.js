function Terminal(inputElem, outputElem) {
    var self = this;
    self.ghettoBlaster;
    self.enhancementLevel = 0;
    self.submit = function() {
        var input = inputElem.value.trim();
        if (!input) return;
        self.input.save(input);  
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
        self.input.clear();
    };
    self.error = function(message) {
        self.commands.print("ERROR: " + message);
    };
    self.break = function() {
        self.commands.print("--------------------------------");
    };
    self.autocomplete = function() {
        var commands = Object.keys(self.commands);
        var commandStr = commands.join(" ");
        var matches = commandStr.match(new RegExp(inputElem.value + "\\w+", "g"));
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
        enhance: "ENHANCE!!!"
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
        restart: function() {
            //location.href = location.origin;
        },
        help: function() {
            var commands = Object.keys(self.manual);
            var glossary = commands.map(function(value) {
                return value + " - " + self.manual[value];
            })
            glossary.sort();
            self.break();
            self.commands.print("Help")
            self.break();            
            self.list(glossary);
        },
        credits: function() {
            var credits = [
                "Kristina Born, Programmer Extraordinaire",
                "Liam Atticus Clarke, Programmer and self proclaimed Git Wizard" 
            ];
            self.break();
            self.commands.print("Credits");
            self.break();            
            self.list(credits);
        }, 
        about: function() {
            var about = "This is a description of the project."
            self.break();            
            self.commands.print("About");
            self.break();
            self.commands.print(about);            
        },
        date: function() {
            self.commands.print(new Date().toString());
        },
        enhance: function() {
            var maxLevel = 11;            
            if (self.enhancementLevel < maxLevel) {
                self.enhancementLevel++;
                self.commands.print("Enhancement Factor: " + self.enhancementLevel);
                switch (self.enhancementLevel) {
                    case maxLevel:
                        self.ghettoBlaster = new Audio('audio/sandstorm.mp3');
                        self.ghettoBlaster.play();
                        break; 
                }
            } else {
                self.enhancementLevel = 0;
                self.ghettoBlaster.pause();
                self.commands.print("You have exceeded the max enhancement level!");
                self.commands.print("Enhancement Reset to: " + self.enhancementLevel);
            }            
        }
    };
}
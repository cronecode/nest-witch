var terminalInputElem, terminalOutputElem;
var terminal = {
    history: [],
    error: function(message) {
        terminal.commands.print("ERROR: " + message);
    },
    autocomplete: function() {
        var commands = Object.keys(terminal.commands);
        var commandStr = commands.join(" ");
        var matches = commandStr.match(new RegExp(terminalInputElem.value + "\\w+", "g"));
        if (matches && matches.length === 1) {
            terminalInputElem.value = matches[0];
        }
    },
    list: function(list) {
        list.forEach(function(value) {
            terminal.commands.print(value);
        });
    },
    manual: {
        clear: "Clears terminal output",
        print: "Prints a message",
        help: "Lists available commands",
        credits: "Lists all contributors"
    },
    commands: {
        clear: function() {
            terminal.history = [];
            terminalOutputElem.innerHTML = "";
        },
        print: function(message) {
            if (!message || !message.trim()) {
                return terminal.error("Missing parameter.");
            }
            terminal.history.push(message);
            var messageElem = document.createElement("li");
            messageElem.innerText = message;
            terminalOutputElem.appendChild(messageElem);
            terminalOutputElem.scrollTop = terminalOutputElem.scrollHeight;
        },
        help: function() {
            var commands = Object.keys(terminal.manual);
            var glossary = commands.map(function(value) {
                return value + " - " + terminal.manual[value];
            })
            terminal.list(glossary);
        },
        credits: function() {
            var credits = [
                "Kristina Born, Programmer Extraordinaire",
                "Liam Atticus Clarke, Programmer and self proclaimed Git Wizard" 
            ];
            terminal.commands.print("Credits:");
            terminal.list(credits);
        }
    }    
};

window.addEventListener("load", init);

function init() {
    terminalInputElem = document.getElementById("terminal-input");
    terminalOutputElem = document.getElementById("terminal-output");
}

document.getElementById("terminal-input-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var input = terminalInputElem.value.trim();
    if (!input) return;
    var tokens = input.split(" ");
    var command = {
        name: tokens[0],
        param: tokens[1]
    };
    if (terminal.commands[command.name]) {
        terminal.commands[command.name](command.param);
    } else {
        terminal.error("'" + input + "', is not a valid command. Use 'help' to view a list of commands.");
    }
    terminalInputElem.value = "";
});

document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode || event.which;
    // Key Press: TAB
    if (keyCode === 9) {
        event.preventDefault();
        terminal.autocomplete();
    }
});
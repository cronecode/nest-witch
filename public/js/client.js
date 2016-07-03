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
        console.log(matches)
        if (matches && matches.length === 1) {
            terminalInputElem.value = matches[0];
        }
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
            alert("HELP!!!");
        },
        credits: function() {
            var credits = [
                { name: "Kristina Born", title: "Programmer Extraordinaire" },
                { name: "Liam Atticus Clarke", title: "Programmer and self proclaimed Git Wizard" }
            ];
            terminal.commands.print("Credits:");
            for (var i = 0; i < credits.length; i++) {
                var cred = credits[i];
                terminal.commands.print(cred.name + " - " + cred.title);
            }
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
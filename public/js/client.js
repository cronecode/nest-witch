var terminalInputElem, terminalOutputElem, blueprintElem;
var scene, camera, renderer;
var cube;
var terminal;

function Terminal() {
    var self = this;
    self.history = [];
    self.error = function(message) {
        self.commands.print("ERROR: " + message);
    };
    self.break = function() {
        self.commands.print("--------------------------------");
    };
    self.autocomplete = function() {
        var commands = Object.keys(self.commands);
        var commandStr = commands.join(" ");
        var matches = commandStr.match(new RegExp(terminalInputElem.value + "\\w+", "g"));
        if (matches && matches.length === 1) {
            terminalInputElem.value = matches[0];
        }
    };
    self.list = function(list) {
        list.forEach(function(value) {
            self.commands.print(value);
        });
    };
    self.manual = {
        clear: "Clears terminal output",
        print: "Prints a message",
        restart: "Restart operating system",
        help: "Lists available commands",
        credits: "Lists all contributors",
        about: "Prints information about the current process"
    };
    self.commands = {
        clear: function() {
            self.history = [];
            terminalOutputElem.innerHTML = "";
        },
        print: function(message) {
            if (!message || !message.trim()) {
                return self.error("Missing parameter");
            }
            self.history.push(message);
            var messageElem = document.createElement("li");
            messageElem.innerText = message;
            terminalOutputElem.appendChild(messageElem);
            terminalOutputElem.scrollTop = terminalOutputElem.scrollHeight;
        },        
        restart: function() {
            //location.href = location.origin;
        },
        help: function() {
            var commands = Object.keys(self.manual);
            var glossary = commands.map(function(value) {
                return value + " - " + self.manual[value];
            })
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
        }
    };
};

window.addEventListener("load", init);

function init() {
    terminalInputElem = document.getElementById("terminal-input");
    terminalOutputElem = document.getElementById("terminal-output");
    blueprintElem = document.getElementById("blueprint");
    // TERMINAL
    terminal = new Terminal();
    terminal.commands.print("Use 'help' to see a list of commands.");
    // THREE.JS
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, blueprintElem.clientWidth / blueprintElem.clientHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( new THREE.Color(0x10253a) );
    onResize();
    blueprintElem.appendChild( renderer.domElement );
    initScene();    
    render();
}

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
    if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
    }
}

function initScene() {
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial());
    cube = new THREE.BoxHelper( mesh );
    cube.material.color.set( 0x00ff00 );
    scene.add( cube );
    camera.position.z = 5;
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

window.addEventListener("resize", onResize);

function onResize() {
    renderer.setSize( blueprintElem.clientWidth, window.innerHeight - 304 ); // minus the height of the console    
    camera.aspect = blueprintElem.clientWidth / blueprintElem.clientHeight;
    camera.updateProjectionMatrix();
}
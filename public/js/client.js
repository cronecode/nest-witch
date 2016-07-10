var terminal;
var blueprintElem;
var scene, camera, renderer;
var map;
var cameraSize = 8;

window.addEventListener("load", init);
document.getElementById("terminal-input-form").addEventListener("submit", function(event) {
    event.preventDefault();
    terminal.submit();
});
document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode || event.which;
    switch(keyCode) {
        case 9: // TAB
            event.preventDefault();
            terminal.autocomplete();
            break;
        case 38: // UP ARROW
            terminal.input.prev();
            break;
        case 40: // DOWN ARROW
            terminal.input.next();
            break;
    }
});
window.addEventListener("resize", onResize);

function init() {    
    blueprintElem = document.getElementById("blueprint");
    // TERMINAL
    initTerminal();
    // THREE.JS
    scene = new THREE.Scene();
    var aspect = blueprintElem.clientWidth / blueprintElem.clientHeight;
    camera = new THREE.OrthographicCamera(
        -cameraSize * aspect / 2, // left
        cameraSize * aspect / 2, // right
        cameraSize / 2, // top
        -cameraSize / 2, // down
        0.1, // near
        1000); // far
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( new THREE.Color( 0x10253a ) );
    onResize();
    blueprintElem.appendChild( renderer.domElement );
    initScene();    
    render();
}

function initTerminal() {
    var terminalInputElem = document.getElementById("terminal-input");
    var terminalOutputElem = document.getElementById("terminal-output");
    // Custom commands
    var customCommands = [];
    customCommands.push({
        name: "restart",
        description: "Reload program",
        action: function() {
            scene = new THREE.Scene();
            initScene();
        }
    });
    customCommands.push({
        name: "goto",
        description: "Navigate to a specified room",
        action: function(roomName) {
            roomName = roomName.replace('\s', '-').toLowerCase();         
            var room = map.wrapper.getObjectByName(roomName);
            if (!room) return _commands.error("Room " + roomName + "does not exist");
            window.localStorage.setItem('room', roomName);
            var url = '/enter' + roomName + 0;
            $.get(url, function(data){
                var description = data.description
                terminal.commands.print(description); 
            var t = 0;
            var startPos = new THREE.Vector3().copy(camera.position);
            var endPos = new THREE.Vector3().copy(room.position);
            var startRot = new THREE.Quaternion().copy(camera.quaternion);
            var endRot = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
            var interval = setInterval(function() {
                camera.position.copy(startPos.lerp(endPos, t));
                var rotation = startRot.slerp(endRot, t);
                camera.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w); 
                t += 0.001;
                if (t >= 1) {
                    clearInterval(interval);
                }
            }, 0);
        })
        }
    });
    customCommands.push({
        name: 'refine',
        description: "Customize your possession",
        action: function(item){
            var room = window.localStorage.getItem('room')
            var name = item.replace('\s', '-').toLowerCase()
            var url = '/refine' + item
            $.get(url, function(data){
                var message = data.message
                var choices = data.choices
                terminal.ask(message, choices)
            })

        }
    })
    customCommands.push({
        name: 'exit',
        description: "Run awaaaaaay",
        action: function(){
            window.localStorage.clear('room')
        }
    })
    terminal = new Terminal(terminalInputElem, terminalOutputElem, {commands: customCommands});    
    terminal.commands.print("Welcome to Nest Witch");
    terminal.commands.print("Use 'help' to see a list of commands");    
    /*terminal.ask("CHOOOOSE!!!", [
        {
            option: "a",
            description: "You can select this.",
            action: function() {
                alert("You select option: 'a'");
            }
        },
        {
            option: "b",
            description: "You can select this.",
            action: function() {
                alert("You select option: 'b'");
            }
        },
        {
            option: "c",
            description: "You can select this.",
            action: function() {
                alert("You select option: 'c'");
            }
        }
    ]);*/
}

function initScene() {
    map = new Map(6, 6, 16);
    scene.add( map.wrapper );
    map.wrapper.rotation.x = Math.PI / 2;
    camera.position.set(5,5,5);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

function onResize() {
    renderer.setSize( blueprintElem.clientWidth, Math.floor(window.innerHeight * 2/3) ); // minus the height of the console  
    var aspect = blueprintElem.clientWidth / blueprintElem.clientHeight;
    camera.left = -cameraSize * aspect / 2;
    camera.right = cameraSize * aspect / 2;
    camera.top = cameraSize / 2;
    camera.down = -cameraSize / 2;
    camera.updateProjectionMatrix();
}
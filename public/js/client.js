var terminal;
var blueprintElem, legendElem;
var scene, camera, renderer;
var map;
var cameraSize = 8;
var cameraStartPos, cameraStartRot;

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
    legendElem = document.getElementById("legend");
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
    renderer.setClearColor( new THREE.Color( 0x000000 ) );
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
            terminal.commands.clear()
            scene = new THREE.Scene();
            initScene();
        }
    });
    customCommands.push({
        name: "enter",
        description: "Navigate to the specified room",
        action: function(roomName, sceneId) {
            if (roomName === 'control-room'){
                terminal.commands.end(2)
            }
            if (!roomName) return;  
            if (!sceneId){
                sceneId = 0
            }                 
            var room = map.wrapper.getObjectByName(roomName);
            console.log(room)
            if (!room){
                throw new Error('Room does not exist')
            }
            window.localStorage.setItem('room', roomName)
            $.post('/enter', {room: roomName, scene: sceneId})
                .done(function(data){
                    var description = data.description
                    var arr = roomName.split('-')
                    var str = arr.join(' ').toUpperCase()
                    var header = '<red>' + str + '</red>'
                    var roomPos = room.getWorldPosition();
                    zoomTo(
                        new THREE.Vector3().copy(new THREE.Vector3(roomPos.x, 5, roomPos.z)),
                        new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)),
                        2);
                    terminal.commands.print("--------------------------------")
                    terminal.commands.print(header)
                    terminal.commands.print("--------------------------------")
                    terminal.commands.print(description)
                })
            
        }
    });
    customCommands.push({
        name: "exit",
        description: "Leave current room",
        action: function() {
            window.localStorage.clear('room')
            zoomTo(
                cameraStartPos,
                cameraStartRot,
                1)
        }
    });
    customCommands.push({
        name: "refine",
        description: "Customize the specified object",
        action: function(item){
            var room = window.localStorage.getItem('room')
            $.post('/refine', {item: item, room: room})
                .done(function(data){
                    var message = data.message
                    var choices = data.choices
                    terminal.ask(message, choices)
                })
        }
    })
    terminal = new Terminal(terminalInputElem, terminalOutputElem, {commands: customCommands});    
    terminal.commands.print("Welcome to Nest Witch");
    terminal.commands.print("Use 'help' to see a list of commands");
}

function initScene() {
    new THREE.FontLoader().load("fonts/roboto.json", function(font) {
        $.get('/rooms').done(function(response) {
            map = new Map(6, 6, 16, response.rooms, font);
            scene.add( map.wrapper );
            map.wrapper.rotation.x = -Math.PI / 2;
            camera.position.set(5,5,5);
            camera.lookAt(new THREE.Vector3(0,0,0));
            cameraStartPos = new THREE.Vector3().copy(camera.position);
            cameraStartRot = new THREE.Quaternion().copy(camera.quaternion);
            // legend
            console.log(response.rooms)
            response.rooms.forEach(function(room) {
                var elem = document.createElement("li");
                elem.innerText = room.name;
                legendElem.appendChild(elem);
            }, this);
        });
    });   
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

function zoomTo(position, rotation, size) {
    var t = 0;
    var startPos = new THREE.Vector3().copy(camera.position);
    var startRot = new THREE.Quaternion().copy(camera.quaternion);
    var startSize = camera.zoom;
    var interval = setInterval(function() {
        t += 0.01;        
        camera.position.copy(new THREE.Vector3().copy(startPos).lerp(position, t));
        camera.quaternion.copy(new THREE.Quaternion().copy(startRot).slerp(rotation, t));
        camera.zoom = lerp(startSize, size, t);
        camera.updateProjectionMatrix();
        if (t >= 1) {
            clearInterval(interval);
        }
    }, 0);
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}
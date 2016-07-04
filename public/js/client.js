var blueprintElem;
var scene, camera, renderer;
var cube;
var terminal;

window.addEventListener("load", init);

function init() {    
    blueprintElem = document.getElementById("blueprint");
    // TERMINAL
    var terminalInputElem = document.getElementById("terminal-input");
    var terminalOutputElem = document.getElementById("terminal-output");
    terminal = new Terminal(terminalInputElem, terminalOutputElem);
    terminal.commands.print("Welcome to Nest Witch");
    terminal.commands.print("Use 'help' to see a list of commands");
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
    cube.material.color.set( 0xffffff );
    scene.add( cube );
    camera.position.z = 5;
}

document.getElementById("terminal-input-form").addEventListener("submit", function(event) {
    event.preventDefault();
    terminal.submit();
});

document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode || event.which;
    // Key Press: TAB
    switch(keyCode) {
        case 9:
            event.preventDefault();
            terminal.autocomplete();
            break;
        case 38:
            terminal.input.prev();
            break;
        case 40:
            terminal.input.next();
            break;
    }
});

window.addEventListener("resize", onResize);

function onResize() {
    renderer.setSize( blueprintElem.clientWidth, window.innerHeight - 304 ); // minus the height of the console    
    camera.aspect = blueprintElem.clientWidth / blueprintElem.clientHeight;
    camera.updateProjectionMatrix();
}
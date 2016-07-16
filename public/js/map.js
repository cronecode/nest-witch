function Room(name, index, font) {
    this.mesh = new THREE.BoxHelper(new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 0.2 ),
        new THREE.MeshBasicMaterial()
    ))
    this.mesh.material.color.set( 0xa9d478 );
    this.mesh.name = name;
    var label = new THREE.Mesh(
        new THREE.TextGeometry(index, {
            font: font,
            size: 0.25,
            height: 0.025,
            curveSegments: 2,
            color: new THREE.Color(0xffffff)
        }),
        new THREE.MeshBasicMaterial({color: new THREE.Color})
    );
    label.position.set(-0.15, -0.125, 0)
    this.mesh.add(label);
}

function Map(gridX, gridY, numOfRooms, rooms, font) {
    if (gridX < 1 || gridY < 1) throw new Error("Invalid map size");
    var self = this;
    self.grid = [];
    self.wrapper = new THREE.Object3D();
    // Init Map Grid
    (function() {
        for (var i = 0; i < gridX; i++) {
            self.grid.push([]);
        }
        var vacantSlots = [];
        vacantSlots.push({
            x: Math.floor(gridX / 2),
            y: Math.floor(gridY / 2)
        });
        if (rooms.length < numOfRooms) {
            numOfRooms = rooms.length;
        }
        // make a copy of the rooms array
        rooms = rooms.slice();
        for (var i = 0; i < numOfRooms; i++) {
            var vacantSlotIndex = Math.floor(Math.random() * vacantSlots.length)
            var vacantSlot = vacantSlots[vacantSlotIndex]
            var room = rooms[i]
            var room = new Room(room.name, i + 1, font);
            room.mesh.position.set(
                vacantSlot.x - Math.floor(gridX / 2),
                vacantSlot.y - Math.floor(gridY / 2),
                0
            );
            self.wrapper.add( room.mesh );
            self.grid[vacantSlot.x][vacantSlot.y] = room;
            if (vacantSlot.y + 1 < gridY && !self.grid[vacantSlot.x][vacantSlot.y + 1]) {
                vacantSlots.push({
                    x: vacantSlot.x,
                    y: vacantSlot.y + 1
                });
            }
            if (vacantSlot.x + 1 < gridX && !self.grid[vacantSlot.x + 1][vacantSlot.y]) {
                vacantSlots.push({
                    x: vacantSlot.x + 1,
                    y: vacantSlot.y
                });
            }
            if (vacantSlot.y - 1 >= 0 && !self.grid[vacantSlot.x][vacantSlot.y - 1]) {
                vacantSlots.push({
                    x: vacantSlot.x,
                    y: vacantSlot.y - 1
                });
            }
            if (vacantSlot.x - 1 >= 0 && !self.grid[vacantSlot.x - 1][vacantSlot.y]) {
                vacantSlots.push({
                    x: vacantSlot.x - 1,
                    y: vacantSlot.y
                });
            }
            vacantSlots.splice(vacantSlotIndex, 1);
        }
    })();
}

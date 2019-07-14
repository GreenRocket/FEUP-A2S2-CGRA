/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySphere extends CGFobject {
    constructor(scene, divs) {
        super(scene);

        this.init(divs);
    }

    init(divs) {
        this.face = new MyConcaveQuad(this.scene, divs, [0, 1, 0]);
    }

    display() {
        var rotations = [[0, 1, 0, 0],           //TOP
        [Math.PI, 1, 0, 0],           //BOT
        [Math.PI * 0.5, 1, 0, 0],     //FRONT
        [-Math.PI * 0.5, 1, 0, 0],    //BACK
        [Math.PI * 0.5, 0, 0, 1],     //LEFT
        [-Math.PI * 0.5, 0, 0, 1]];    //RIGHT

        for (let i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(rotations[i][0], rotations[i][1], rotations[i][2], rotations[i][3]);
            this.face.display();
            this.scene.popMatrix();
        }
    }
}
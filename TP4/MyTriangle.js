/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers();
    }


    initBuffers() {
        this.vertices = [
            -1, -1, 0,	//0
            -1, 1, 0,	//1
            1, -1, 0,	//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1,
        ];

        this.normals = [];
        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, 1);

        this.texCoords = [
            0 / 512, 512 / 512,
            0 / 512, 256 / 512,
            256 / 512, 512 / 512
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


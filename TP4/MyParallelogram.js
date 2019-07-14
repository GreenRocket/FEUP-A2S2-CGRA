/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 0,	//0
            2, 0, 0,	//1
            1, 1, 0,	//2
            3, 1, 0,	//3

            0, 0, 0,	//0
            2, 0, 0,	//1
            1, 1, 0,	//2
            3, 1, 0		//3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            1, 3, 2,
            0, 2, 1,
            1, 2, 3
        ];

        this.normals = [];
        this.normals.push(0,0,1);
        this.normals.push(0,0,1);
        this.normals.push(0,0,1);
        this.normals.push(0,0,1);

        this.normals.push(0,0,-1);
        this.normals.push(0,0,-1);
        this.normals.push(0,0,-1);
        this.normals.push(0,0,-1);

        this.texCoords = [
			512/512, 512/512,
			256/512, 512/512,
			384/512, 384/512,
			128/512, 384/512
		];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


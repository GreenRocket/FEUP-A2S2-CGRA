/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySmallTriangle extends CGFobject {
    constructor(scene, coords) {
        super(scene);
        this.initBuffers();
        if (coords != undefined)
            this.updateTexCoords(coords);

    }
    initBuffers() {
        this.vertices = [
            -1, 0, 0,	//0
            0, 1, 0,	//1
            1, 0, 0,	//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1
        ];

        this.normals = [];
        this.normals.push(0,0,1);
        this.normals.push(0,0,1);
        this.normals.push(0,0,1);

        this.texCoords = [
			128/512, 384/512,
			256/512, 256/512,
			384/512, 384/512
		];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}


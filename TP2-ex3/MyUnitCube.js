/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {

        // left/right, top/down, back/front,

		this.vertices = [
			-0.5,   -0.5,    0.5,	//ldf 0
			 0.5,   -0.5,    0.5,	//rdf 1
			 0.5,   -0.5,   -0.5,	//rdb 2
            -0.5,   -0.5,   -0.5,	//ldb 3
            -0.5,    0.5,    0.5,	//ldf 4
             0.5,    0.5,    0.5,	//rdf 5
             0.5,    0.5,   -0.5,	//rdb 6
            -0.5,    0.5,   -0.5,	//ldb 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 2, //bottom
            0, 2, 1,

            0, 1, 5, //front
            0, 5, 4,

            1, 2, 6, // right
            1, 6, 5,

            2, 3, 7, // back
            2, 7, 6,

            3, 0, 4, // left
            3, 4, 7,

            4, 5, 6, // top
            4, 6, 7,
            
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}


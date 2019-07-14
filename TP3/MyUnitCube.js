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
            
			-0.5,   -0.5,    0.5,	//ldf 0  4
            0.5,   -0.5,    0.5,	//rdf 1
            -0.5,    0.5,    0.5,	//luf 4
            0.5,    0.5,    0.5,	//ruf 5
            
            0.5,   -0.5,    0.5,	//rdf 1  8
            0.5,   -0.5,   -0.5,	//rdb 2
            0.5,    0.5,    0.5,	//ruf 5
            0.5,    0.5,   -0.5,	//rub 6
            
            0.5,   -0.5,   -0.5,	//rdb 2  12
            -0.5,   -0.5,   -0.5,	//ldb 3
            0.5,    0.5,   -0.5,	//rub 6
            -0.5,    0.5,   -0.5,	//lub 7
            
			-0.5,   -0.5,    0.5,	//ldf 0  16
            -0.5,   -0.5,   -0.5,	//ldb 3
            -0.5,    0.5,    0.5,	//luf 4
            -0.5,    0.5,   -0.5,	//lub 7

            -0.5,    0.5,    0.5,	//luf 4  20
            0.5,    0.5,    0.5,	//ruf 5
            0.5,    0.5,   -0.5,	//rub 6
            -0.5,    0.5,   -0.5,	//lub 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 2, //bottom
            0, 2, 1,

            4, 5, 7, //front
            4, 7, 6,

            8, 9, 11, // right
            8, 11, 10,

            12, 13, 15, // back
            12, 15, 14,

            17, 16, 18, // left
            17, 18, 19,

            20, 21, 22, // top
            20, 22, 23,   
        ];
        
        this.normals = [];

        for (let index = 0; index < 4; index++)
            this.normals.push(0,-1,0);

        for (let index = 0; index < 4; index++)
            this.normals.push(0,0,1);
        
        for (let index = 0; index < 4; index++)
            this.normals.push(1,0,0);

        for (let index = 0; index < 4; index++)
            this.normals.push(0,0,-1);

        for (let index = 0; index < 4; index++)
            this.normals.push(-1,0,0);

        for (let index = 0; index < 4; index++)
            this.normals.push(0,1,0);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
    
    updateBuffers(complexity){}
}


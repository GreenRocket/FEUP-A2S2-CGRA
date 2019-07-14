/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject
{
    constructor(scene)
    {
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
			0, 2, 3, //bottom
            0, 1, 2,

            4, 6, 7, //front
            4, 7, 5,

            8, 11, 9, // right
            8, 10, 11,

            12, 15, 13, // back
            12, 14, 15,

            17, 18, 16, // left
            17, 19, 18,

            20, 22, 21, // top
            20, 23, 22,   
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


        this.texCoords = [];

        this.texCoords.push(0.5, 1);
        this.texCoords.push(0.75, 1);
        this.texCoords.push(0.75, 0.66666);
        this.texCoords.push(0.5, 0.66666);

        this.texCoords.push(0.5, 0.66666);
        this.texCoords.push(0.75, 0.66666);
        this.texCoords.push(0.5, 0.33333);
        this.texCoords.push(0.75, 0.33333);

        this.texCoords.push(0.25, 0.66666);
        this.texCoords.push(0.5, 0.66666);
        this.texCoords.push(0.25, 0.33333);
        this.texCoords.push(0.5, 0.33333);

        this.texCoords.push(0.0, 0.66666);
        this.texCoords.push(0.25, 0.66666);
        this.texCoords.push(0.0, 0.33333);
        this.texCoords.push(0.25, 0.33333);

        this.texCoords.push(0.75, 0.66666);
        this.texCoords.push(1.0, 0.66666);
        this.texCoords.push(0.75, 0.33333);
        this.texCoords.push(1.0, 0.33333);

        this.texCoords.push(0.5, 0.333333);
        this.texCoords.push(0.75, 0.33333);
        this.texCoords.push(0.75, 0);
        this.texCoords.push(0.5, 0);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
    
    updateBuffers(complexity){}
}


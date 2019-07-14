/**
 * MyConcaveQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyConcaveQuad extends CGFobject {
    constructor(scene, divs, normalDir) {
        super(scene);

        this.divs = divs;
        this.normalDir = normalDir;
        this.planeDirA = [normalDir[1], normalDir[2], normalDir[0]];
        // planeDirB = normalDir X planeDirA
        this.planeDirB = [normalDir[1] * this.planeDirA[2] - this.planeDirA[1] * this.normalDir[2],
        normalDir[0] * this.planeDirA[2] - this.planeDirA[0] * this.normalDir[2],
        normalDir[0] * this.planeDirA[1] - this.planeDirA[0] * this.normalDir[1]];
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        for (let i = 0; i < this.divs; i++) {
            for (let j = 0; j < this.divs; j++) {
                var percent = [j / (this.divs - 1), i / (this.divs - 1)];
                this.texCoords.push(j / this.divs, i / this.divs);

                var locOnCube = [this.normalDir[0] + (percent[0] - 0.5) * 2 * this.planeDirA[0] + (percent[1] - 0.5) * 2 * this.planeDirB[0],
                this.normalDir[1] + (percent[0] - 0.5) * 2 * this.planeDirA[1] + (percent[1] - 0.5) * 2 * this.planeDirB[1],
                this.normalDir[2] + (percent[0] - 0.5) * 2 * this.planeDirA[2] + (percent[1] - 0.5) * 2 * this.planeDirB[2]];

                var norm = Math.sqrt(locOnCube[0] * locOnCube[0] + locOnCube[1] * locOnCube[1] + locOnCube[2] * locOnCube[2]);

                this.vertices.push(locOnCube[0] / norm, locOnCube[1] / norm, locOnCube[2] / norm);

                var k = (j + i * this.divs);

                if (j != this.divs - 1 && i != this.divs - 1) {
                    this.indices.push(k);
                    this.indices.push(k + this.divs + 1);
                    this.indices.push(k + this.divs);

                    this.indices.push(k);
                    this.indices.push(k + 1);
                    this.indices.push(k + this.divs + 1);
                }
            }
        }

        this.normals = this.vertices;
        this.texCoords.push(1, 1);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    setUVTiling(tileScaleVec) {
        for (var i = 0; i < this.texCoords.length; i++)
            if (this.texCoords[i] != 0)
                this.texCoords[i] = ((i % 2 == 0) ? tileScaleVec[0] : tileScaleVec[1]);
        this.updateTexCoordsGLBuffers();
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


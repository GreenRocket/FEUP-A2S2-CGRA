/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init(scene);
	}
	init(scene) {
        
        this.faces = [];

        for (let face = 0; face < 6; face++) {
            this.faces[face] = new MyQuad(scene);
        }

        this.materials = [];
        this.materialIDs = {
            'Side': 0, 
            'Top': 1, 
            'Bottom': 2
        };

        for (let index = 0; index < 3; index++)
        {
            var mat = new CGFappearance(this.scene);
            mat.setAmbient(0.1, 0.1, 0.1, 1);
            mat.setDiffuse(0.9, 0.9, 0.9, 1);
            mat.setSpecular(0.1, 0.1, 0.1, 1);
            mat.setShininess(10.0);
            mat.setTextureWrap('REPEAT', 'REPEAT');
            this.materials.push(mat);
        }
        this.materials[this.materialIDs['Side']].loadTexture('images/mineSide.png');
        this.materials[this.materialIDs['Top']].loadTexture('images/mineTop.png');
        this.materials[this.materialIDs['Bottom']].loadTexture('images/mineBottom.png');
    }
    
    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI * 0.5, 1, 0, 0);
        this.materials[this.materialIDs['Bottom']].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faces[0].display();
        this.scene.popMatrix();
        
        this.materials[this.materialIDs['Side']].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.faces[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
        //this.materials[this.materialIDs['Side']].apply();
        this.faces[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        //this.materials[this.materialIDs['Side']].apply();
        this.faces[3].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI * 1.5, 0, 1, 0);
        //this.materials[this.materialIDs['Side']].apply();
        this.faces[4].display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI * 1.5, 1, 0, 0);
        this.materials[this.materialIDs['Top']].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faces[5].display();
        this.scene.popMatrix();
    }
}
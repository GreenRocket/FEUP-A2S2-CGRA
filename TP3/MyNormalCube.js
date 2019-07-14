/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyNormalCube extends CGFobject {
	constructor(scene, nDivs) {
		super(scene);
		this.init(scene, nDivs);
	}
	init(scene, nDivs) {
        
        this.faces = [];

        for (let face = 0; face < 6; face++) {
            this.faces[face] = new MyPlane(scene, nDivs);
        }
    }
    
    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI * 0.5, 1, 0, 0);
        this.faces[0].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.faces[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
        this.faces[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.faces[3].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI * 1.5, 0, 1, 0);
        this.faces[4].display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI * 1.5, 1, 0, 0);
        this.faces[5].display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        for (let face = 0; face < 6; face++) {
            this.faces[face].updateBuffers(complexity);
        }
    }

    enableNormalViz(){
        for (let face = 0; face < 6; face++) {
            this.faces[face].enableNormalViz();
        }
    }

    disableNormalViz(){
        for (let face = 0; face < 6; face++) {
            this.faces[face].disableNormalViz();
        }
    }
}


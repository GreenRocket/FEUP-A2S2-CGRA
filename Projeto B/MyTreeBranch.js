/**
 * MyTreeBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeBranch extends CGFobject {
    constructor(scene,pos,rot) {

        super(scene);

        this.pos = pos;
        this.rot = rot;

        this.isWithBird = false;

        this.init();
    }

    init() {
        this.trunkMat = new CGFappearance(this.scene);
        this.trunkMat.setAmbient(1, 1, 1, 1);
        this.trunkMat.setEmission(1,1,1,1);
        this.trunkMat.loadTexture('images/trunk.png');
        this.trunkMat.setTextureWrap('REPEAT', 'REPEAT');

        this.branch = new MyCylinderClosed(this.scene, 6);
    }

    display() {

        this.scene.pushMatrix();
        if(!this.isWithBird)
        {
            this.scene.translate(this.pos[0], this.pos[1],this.pos[2]);
            this.scene.rotate(this.rot,0,1,0);
        }
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.1,1.5,0.1);
        this.trunkMat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.branch.display();
        this.scene.popMatrix();
        
    }
}
/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyNest extends CGFobject
{
    constructor(scene, slices, pos)
    {
		super(scene);
        
        this.slices = slices;

        this.pos = pos;

        this.branchesInfo = [];

        this.init(scene);
	}
    init()
    {
        this.trunkMat = new CGFappearance(this.scene);
        this.trunkMat.setAmbient(1, 1, 1, 1);
        this.trunkMat.setEmission(1,1,1,1);
        this.trunkMat.loadTexture('images/trunk.png');
        this.trunkMat.setTextureWrap('REPEAT', 'REPEAT');

        this.wood = new MyCylinderClosed(this.scene, this.slices);
    }

    addBranch(branch) {
        vec3.copy(branch.pos, this.pos);
        console.log(branch.pos);
        console.log(this.pos);
        branch.pos[1] += 0.5;
        var rot = Math.PI * 2 * Math.random();
        this.branchesInfo.push([branch, rot]);
    }

    displayWood()
    {
        var theta = 0;
        var thetaStep = 2 * Math.PI / 9;

        for (var i = 0; i < 9; i++)
        {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI/9,Math.cos(theta),0,Math.sin(theta));
            this.scene.rotate(theta, 0, 1, 0);
            this.scene.scale(1.2,0.4,0.4);
            this.wood.display();
            this.scene.popMatrix();

            theta += thetaStep;
        }
    }

    display()
    {   
        this.scene.pushMatrix();

        this.branchesInfo.forEach(element => {
            element[0].display();
        });

        this.scene.translate(this.pos[0], this.pos[1],this.pos[2]);
        this.trunkMat.apply();
        this.displayWood();
        this.scene.popMatrix();
    }
}

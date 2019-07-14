/**
 * MyFirepit
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFirepit extends CGFobject
{
    constructor(scene, slices)
    {
		super(scene);
        
        this.slices = slices;

        this.init(scene);
	}
    init()
    {
        this.stone = new MyConeClosed(this.scene, 16, this.scene.MAT_ROCK, this.scene.MAT_ROCK);
        this.wood = new MyCylinderClosed(this.scene, this.slices, this.scene.MAT_TREE_TRUNK, this.scene.MAT_TREE_TRUNK);
    }

    displayStones()
    {
        var theta = 0;
        var thetaStep = 2 * Math.PI / 9;

        for (var i = 0; i < 9; i++)
        {
            this.scene.pushMatrix();
            this.scene.rotate(theta, 0, 1, 0);
            this.scene.scale(1.2,0.4,0.4);
            this.stone.display();
            this.scene.popMatrix();

            theta += thetaStep;
        }
    }

    display()
    {   
        this.displayStones();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 1);
        this.scene.scale(0.4,1.2,0.4);
        this.wood.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 1, 1);
        this.scene.scale(0.4,1.2,0.4);
        this.wood.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 1, 1, 0);
        this.scene.scale(0.4,1.2,0.4);
        this.wood.display();
        this.scene.popMatrix();
    }
}

/**
 * MyBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBranch extends CGFobject
{
    constructor(scene, slices)
    {
		super(scene);
        
        this.slices = slices;

        this.init(scene);
	}
    init()
    {
        this.brownMat = new CGFappearance(this.scene);
        this.brownMat.setAmbient(1, 1, 1, 1);
        this.brownMat.setDiffuse(0.5, 0.3, 0.1, 1);
        this.brownMat.setSpecular(0.1, 0.1, 0.1, 1);

        this.cylinder = new MyCylinder(this.scene, this.slices);
    }

    display()
    {   
        this.scene.pushMatrix();

        this.brownMat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cylinder.display();

        this.scene.popMatrix();
    }
}

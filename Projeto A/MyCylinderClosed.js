/**
 * MyCylinderClosed
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCylinderClosed extends CGFobject
{
    constructor(scene, slices, topMatID, sideMatID)
    {
		super(scene);
        
        this.slices = slices;

        this.topMatID = topMatID;
        this.sideMatID = sideMatID;

        this.init(scene);
	}
    init()
    {
        this.cylinder = new MyCylinder(this.scene, this.slices);
        this.circle = new MyCircle(this.scene, this.slices);
    }

    display()
    {   
        this.scene.pushMatrix();
        this.scene.materials[this.topMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.materials[this.topMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.circle.display();
        this.scene.popMatrix();
    }
}

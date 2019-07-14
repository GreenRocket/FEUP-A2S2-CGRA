/**
 * MyCylinderClosed
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCylinderClosed extends CGFobject
{
    constructor(scene, slices)
    {
		super(scene);
        
        this.slices = slices;

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

        this.cylinder.display();
        this.scene.popMatrix();

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

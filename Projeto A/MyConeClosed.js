/**
 * MyConeClosed
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyConeClosed extends CGFobject
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
        this.cone = new MyCone(this.scene, this.slices);
        this.circle = new MyCircle(this.scene, this.slices);
    }

    display()
    {   
        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.scene.materials[this.topMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cone.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.scene.rotate(-Math.PI/2, 0,0,1);
        this.scene.materials[this.topMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.circle.display();
        this.scene.popMatrix();
    }
}

/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject
{
    constructor(scene)
    {
		super(scene);

        this.init(scene);
	}
    init()
    {
        this.triangle = new MyTriangle(this.scene);
    }

    display()
    {   
        this.scene.pushMatrix();

        this.scene.greenMat.apply();
        this.scene.translate(0, 0, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.triangle.display();

        this.scene.popMatrix();
    }
}

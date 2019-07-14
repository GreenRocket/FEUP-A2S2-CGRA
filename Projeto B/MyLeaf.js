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
        this.greenMat = new CGFappearance(this.scene);
        this.greenMat.setAmbient(1, 1, 1, 1);
        this.greenMat.setDiffuse(0.2, 0.9, 0.3, 1);
        this.greenMat.setSpecular(0.1, 0.1, 0.1, 1);

        this.triangle = new MyTriangle(this.scene);
    }

    display()
    {   
        this.scene.pushMatrix();

        this.greenMat.apply();
        this.scene.translate(0, 0, 1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.triangle.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.triangle.display();

        this.scene.popMatrix();
    }
}

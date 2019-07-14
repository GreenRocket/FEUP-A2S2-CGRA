/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject
{
    constructor(scene, topMatID, sideMatID, botMatID, tileScaleVec)
    {
        super(scene);

        this.topMatID = topMatID;
        this.sideMatID = sideMatID;
        this.botMatID = botMatID;

        this.tileScaleVec = tileScaleVec;

		this.init();
    }
    
    init()
    {
        this.faces = [];
        for (let face = 0; face < 6; face++)
        {
            this.faces[face] = new MyQuad(this.scene);
            this.faces[face].setUVTiling(this.tileScaleVec);
        }
    }
    
    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI * 0.5, 1, 0, 0);
        this.scene.materials[this.botMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faces[0].display();
        this.scene.popMatrix();

        this.scene.materials[this.sideMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

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
        this.scene.materials[this.topMatID].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.faces[5].display();
        this.scene.popMatrix();
    }
}
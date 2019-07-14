/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject
{
    constructor(scene)
    {
		super(scene);

        this.init();
    }
    
    init()
    {                
        this.cube = new MyUnitCubeQuad(this.scene, this.scene.MAT_WOOD, this.scene.MAT_WOOD, this.scene.MAT_WOOD, [4,4]);

        this.pyramid = new MyPyramid(this.scene, 8);
        this.pyramid.setUVTiling([2,2]);

        this.prism = new MyPrism(this.scene, 8);

        this.door = new MyQuad(this.scene);
    }
    
    displayColumn(x,z,scale,height)
    {
        this.scene.pushMatrix();
        this.scene.translate(x,0,z);
        this.scene.scale(scale,height,scale);
        this.scene.materials[this.scene.MAT_TREE_TRUNK].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.prism.display();
        this.scene.popMatrix(); 
    }

    display()
    {   
        this.scene.pushMatrix();
        this.scene.translate(0,1.5,0);
        this.scene.scale(5,3,5);
        this.cube.display();
        this.scene.popMatrix();
        
        var colHeight = 3;
        var colPosition = 2.4

        this.displayColumn(colPosition + 1, colPosition + 1 , 0.5, colHeight);
        this.displayColumn(-colPosition - 1, colPosition + 1 , 0.5, colHeight);
        this.displayColumn(colPosition + 1, -colPosition - 1 , 0.5, colHeight);
        this.displayColumn(-colPosition - 1, -colPosition - 1 , 0.5, colHeight);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.translate(0,3,0);
        this.scene.scale(5.5,3,5.5);
        this.scene.materials[this.scene.MAT_TREE_TRUNK].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.pyramid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(2,2,1);
        this.scene.translate(0,0.5,2.51);
        this.scene.materials[this.scene.MAT_DOOR].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.door.display();
        this.scene.popMatrix();
    }
}

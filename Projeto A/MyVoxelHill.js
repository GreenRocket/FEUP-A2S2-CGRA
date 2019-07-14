/**
 * MyVoxelHill
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVoxelHill extends CGFobject
{
    constructor(scene, levels)
    {
        super(scene);
        
        this.levels = levels;

        this.init();
	}
    init()
    {
        this.cube = new MyUnitCubeQuad(this.scene, this.scene.MAT_GRASS, this.scene.MAT_DIRT_SIDE, this.scene.MAT_DIRT_BOTTOM, [1,1]);
    }

    updateLevels(levels)
    {
        this.levels = levels;
    }

    displayLayer(level, height)
    {
        var middleCube = level;
        var numberOfCubes = 2 * level - 1;
        var startX = middleCube-numberOfCubes;

        for(var i = 1; i <= numberOfCubes; i++)
        {
            this.scene.pushMatrix();
            this.scene.translate(startX,height,middleCube-numberOfCubes);
            this.cube.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(startX,height,numberOfCubes-middleCube);
            this.cube.display();
            this.scene.popMatrix();
            
            // Do translation for sides of layer
            /*
                -----
             -> |   | <--
             -> |   | <--
                -----
            */
            if(i != 1 && i!= numberOfCubes)
            {
                this.scene.pushMatrix();
                this.scene.translate(middleCube-numberOfCubes,height,startX);
                this.cube.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(numberOfCubes-middleCube,height,startX);
                this.cube.display();
                this.scene.popMatrix();
            }
            startX++;
        }
    }
    
    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);

        // Display from bottom to top
        for(var i = 0; i < this.levels; i++)
            this.displayLayer(this.levels-i,i);

        this.scene.popMatrix();
    }
}
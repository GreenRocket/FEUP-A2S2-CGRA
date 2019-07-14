/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, numberOfTrees, numberOfRows)
    {
        super(scene);
        
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;

        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;

        this.numberOfTrees = numberOfTrees;
        this.numberOfRows = numberOfRows;

        this.init();

	}
    init()
    {
        this.treeRow = new MyTreeRowPatch(this.scene, this.trunkHeight, this.trunkRadius, this.treeTopHeight, this.treeTopRadius, this.numberOfTrees);
    }
    
    display()
    {
        for(var i = 0; i < this.numberOfRows; i++)
        {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.treeTopRadius * 3 * i);
            this.treeRow.display();
            this.scene.popMatrix();
        }
    }
}
/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeRowPatch extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, numberOfTrees)
    {
        super(scene);
        
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;

        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;

        this.numberOfTrees = numberOfTrees;

        this.init();

	}
    init()
    {
        // Gerar offsets aleatórios para as posições das arvores
        this.treesOffset = [];
        for(var i = 0; i < this.numberOfTrees; i++)
            this.treesOffset[i] = ((i%2)? 1 : -1) * Math.random() * this.treeTopRadius;

        this.tree = new MyTree(this.scene, this.trunkHeight, this.trunkRadius, this.treeTopHeight, this.treeTopRadius);
    }
    
    display()
    {
        for(var i = 0; i < this.numberOfTrees; i++)
        {
            this.scene.pushMatrix();
            // if(this.scene.windowON)
            //     this.scene.scale(1, Math.random() * 0.05 + 1, 1);
            this.scene.translate(this.treeTopRadius * 3 * i, 0, this.treesOffset[i]);
            this.tree.display();
            this.scene.popMatrix();
        }
    }
}
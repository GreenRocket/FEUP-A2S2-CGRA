/**
 * MyForest
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyForest extends CGFobject
{
    constructor(scene)
    {
		super(scene);

        this.init(scene);
	}
    init()
    {
        this.tree = new MyLSPlant(this.scene);

        this.treeInfo = [];
        for (let i = -10; i <= 10; i+=4) {
            this.treeInfo.push([i+Math.random(), -0.4, 10 + Math.random(), ""]);
            this.treeInfo.push([i+Math.random(), -0.4, -10 + Math.random(), ""]);
        }
        for (let i = -8; i <= 8; i+=4) {
            this.treeInfo.push([-10 + Math.random(), -0.4, i+Math.random(), ""]);
            this.treeInfo.push([10 + Math.random(), -0.4, i+Math.random(), ""]);
        }
        for (let i = -8; i <= 8; i+=4) {
            this.treeInfo.push([16 + 3*Math.sin((Math.random()) * Math.PI*2), -0.4, i+Math.random(), ""]);
        }

        this.treeInfo.forEach(element => {
            this.tree.axiom = this.tree.baseAxiom;
            this.tree.iterate();
            element[4] = this.tree.axiom;
        });
    }

    display()
    {   
        this.treeInfo.forEach(element => {
            this.tree.axiom = element[4];
            this.scene.pushMatrix();
            this.scene.translate(element[0], element[1], element[2]);
            this.tree.display();
            this.scene.popMatrix();
        });
    }
}

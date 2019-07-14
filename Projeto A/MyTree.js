/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTree extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius)
    {
		super(scene);
        this.init();

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;

        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
    }
    
    init()
    {
        var sides = 16;

        // Calcular coordenadas de textura para o cone
        var treeCoords = [];
        var ang = 0;
        var alphaAng = 2*Math.PI/sides;
        for(var i = 0; i < sides; i++)
        {
            treeCoords.push(2*(0.5*Math.cos(ang)+0.5), 2*(-0.5*Math.sin(ang)+0.5));
            ang+=alphaAng;
        }
        treeCoords.push(1,1);


        this.trunk = new MyCylinder(this.scene, sides, [2,1]);
        this.treeTop = new MyCone(this.scene, sides, treeCoords);
    }
    
    display()
    {
        this.scene.pushMatrix();
        this.scene.materials[this.scene.MAT_TREE_TRUNK].apply();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.trunk.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.materials[this.scene.MAT_TREE_LEAVES].apply();
        this.scene.translate(0, this.trunkHeight, 0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.treeTop.display();
        this.scene.popMatrix();
    }
}
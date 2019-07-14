/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init(scene);
	}
	init(scene) {
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.leftSmallTriangle = new MySmallTriangle(scene);
        this.rightSmallTriangle = new MySmallTriangle(scene);
        this.leftBigTriangle = new MySmallTriangle(scene);
        this.rightBigTriangle = new MySmallTriangle(scene);
        this.diamond = new MyDiamond(scene);
    }
    display() {
        // vertice do parelelogramo     -> x = -2
        // triangle                     -> lado = sqrt(8)
        // distancia vertice - origem   -> lado / 2 = sqrt(8) / 2 = 2*sqrt(2)/2 = sqrt(2)
        // origem do triangulo          -> x = -2 - sqrt(2)

        this.scene.pushMatrix();
        this.scene.translate(-2 - Math.SQRT2, 0, 0);
        this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
        //this.scene.setDiffuse(1,0.608,0.812);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        //this.scene.setDiffuse(1,1,0,);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        //this.scene.setDiffuse(0.588, 0.314, 0.745);
        this.leftSmallTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 1, 0);
        this.scene.scale(2, 2, 2);
        //this.scene.setDiffuse(1, 0.608, 0);
        this.leftBigTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.scale(2, 2, 2);
        //this.scene.setDiffuse(0, 0.608, 1);
        this.rightBigTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 1, 0);
        //this.scene.setDiffuse(0, 1, 0,1);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5, 0, 0);
        //this.scene.setDiffuse(1, 0.106, 0.106);
        this.rightSmallTriangle.display();
        this.scene.popMatrix();
    }
}


/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWing extends CGFobject {
    constructor(scene) {

        super(scene);

        this.ang = 10;
        this.maxAng = MyScene.degToRad(10);

        this.init();
    }

    init() {
        this.quad = new MyQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);
    }

    update(t) {


        var wingSpeed = (this.scene.bird.maxSpeed/3 - (1))*(this.scene.bird.vel - (0))/(this.scene.bird.maxSpeed - (0)) + 1;
        wingSpeed = Math.min(10, wingSpeed);
        // var wingSpeed = Math.max(1, wingSpeed);

        //console.log(wingSpeed);
        
        var sineAng = Math.sin(wingSpeed * t * this.scene.PI2);

        //[0 - 360] -> [-10 - 10]


        this.ang = (this.maxAng - (-this.maxAng))*(sineAng - (-1))/(1 - (-1)) + (-this.maxAng);


        //this.ang = angR / MyScene.degToRad(36);

        //console.log(MyScene.radToDeg(this.ang));
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-this.ang, 0, 0, 1);
        
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.5);
        this.scene.rotate(Math.PI / 18, 0, 0, 1);
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.25);
        this.scene.rotate(-Math.PI / 18, 0, 0, 1);
        this.scene.translate(1.94, 0.345, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.triangle.display();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();








        // this.scene.translate(1.245, 0.205, 0);
        // this.scene.translate(1.2, 0, 0);
        // this.scene.rotate(-Math.PI, 1, 0, 0);
        // this.scene.scale(1.25, 0.5, 1);
        // this.scene.rotate(Math.PI, 1, 0, 0);
        // this.triangle.display();
    }
}
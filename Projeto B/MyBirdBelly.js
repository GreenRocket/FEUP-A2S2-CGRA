/**
 * MyBirdBelly
 * @constructord
 * @param scene - Reference to MyScene object
 */
class MyBirdBelly extends CGFobject {
    constructor(scene) {

        super(scene);

        this.init();
    }

    init() {
        this.cube = new MyUnitCubeQuad(this.scene, this.scene.MAT_WOOD, this.scene.MAT_WOOD, this.scene.MAT_WOOD, [4, 4]);
        this.cone = new MyCone(this.scene, 4);
        this.wing = new MyWing(this.scene);
        this.neck = new MyCylinder(this.scene, 6);
        this.sphere = new MySphere(this.scene, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(MyScene.degToRad(-15), 1, 0, 0);

        this.scene.pushMatrix();
        this.scene.scale(0.7, 0.7, 1.5);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wing.display();
        this.scene.scale(-1, 1, 1);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.translate(0, 0.4, 1.15);
        this.scene.rotate(MyScene.degToRad(30), 1, 0, 0);
        this.scene.scale(0.2, 0.5, 0.2);
        this.neck.display();

        this.scene.popMatrix();

    }
}
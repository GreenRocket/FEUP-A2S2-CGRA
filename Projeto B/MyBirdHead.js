/**
 * MyBirdHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBirdHead extends CGFobject {
    constructor(scene, featherMat) {

        super(scene);

        this.featherMat = featherMat;

        this.init();
    }

    init() {
        this.beakMat = new CGFappearance(this.scene);
		this.beakMat.setAmbient(0.3, 0.3, 0.3, 1);
		this.beakMat.setDiffuse(0.7, 0.7, 0.7, 1);
		this.beakMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.beakMat.setShininess(120);
        this.beakMat.loadTexture('images/beak.png');
        this.beakMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.eyeMat = new CGFappearance(this.scene);
		this.eyeMat.setDiffuse(1.0, 1.0, 1.0, 1);
		this.eyeMat.setSpecular(0.9, 0.9, 0.9, 1);
        this.eyeMat.setShininess(120);

        this.pupilMat = new CGFappearance(this.scene);
		this.pupilMat.setAmbient(0.3, 0.3, 0.3, 1);
		this.pupilMat.setDiffuse(0.7, 0.7, 0.7, 1);
		this.pupilMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.pupilMat.setShininess(120);
        this.pupilMat.loadTexture('images/eye.png');
        this.pupilMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        this.cube = new MyUnitCubeQuad(this.scene, this.pupilMat, this.eyeMat, this.eyeMat, [1, 1]);
        this.cone = new MyCone(this.scene, 4);
        this.sphere = new MySphere(this.scene, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, -0.1, 0.95);
        this.scene.rotate(-Math.PI/18,1,0,0);

        this.scene.pushMatrix();
        this.scene.translate(0, 1.3, 0.8);
        this.scene.scale(0.3, 0.3, 0.6);
        this.featherMat.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 1.5, 1.1);
        this.scene.scale(0.15, 0.15, 0.15);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.5, 1.1);
        this.scene.scale(0.15, 0.15, 0.15);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.3, 1.3);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.1, 2, 0.1);
        this.beakMat.apply();
        this.cone.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
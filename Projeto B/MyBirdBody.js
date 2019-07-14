/**
 * MyBirdBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBirdBody extends CGFobject {
    constructor(scene, bird) {

        super(scene);

        this.scene = scene;

        this.bird = bird;

        this.init();
    }

    init() {
        this.featherMat = new CGFappearance(this.scene);
		this.featherMat.setAmbient(0.3, 0.3, 0.3, 1);
		this.featherMat.setDiffuse(0.7, 0.7, 0.7, 1);
		this.featherMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.featherMat.setShininess(120);
        this.featherMat.loadTexture('images/feathers.jpg');
        this.featherMat.setTextureWrap('REPEAT', 'REPEAT');

        this.head = new MyBirdHead(this.scene, this.featherMat);
        this.belly = new MyBirdBelly(this.scene);

        this.oscillate = true;
        this.oscillationOffset = 0;
        this.oscillationAmp = 0.2;
        this.oscillationFreq = 1;
        this.timer = 0;
        this.dir = 1;

    }

    update(dt) {  
        this.timer += dt;
        if(this.timer >= 1)
            this.timer = 0;

        if(this.oscillate)
            this.oscillationOffset = this.oscillationAmp * Math.sin( this.oscillationFreq * this.timer * this.scene.PI2);

        this.belly.wing.update(this.timer);
    }

    setOscillate(b) {
        this.oscillate = b;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5 * this.bird.scaleFactor, 0.5 * this.bird.scaleFactor, 0.5 * this.bird.scaleFactor);
        this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
        this.scene.translate(0, this.oscillationOffset, 0);

        this.scene.pushMatrix();
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.featherMat.apply();
        this.belly.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.framerate = 60;
        this.changeFramerate(this.framerate);
        this.lastUpdate = Date.now();


        this.PI2 = Math.PI * 2;
        this.drawForest = true;


        //Initialize scene objects
        //this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.bird = new MyBird(this, [0, 3, 0]);
        this.lightning = new MyLightning(this);

        this.house = new MyHouse(this);
        this.nest = new MyNest(this,6, [1, 3, -13]);

        this.forest = new MyForest(this);

        this.branchPos = [  [-2, -0.4, -5],
                            [-3, -0.4, 6],
                            [4, -0.4, 7],
                            [5, -0.4, 0],
                            [-8, -0.4, -8]];

        this.branchArray = [];
                            
        this.branchPos.forEach(element => {
            this.branchArray.push(new MyTreeBranch(this,element, Math.random()*this.PI2));
        });


        this.skybox = new MyCubeMap(this);
        this.skyboxMat = new CGFappearance(this);
        this.skyboxMat.setAmbient(1, 1, 1, 1);
        this.skyboxMat.setEmission(1,1,1,1);
        this.skyboxMat.loadTexture('images/skybox.jpg');
        this.skyboxMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


        // /////////////////// DEBUG /////////////////
        this.asd = new CGFappearance(this);
		this.asd.setColor(1.0, 1.0, 1.0, 1);
		this.asd.setEmission(1.0, 1.0, 1.0, 1);
		this.asd.setSpecular(0, 0, 0, 1);
        this.asd.setShininess(120);
        //this.cube = new MyUnitCubeQuad(this, this.asd, this.asd,this.asd, [1, 1]);
        // //////////////////////////////////////////
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    
    update(t){

        
        var dt = (t - this.lastUpdate)/1000;
        this.lastUpdate = t;

        this.checkKeys(t);

        this.bird.update(dt);
        this.lightning.update(t);
    }


    checkKeys(t) {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(1);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-1);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.bird.turn(-1);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.bird.turn(1);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.bird.reset();
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.bird.startDive(t);
        }
        if (this.gui.isKeyPressed("KeyL") && !this.lightning.running) {
            this.lightning.startAnimation(t);
        }
    }

    changeFramerate(val)
    {
        this.setUpdatePeriod(1000/val);
    }


    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        //this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.scale(200, 200, 200);
        this.skyboxMat.apply();
        this.skybox.display();
        this.popMatrix();

        this.terrain.display();

        this.pushMatrix();
        this.translate(1,0,-16);
        this.scale(0.8,0.8,0.8);
        this.house.display();
        this.popMatrix();
        
        
        this.branchArray.forEach(element => {
            element.display();
        });

        this.nest.display();

        this.bird.display();

        if(this.drawForest)
            this.forest.display();

        this.pushMatrix();
        this.translate(0, 10, -18);
        this.asd.apply();
        this.lightning.display();
        this.popMatrix();


        //////////// DEBUG /////////////////
        // //left
        // this.pushMatrix();
        // this.translate(-10, 0, 0);
        // this.scale(0.1, 1, 20);
        // this.cube.display();
        // this.popMatrix();

        // // right
        // this.pushMatrix();
        // this.translate(10, 0, 0);
        // this.scale(0.1, 1, 20);
        // this.cube.display();
        // this.popMatrix();

        // // bottom
        // this.pushMatrix();
        // this.translate(0, 0, 10);
        // this.scale(20, 1, 0.1);
        // this.cube.display();
        // this.popMatrix();

        // // top
        // this.pushMatrix();
        // this.translate(0, 0, -10);
        // this.scale(20, 1, 0.1);
        // this.cube.display();
        // this.popMatrix();
        // ///////////////////////////////////

        // ---- END Primitive drawing section
    }


    static radToDeg(rad) {
        return rad * 57.2957795131;
    }

    static degToRad(deg) {
        return deg * 0.01745329251;
    }
}
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
        this.initMaterials();

        //Background color
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Objects connected to MyInterface
        this.axiom = "X";

        this.ruleF = "FF";

        this.ruleX = "F[-X][X]F[-X]+X";
        this.ruleX2 = "F[-X][x]+X";
        this.ruleX3 = "F[+X]-X";
        this.ruleX4 = "F[/X][X]F[\\X]+X";
        this.ruleX5 = "F[\X][X]/X";
        this.ruleX6 = "F[/X]\X";
        this.ruleX7 = "F[^X][X]F[&X]^X";
        this.ruleX8 = "F[^X]&X";
        this.ruleX9 = "F[&X]^X";



        this.ruleXZ3 = "F[+X]-X";


        this.angle = 30.0;
        this.iterations = 4;
        this.scaleFactor = 0.5;
        this.lSystem = new MyLSPlant(this);

        this.doGenerate = function () {
            this.lSystem.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X": [  this.ruleX, this.ruleX2, this.ruleX3,
                            this.ruleX4, this.ruleX5, this.ruleX6,
                            this.ruleX7, this.ruleX8, this.ruleX9
                        ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }

        // do initial generation
        this.doGenerate();

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        
    }

    initMaterials() {

        this.brownMat = new CGFappearance(this);
        this.brownMat.setAmbient(1, 1, 1, 1);
        this.brownMat.setDiffuse(0.5, 0.3, 0.1, 1);
        this.brownMat.setSpecular(0.1, 0.1, 0.1, 1);

        this.greenMat = new CGFappearance(this);
        this.greenMat.setAmbient(1, 1, 1, 1);
        this.greenMat.setDiffuse(0.2, 0.9, 0.3, 1);
        this.greenMat.setSpecular(0.1, 0.1, 0.1, 1);
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(3.85, 4.35, 60), vec3.fromValues(3.85, 4.35, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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
        this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.lSystem.display();

        // ---- END Primitive drawing section
    }
}
/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        this.initKeys();

        this.gui.add(this.scene, 'drawForest').name('Floresta');
        this.gui.add(this.scene.bird, 'maxSpeed', 0.1, 20).name('maxSpeed');
        this.gui.add(this.scene.bird, 'accelRate', 1, 40).step(1).name('accelRate');
        this.gui.add(this.scene.bird, 'turnRate', 45, 360).onChange(this.scene.bird.setTurnRate.bind(this.scene.bird)).step(1).name('turnRate');
        this.gui.add(this.scene.bird, 'scaleFactor', 0.5, 3).name('scaleFactor');
        this.gui.add(this.scene, 'framerate', 1, 120).onChange(this.scene.changeFramerate.bind(this.scene)).step(1).name('updatePeriod');

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
        }
        
}
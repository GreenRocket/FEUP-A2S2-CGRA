/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
        this.initMaterials();
    }
    initObjects() {

        var leftSmallTexCoords = [
            0 / 512, 0 / 512,
            128 / 512, 128 / 512,
            0 / 512, 256 / 512
        ];

        var rightSmallTexCoords = [
            128 / 512, 384 / 512,
            256 / 512, 256 / 512,
            384 / 512, 384 / 512
        ];

        var leftBigTexCoords = [
            512 / 512, 0 / 512,
            256 / 512, 256 / 512,
            0 / 512, 0 / 512
        ];

        var rightBigTexCoords = [
            512 / 512, 512 / 512,
            256 / 512, 256 / 512,
            512 / 512, 0 / 512
        ];

        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.leftSmallTriangle = new MySmallTriangle(this.scene, leftSmallTexCoords);
        this.rightSmallTriangle = new MySmallTriangle(this.scene, rightSmallTexCoords);
        this.leftBigTriangle = new MySmallTriangle(this.scene, leftBigTexCoords);
        this.rightBigTriangle = new MySmallTriangle(this.scene, rightBigTexCoords);
        this.diamond = new MyDiamond(this.scene);
    }

    initMaterials() {

        this.materials = [];
        this.materialIDs = {
            'triangle': 0,
            'parallelogram': 1,
            'leftSmallTriangle': 2,
            'rightSmallTriangle': 3,
            'leftBigTriangle': 4,
            'rightBigTriangle': 5,
            'diamond': 6
        };

        for (let index = 0; index < 7; index++) {
            var mat = new CGFappearance(this.scene);
            //mat.setAmbient(0.0, 0.0, 0.0, 1.0);
            mat.setAmbient(0.1, 0.1, 0.1, 1);
            mat.setDiffuse(0.9, 0.9, 0.9, 1);
            mat.setSpecular(0.8, 0.8, 0.8, 1.0);
            mat.setShininess(10.0);
            mat.loadTexture('images/tangram.png');
            mat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
            this.materials.push(mat);
        }

        // this.materials[this.materialIDs["triangle"]].setDiffuse(1,0.608,0.812);
        // this.materials[this.materialIDs["parallelogram"]].setDiffuse(1,1,0);
        // this.materials[this.materialIDs["leftSmallTriangle"]].setDiffuse(0.588, 0.314, 0.745);
        // this.materials[this.materialIDs["rightSmallTriangle"]].setDiffuse(1, 0.106, 0.106);
        // this.materials[this.materialIDs["leftBigTriangle"]].setDiffuse(1, 0.608, 0);
        // this.materials[this.materialIDs["rightBigTriangle"]].setDiffuse(0, 0.608, 1);
        // this.materials[this.materialIDs["diamond"]].setDiffuse(0, 1, 0,1);
    }

    display() {
        // vertice do parelelogramo     -> x = -2
        // triangle                     -> lado = sqrt(8)
        // distancia vertice - origem   -> lado / 2 = sqrt(8) / 2 = 2*sqrt(2)/2 = sqrt(2)
        // origem do triangulo          -> x = -2 - sqrt(2)

        this.scene.pushMatrix();
        this.scene.translate(-2 - Math.SQRT2, 0, 0);
        this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
        this.materials[this.materialIDs["triangle"]].apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.materials[this.materialIDs["parallelogram"]].apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.materials[this.materialIDs["leftSmallTriangle"]].apply();
        this.leftSmallTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 1, 0);
        this.scene.scale(2, 2, 2);
        this.materials[this.materialIDs["leftBigTriangle"]].apply();
        this.leftBigTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.scale(2, 2, 2);
        this.materials[this.materialIDs["rightBigTriangle"]].apply();
        this.rightBigTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5, 0, 0);
        this.materials[this.materialIDs["rightSmallTriangle"]].apply();
        this.rightSmallTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 1, 0);
        this.materials[this.materialIDs["diamond"]].apply();
        //this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

    }

    updateBuffers(complexity) {
    }

    enableNormalViz() {
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.leftSmallTriangle.enableNormalViz();
        this.rightSmallTriangle.enableNormalViz();
        this.leftBigTriangle.enableNormalViz();
        this.rightBigTriangle.enableNormalViz();
        this.diamond.enableNormalViz();
    }

    disableNormalViz() {
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.leftSmallTriangle.disableNormalViz();
        this.rightSmallTriangle.disableNormalViz();
        this.leftBigTriangle.disableNormalViz();
        this.rightBigTriangle.disableNormalViz();
        this.diamond.disableNormalViz();
    }
}


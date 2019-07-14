/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene
{
    constructor()
    {
        super();
    }

    init(application)
    {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        // this.gl.enable(this.gl.BLEND);                                                              
        // this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.cubemap = new MyCubeMap(this);        
        this.ground = new MyQuad(this);
        this.ground.setUVTiling([50,50]);
        this.voxelhill = new MyVoxelHill(this, 10);
        this.treeGroup = new MyTreeGroupPatch(this, 3, 1, 3, 2, 3, 3);
        this.treeRow = new MyTreeRowPatch(this, 3, 1, 3, 2, 6);
        this.house = new MyHouse(this);
        this.firepit = new MyFirepit(this, 6);
        this.river = new MyPlane(this, 50);


        this.LIGHT_MODES = { 'Day': 0 , 'Night': 1, 'Night w/ fire': 2 };
        this.activeLights = [0];
        this.lightMode = 0;
        this.setLightMode();
        

        this.texturesEnabled = true;
        this.rotAng = 0;
        this.frequency = 10;
        this.amplitude = 0.02;
        this.setUpdatePeriod(1 / 60);

        this.enableTextures(this.texturesEnabled);
    }

    initLights()
    {
        ///////////////////////////////////////////////////////////////////////
        // Day
        this.lights[0].setPosition(0, 50, 0, 1);
        //this.lights[0].setAmbient(1,1,1,1);
        this.lights[0].setDiffuse(1.0, 0.98039, 0.88235, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setLinearAttenuation(0.1);
        this.lights[0].enable();
        this.lights[0].update();
        this.lights[0].disable();

        ///////////////////////////////////////////////////////////////////////
        // Night
        this.lights[1].setPosition(0, 50, 0, 1);
        //this.lights[1].setAmbient(0.12157,0.08235,0.35686,1);
        this.lights[1].setDiffuse(0.12157,0.08235,0.35686,1);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setLinearAttenuation(0.1);
        this.lights[1].enable();
        this.lights[1].update();
        this.lights[1].disable();

        ///////////////////////////////////////////////////////////////////////
        // Firepit
        this.lights[2].setPosition(6, 1, 6, 1.0);
        this.lights[2].setDiffuse(1, 0.92941, 0.18824, 1.0);
        this.lights[2].setLinearAttenuation(0);
        this.lights[2].setQuadraticAttenuation(0.05);
        this.lights[2].enable();
        this.lights[2].setVisible(false);
        this.lights[2].update();
        this.lights[2].disable();

        this.lights[3].setPosition(6, 1.2, 6, 1.0);
        this.lights[3].setDiffuse(0.73725, 0.22745, 0.16078, 1.0);
        this.lights[3].setLinearAttenuation(0);
        this.lights[3].setQuadraticAttenuation(0.005);
        this.lights[3].enable();
        this.lights[3].setVisible(false);
        this.lights[3].update();
        this.lights[3].disable();
        ///////////////////////////////////////////////////////////////////////
    }

    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(140.5, 40, 99.3), vec3.fromValues(1.54, 22, -7.7));
    }

    initMaterials()
    {
        this.materials = [];
        this.MAT_SKY_DAY = 0;
        this.MAT_SKY_NIGHT = 1;
        this.MAT_GRASS = 2;
        this.MAT_DIRT_SIDE = 3;
        this.MAT_DIRT_BOTTOM = 4;
        this.MAT_TREE_TRUNK = 5;
        this.MAT_TREE_LEAVES = 6;
        this.MAT_WOOD = 7;
        this.MAT_ROCK = 8;
        this.MAT_RIVER = 9;
        this.MAT_DOOR = 10;

        var daySkyMat = new CGFappearance(this);
        daySkyMat.setAmbient(1, 1, 1, 1);
        daySkyMat.setEmission(1,1,1,1);
        daySkyMat.loadTexture('images/skybox_day.jpg');
        daySkyMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(daySkyMat);

        var nightSkyMat = new CGFappearance(this);
        nightSkyMat.setAmbient(1, 1, 1, 1);
        nightSkyMat.setEmission(1,1,1,1);
        nightSkyMat.setEmission(0.12157,0.08235,0.35686,1);
        nightSkyMat.loadTexture('images/skybox_night.jpg');
        nightSkyMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(nightSkyMat);

        var grassMat = new CGFappearance(this);
        grassMat.setAmbient(1, 1, 1, 1);
        grassMat.setDiffuse(0.9, 0.9, 0.9, 1);
        grassMat.setSpecular(0.1, 0.1, 0.1, 1);
        grassMat.loadTexture('images/mineTop.png');
        grassMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(grassMat);

        var dirtSideMat = new CGFappearance(this);
        dirtSideMat.setAmbient(1, 1, 1, 1);
        dirtSideMat.setDiffuse(0.9, 0.9, 0.9, 1);
        dirtSideMat.setSpecular(0.1, 0.1, 0.1, 1);
        dirtSideMat.loadTexture('images/mineSide.png');
        dirtSideMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(dirtSideMat);

        var dirtBottomMat = new CGFappearance(this);
        dirtBottomMat.setAmbient(1, 1, 1, 1);
        dirtBottomMat.setDiffuse(0.9, 0.9, 0.9, 1);
        dirtBottomMat.setSpecular(0.1, 0.1, 0.1, 1);
        dirtBottomMat.loadTexture('images/mineBottom.png');
        dirtBottomMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(dirtBottomMat);

        var trunkMat = new CGFappearance(this);
        trunkMat.setAmbient(1, 1, 1, 1);
        trunkMat.setDiffuse(0.9, 0.9, 0.9, 1);
        trunkMat.setSpecular(0.1, 0.1, 0.1, 1);
        trunkMat.loadTexture('images/trunk.png');
        trunkMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(trunkMat);
        
        var treeTopMat = new CGFappearance(this);
        treeTopMat.setAmbient(1, 1, 1, 1);
        treeTopMat.setDiffuse(0.9, 0.9, 0.9, 1);
        treeTopMat.setSpecular(0.1, 0.1, 0.1, 1);
        treeTopMat.loadTexture('images/leaves.png');
        treeTopMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(treeTopMat);

        var woodMat = new CGFappearance(this);
        woodMat.setAmbient(1, 1, 1, 1);
        woodMat.setDiffuse(0.9, 0.9, 0.9, 1);
        woodMat.setSpecular(1, 1, 1, 1);
        woodMat.setShininess(10.0);
        woodMat.loadTexture('images/wood.png');
        woodMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(woodMat);

        var rockMat = new CGFappearance(this);
        rockMat.setAmbient(1, 1, 1, 1);
        rockMat.setDiffuse(0.9, 0.9, 0.9, 1);
        rockMat.setSpecular(0.1, 0.1, 0.1, 1);
        rockMat.loadTexture('images/rock.png');
        rockMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(rockMat);

        var riverMat = new CGFappearance(this);
        riverMat.setAmbient(1, 1, 1, 1);
        riverMat.setDiffuse(0.9, 0.9, 0.9, 1);
        riverMat.setSpecular(1, 1, 1, 1);
        riverMat.setShininess(10.0);
        riverMat.loadTexture('images/water.jpg');
        riverMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(riverMat);

        var doorMat = new CGFappearance(this);
        doorMat.setAmbient(1, 1, 1, 1);
        doorMat.setDiffuse(0.9, 0.9, 0.9, 1);
        doorMat.setSpecular(0.1, 0.1, 0.1, 1);
        doorMat.loadTexture('images/door.png');
        doorMat.setTextureWrap('REPEAT', 'REPEAT');
        this.materials.push(doorMat);
    }

    setLightMode()
    {
        // Desligar luzes do modo anterior
        while (this.activeLights.length > 0)
        {
            var temp = this.activeLights.pop();
            this.lights[temp].disable();
        }
        
        // Definir luzes consoante o modo atual
        switch (this.lightMode)
        {
            case '0':
            case 0:
            this.activeLights.push(0);
            break;
            case '1':
            case 1:
            this.activeLights.push(1);
            break;
            case '2':
            case 2:
            this.activeLights.push(1);
            this.activeLights.push(2);
            this.activeLights.push(3);
            break;
            default:
            break;
        }

        // Ativar luzes do modo atual
        for (var i = 0; i < this.activeLights.length; i++)
        {
            this.lights[this.activeLights[i]].setVisible(true);
            this.lights[this.activeLights[i]].enable();
        }
    }

    display()
    {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Update lights
        for (var i = 0; i < 7; i++)
            this.lights[i].update();

        // Cubemap
        this.pushMatrix();
        this.scale(200, 200, 200);
        this.materials[((this.lightMode == 0) ? this.MAT_SKY_DAY : this.MAT_SKY_NIGHT)].apply();
        this.cubemap.display();
        this.popMatrix();

        // Ground
        this.pushMatrix();
        this.scale(100, 1, 100);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.materials[this.MAT_GRASS].apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.ground.setUVTiling([50,50]);
        this.ground.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(60,0,0);
        this.scale(20, 1, 100);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.materials[this.MAT_GRASS].apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.ground.setUVTiling([10,50]);
        this.ground.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0,0,50);
        this.scale(100, 1, 20);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.materials[this.MAT_GRASS].apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.ground.setUVTiling([50,10]);
        this.ground.display();
        this.popMatrix();

        //River
        this.pushMatrix();
        this.translate(-20,0.1,35);
        this.scale(120, 1, 10);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.materials[this.MAT_RIVER].apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.river.display();
        this.popMatrix();

        // Voxelhill
        this.pushMatrix();
        this.translate(-69, 0, 0);
        this.scale(2,2,2);
        this.voxelhill.updateLevels(10);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-63, 0, 20);
        this.scale(2,2,2);
        this.voxelhill.updateLevels(7);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-80, 2, 25);
        this.scale(2,2,2);
        this.voxelhill.updateLevels(4);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-95, 0, -20);
        this.scale(2,2,2);
        this.voxelhill.updateLevels(20);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-63, 0, -28);
        this.scale(2,2,2);
        this.voxelhill.updateLevels(7);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-31, 0, -31);
        this.scale(2,2,2);
        this.voxelhill.updateLevels(10);
        this.voxelhill.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(36.5, 0, -36.5);
        this.voxelhill.updateLevels(14);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(36.5, 0, -36.5);
        this.voxelhill.updateLevels(14);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20, 0, -70);
        this.voxelhill.updateLevels(25);
        this.voxelhill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-30, 0, -70);
        this.voxelhill.updateLevels(20);
        this.voxelhill.display();
        this.popMatrix();

        // Trees
        this.pushMatrix();
        this.translate(-20, 0, 45);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(9, 0, 45);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-9, 0, -45);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(9, 0, -45);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(Math.PI*0.5, 0,1,0);
        this.translate(-25, 0, -45);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-45, 0, -10);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(15, 0, -20);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(Math.PI*0.5, 0,1,0);
        this.translate(-15, 0, 45);
        this.treeRow.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(50, 0, 0);
        this.treeGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(55, 0, -22);
        this.treeGroup.display();
        this.popMatrix();

        // Fireplace
        this.pushMatrix();
        this.translate(6, 0, 6);
        this.firepit.display();
        this.popMatrix();
        
        this.house.display();
    }

    updateFirepit()
    {
        var c = this.amplitude * Math.cos(this.rotAng * this.frequency);
        var s = this.amplitude * Math.sin(this.rotAng * this.frequency);
        this.lights[2].position[0] += c;
        this.lights[2].position[1] -= s;
        this.lights[3].position[0] -= s;
        this.lights[3].position[1] += c;
    }

    update(t) 
    {
        this.rotAng += (this.updatePeriod);
        if (this.rotAng > 2 * Math.PI)
            this.rotAng = 0;

        if (this.lightMode == 2)
        {
            this.updateFirepit();
        }
    }
}
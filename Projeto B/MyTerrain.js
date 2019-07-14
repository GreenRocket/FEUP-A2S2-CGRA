/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject
{
	constructor(scene) {
		super(scene);
		this.init();
	}
    init()
    {
        this.plane = new Plane(this.scene, 70);
        
        this.terrainTex = new CGFtexture(this.scene, "images/terrain_texture2.png");
        this.terrainHeight = new CGFtexture(this.scene, "images/terrain_heightmap3.png");
		this.terrainGrad = new CGFtexture(this.scene, "images/altimetry.png");
        
        this.terrainMat = new CGFappearance(this.scene);
		this.terrainMat.setAmbient(0.3, 0.3, 0.3, 1);
		this.terrainMat.setDiffuse(0.7, 0.7, 0.7, 1);
		this.terrainMat.setSpecular(0.0, 0.0, 0.0, 1);
        this.terrainMat.setShininess(120);
        
		this.terrainMat.setTexture(this.terrainTex);


        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({ uSampler2: 1, uSampler3: 2  });
        
		//this.terrainShader.setUniformsValues({ normScale: this.scaleFactor });
    }

    display()
    {
		this.scene.setActiveShader(this.terrainShader);
        this.terrainHeight.bind(1);
        this.terrainGrad.bind(2);
        
        this.scene.pushMatrix();
        this.terrainMat.apply();
        this.scene.translate(0, -3.5, -3);
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(70, 70, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

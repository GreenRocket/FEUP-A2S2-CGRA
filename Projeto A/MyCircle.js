/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCircle extends CGFobject
{

    constructor(scene, slices)
    {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }


    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];


        // Definir passo do angulo em função do nº de lados
        var theta = 0;
        var thetaStep = 2 * Math.PI / this.slices;

        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);
        var cosThetaNext, sinThetaNext;

        // Adicionar vértice inicial
        this.vertices.push(cosTheta, 0, sinTheta);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5*cosTheta+0.5, -0.5*sinTheta+0.5);

        for (var i = 0; i < this.slices-1; i++)
        {
            // Calculo do proximo angulo
            cosThetaNext = Math.cos(theta + thetaStep);
            sinThetaNext = Math.sin(theta + thetaStep);

            this.vertices.push(cosThetaNext, 0, sinThetaNext);

            this.normals.push(0, 1, 0);

            this.texCoords.push(0.5*cosTheta+0.5, -0.5*sinTheta+0.5);
            
            theta += thetaStep;
            cosTheta = cosThetaNext;
            sinTheta = sinThetaNext;
        }

        // Adicionar vertice final (que coincide com o inicial)
        this.vertices.push(1, 0, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(1, 0);
        
        this.vertices.push(0,0,0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);
        
        for (var i = 0; i < this.slices; i++)
        {
            this.indices.push((this.slices+1), i + 1, i);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(slices) {
        this.slices = slices;
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
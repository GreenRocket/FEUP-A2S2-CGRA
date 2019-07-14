/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPrism extends CGFobject
{
    constructor(scene, slices, tileScaleVec)
    {
        super(scene);
        this.slices = slices;
        this.tileScaleVec = (tileScaleVec != undefined) ? tileScaleVec : [1,1];
        this.initBuffers();
    }

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Definir passo do angulo em função do nº de faces
        var theta = 0;
        var thetaStep = 2 * Math.PI / this.slices;

        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);
        var cosThetaNext, sinThetaNext;
        var dx, dz, d;
  
        for(var i = 0; i < this.slices; i++)
        {
            // Calculo do proximo angulo
            cosThetaNext = Math.cos(theta + thetaStep);
            sinThetaNext = Math.sin(theta + thetaStep);

            this.vertices.push(cosTheta, 0, sinTheta);
            this.vertices.push(cosThetaNext, 0, sinThetaNext);
            this.vertices.push(cosThetaNext, 1, sinThetaNext);
            this.vertices.push(cosTheta, 1, sinTheta);
    
            this.indices.push( (4*i), (4*i+3), (4*i+2) );
            this.indices.push( (4*i), (4*i+2), (4*i+1) );

            //calculo do vetor paralelo à face
            dx = cosThetaNext - cosTheta;
            dz = sinThetaNext - sinTheta;  
            d  = Math.sqrt(dx * dx + dz * dz);

            //corresponde ao vetor normal, usando o vetor paralelo à face 
            this.normals.push(dz/d,0,-dx/d);
            this.normals.push(dz/d,0,-dx/d);
            this.normals.push(dz/d,0,-dx/d);
            this.normals.push(dz/d,0,-dx/d);

            theta += thetaStep;
            cosTheta = cosThetaNext;
            sinTheta = sinThetaNext;
        }

        // Mapear coordenadas de textura em torno das faces (tileScaleVec controlo tiling)
        this.calcUVCoords(this.tileScaleVec);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    calcUVCoords(tileScaleVec)
    {
        var uvSlice = 1 / this.slices;
        for(var i = this.slices - 1; i >= 0; i--)
        {
            this.texCoords.push(tileScaleVec[0] * uvSlice * (i+1), tileScaleVec[1]);
            this.texCoords.push(tileScaleVec[0] * uvSlice * i, tileScaleVec[1]);
            this.texCoords.push(tileScaleVec[0] * uvSlice * i, 0);
            this.texCoords.push(tileScaleVec[0] * uvSlice * (i+1), 0);
        }
        this.updateTexCoordsGLBuffers();
    }

    updateBuffers(slices)
    {
        this.slices = slices;
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;
uniform sampler2D uSampler2;


void main()
{
	vTextureCoord = aTextureCoord;

    vec4 map = texture2D(uSampler2, vTextureCoord);
    float mag = map.r;
    vTextureCoord2 = vec2(map.r, map.r);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * 10.0 * mag, 1.0);
}
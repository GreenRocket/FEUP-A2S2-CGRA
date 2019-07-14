attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float normScale;
uniform float timeFactor;


void main()
{
	vTextureCoord = aTextureCoord;
    vec4 map = texture2D(uSampler2, vTextureCoord + vec2(0.01,0.01)*timeFactor);
    float mag = map.r;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * normScale * 0.002 * mag, 1.0);
}
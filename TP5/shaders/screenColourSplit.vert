precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying float screenPos;

void main()
{
	vec4 pos = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    screenPos = pos.y;
    gl_Position = pos;
}
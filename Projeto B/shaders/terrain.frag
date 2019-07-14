#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

varying vec2 vTextureCoord2;

uniform sampler2D uSampler;
uniform sampler2D uSampler3;

void main()
{
	vec4 grad = texture2D(uSampler3, -vTextureCoord2);
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	float weight = 0.5;

	gl_FragColor = color * weight + grad * (1.0-weight);
}

precision mediump float;

varying float screenPos;

void main()
{
	if (screenPos > 0.5)
    {
		gl_FragColor =  vec4(0.9,0.9,0.0, 1.0);
    }
	else
	{
		gl_FragColor = vec4(0.55,0.55,0.9, 1.0);
	}
}
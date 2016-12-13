varying vec2 vUv;
uniform sampler2D venusatmos;

void main() {

    // colour is RGBA: u, v, 0, 1
    vec4 texture = texture2D(venusatmos,vUv);
    //glEnable (GL_BLEND);
    //glBlendFunc (0.1, 0.9);
    gl_FragColor = vec4(texture.xyz, 0.);

}

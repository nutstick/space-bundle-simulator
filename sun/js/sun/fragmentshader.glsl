varying vec2 vUv;
uniform sampler2D sunmap;
uniform float opacity;

void main() {

    // colour is RGBA: u, v, 0, 1
    vec4 texture = texture2D(sunmap,vUv);
    gl_FragColor = vec4(texture.xyz, 1.);

}

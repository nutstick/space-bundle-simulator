precision mediump float;

uniform float coeficient;
uniform float power;
uniform vec3 glowColor;

varying vec3 vNormal;

void main () {
  float intensity = pow( coeficient - dot( vNormal, vec3( 0., 0., 1. )), power );
  gl_FragColor = vec4( glowColor * intensity, 1.0 );
}
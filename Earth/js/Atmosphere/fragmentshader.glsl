precision mediump float;

uniform sampler2D earthMap;
uniform sampler2D bumpMap;
uniform sampler2D specMap;
uniform float bumpScale;
uniform vec2 resolution;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;
varying vec2 vUv;

vec3 rotate(const vec3 v, float theta, const vec3 axis) {
  float cosTheta = cos( theta );
  return v * cosTheta + cross( axis, v ) * sin( theta ) + axis * dot( v, axis ) * ( 1.0 - cosTheta );
}

void main(void) {

  vec2 position = gl_FragCoord.xy / resolution.xy - vec2( 0.5 );
  position *= vec2( 1, resolution.y / resolution.x );
  position *= 4.;

  vec3 uv = normalize(
    rotate( vec3( position, -1. ), 0., vec3( 0, 1, 0 ) )
  );

  float theta = acos( dot( normalize(vNormal), normalize(vView) ) ) * 0.58;
  float intensity = pow( -theta, 4.0 );
  vec3 glowColor = vec3(0.592, 0.917, 0.956);

  // gl_FragColor = vec4( vec3(132. / 255., 1., 1.), theta );
  gl_FragColor = vec4( glowColor * intensity, theta / 1.58 );
  // gl_FragColor = addedLights;
  // gl_FragColor = texture2D(earthMap, vUv) * addedLights;
  // gl_FragColor = texture2D(earthMap, vUv) * addedLights * invertSpecular
  //  + vec4(0.0, 1.0, 1.0, 1.0) * addedLights * specular;
}

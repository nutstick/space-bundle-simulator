precision mediump float;

varying vec2 vUv;
varying vec3 fNormal;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float bumpScale;
uniform sampler2D bumpMap;

void main(void) {
  vec3 vEye = normalize( cameraPosition - position.xyz );
  vPosition = (modelMatrix * vec4( position, 1.0 )).xyz;
  vNormal = normalMatrix * normal;
  vUv = uv;
  fNormal = normal;

  vec4 bumpTex = texture2D(bumpMap,vUv);
  float noise = bumpTex.r;

  vec3 newPosition = (position + normal * noise * bumpScale);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

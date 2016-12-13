precision mediump float;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;
varying vec2 vUv;

uniform float time;
uniform float bumpScale;
uniform sampler2D bumpMap;

void main(void) {
  vUv = uv;

  vPosition = modelViewMatrix * vec4( position, 1.0 );

  vEye = vec3( viewMatrix * vec4( cameraPosition, 1.0 ) ); 
  vView = normalize( vEye - vPosition.xyz );
  vNormal = normalize( normalMatrix * normal );

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

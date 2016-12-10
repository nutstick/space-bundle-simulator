varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;

void main(void) {
  vec4 vPosition = modelViewMatrix * vec4( position, 1.0 );

  vEye = normalize( cameraPosition - position.xyz ); 
  vView = normalize( ( modelMatrix * vec4( vEye, 1.0 ) ).xyz );
  vNormal = normalize( ( modelMatrix * vec4( normal, 1.0 ) ).xyz );

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

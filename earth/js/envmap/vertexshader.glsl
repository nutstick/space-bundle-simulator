uniform float mRefractionRatio;
uniform float mBias;
uniform float mScale;
uniform float mPower;

varying vec4 vPosition;
varying vec3 vEye;
varying vec3 vNormal;
varying vec3 vView;

void main(void) {
  vPosition = modelViewMatrix * vec4( position, 1.0 );

  vView = normalize( cameraPosition - position.xyz ); 
  vEye = normalize( ( modelMatrix * vec4( vView, 1.0 ) ).xyz );
  vNormal = normalize( ( modelMatrix * vec4( normal, 1.0 ) ).xyz );

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

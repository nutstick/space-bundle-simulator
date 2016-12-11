precision mediump float;

struct PointLight {
  vec3 position;
  vec3 color;
};

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;

uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
uniform sampler2D bumpMap;
uniform float bumpScale;
// chunk(shadowmap_pars_vertex);

void main(void) {
  vec3 offset = normal * (texture2D(bumpMap, uv).r - 0.5) * bumpScale;
  vec3 pos = position + offset;

  vUv = uv;
  vEye = normalize( cameraPosition - position.xyz );
  vView = normalize( ( modelMatrix * vec4( vEye, 1.0 ) ).xyz );
  vNormal = normalize( ( normalMatrix * normal ).xyz );
  vPosition = ( modelMatrix * vec4( pos, 1.0 ) ).xyz;

  // chunk(shadowmap_vertex);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}

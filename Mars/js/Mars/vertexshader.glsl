precision mediump float;

struct PointLight {
  vec3 position;
  vec3 color;
};

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 viewPointLights[ NUM_POINT_LIGHTS ];

uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
uniform sampler2D bumpMap;
uniform float bumpScale;
// chunk(shadowmap_pars_vertex);

void main(void) {
  vec3 offset = normal * (texture2D(bumpMap, uv).r - 0.5) * bumpScale;
  vec3 pos = position + offset;
  vUv = uv;
  vNormal = normalMatrix * normal;
  vPosition = ( modelMatrix * vec4( pos, 1.0 ) ).xyz;
  for ( int l = 0; l < NUM_POINT_LIGHTS; l++ ) {
    viewPointLights[ l ] = ( modelViewMatrix * vec4( pointLights[ l ].position, 1.0 ) ).xyz;
  }

  // chunk(shadowmap_vertex);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}

precision mediump float;

struct PointLight {
  vec3 position;
  vec3 color;
};

uniform sampler2D textureMap;
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
    for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
      vec3 adjustedLight = pointLights[l].position;
      vec3 lightDirection = normalize(vPosition - adjustedLight);

      addedLights.rgb += dot(vNormal, lightDirection) * pointLights[l].color;
    }
    gl_FragColor = texture2D(textureMap, vUv)*addedLights;
}

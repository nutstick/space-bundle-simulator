precision mediump float;

uniform sampler2D earthMap;
uniform sampler2D bumpMap;
uniform sampler2D specMap;
uniform float bumpScale;
uniform vec3 specular;
struct PointLight {
  vec3 position;
  vec3 color;
};
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main(void) {
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
  float c;
  for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
    vec3 adjustedLight = pointLights[l].position + cameraPosition;
    vec3 lightDirection = normalize(vPosition - adjustedLight);
    
    c = 0.35 + max(0.0, dot(vNormal, lightDirection)) * 1.;
    addedLights.rgb += clamp(dot(lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;
  }


  gl_FragColor = addedLights;
  // gl_FragColor = texture2D(earthMap, vUv) * addedLights;
}

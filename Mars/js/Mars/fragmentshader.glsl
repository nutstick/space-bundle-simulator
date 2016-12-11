precision mediump float;

struct PointLight {
  vec3 position;
  vec3 color;
};
uniform sampler2D textureMap;
uniform sampler2D normalMap;
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

varying vec3 viewPointLights[ NUM_POINT_LIGHTS ];
varying vec2 vUv;
varying vec3 vPosition;

void main(void) {
  vec3 vNormal = vec3(texture2D(normalMap, vUv));
  
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
  float c;
  for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
    vec3 adjustedLight = viewPointLights[l];
    vec3 lightDirection = normalize(vPosition - adjustedLight);
    
    c = max(0.0, dot(vNormal, lightDirection)) * 1.;
    // addedLights.rgb += clamp(dot(vNormal, lightDirection), 0.0, 1.0) * pointLights[l].color;
    addedLights.rgb = dot(vNormal, lightDirection) * pointLights[l].color;
  }

  // vec4 specular = texture2D(specMap, vUv);
  // vec4 invertSpecular = vec4(1.0, 1.0, 1.0, 0.0) - specular;


  // gl_FragColor = addedLights;
  gl_FragColor = texture2D(textureMap, vUv) * addedLights;
  // gl_FragColor = texture2D(earthMap, vUv) * addedLights * invertSpecular
  //  + vec4(0.0, 1.0, 1.0, 1.0) * addedLights * specular;
}

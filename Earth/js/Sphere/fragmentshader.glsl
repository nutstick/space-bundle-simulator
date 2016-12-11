precision mediump float;

struct PointLight {
  vec3 position;
  vec3 color;
};
uniform sampler2D earthMap;
uniform sampler2D earthNMap;
uniform sampler2D bumpMap;
uniform sampler2D specMap;
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;

void main(void) {

  // Textures for day and night:
  vec3 dayColor       = texture2D( earthMap, vUv ).xyz;
  vec3 nightColor     = texture2D( earthNMap, vUv ).xyz;

  // Atmosphere:
  float intensity = 1.09 - dot( vNormal, vec3( 0.0,0.0, 1.0 ) );
  vec3 atmosphere = vec3( 1,1,1) * pow( intensity, 2.0 );

  // Specular:
  vec3 specularAmount = texture2D( specMap, vUv ).xyz;
  vec3 specularColor  = vec3(1,1,1);

  // Play with these parameters to adjust the specular:
  float c = 1.49;    // Size, I guess...
  float p = 1.;     // Blur
  float mixAmount, mixAmountSpecular;
  for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
    vec3 vLight =   pointLights[ l ].position - vPosition;
    vec3 vReflect = 2. * dot( vLight, vNormal ) * vNormal - vLight;
    // compute cosine sun to normal so -1 is away from sun and +1 is toward sun.
    float cosineAngleSunToNormal = dot( normalize( vNormal ), normalize( vLight ) );
    // sharpen the edge beween the transition
    cosineAngleSunToNormal = clamp( cosineAngleSunToNormal * 3.0, -1.0, 1.0);
    // convert to 0 to 1 for mixing
    mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;

    mixAmountSpecular = c * pow(max( 0., dot(normalize(vView), normalize(vReflect)) ), p) * (specularAmount.z * 0.5);
  }

  // Select day or night texture based on mixAmount.
  vec3 color = mix(dayColor, specularColor, mixAmountSpecular);
  color = mix( nightColor, color, mixAmount );

  // Set the color
  gl_FragColor = vec4(color, 1.0);

  // vec3 vNormal = vec3(texture2D(normalMap, vUv));
  //
  // vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
  // float c;
  // for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
  //   vec3 adjustedLight = viewPointLights[l];
  //   vec3 lightDirection = normalize(vPosition - adjustedLight);
  //
  //   c = max(0.0, dot(vNormal, lightDirection)) * 1.;
  //   // addedLights.rgb += clamp(dot(vNormal, lightDirection), 0.0, 1.0) * pointLights[l].color;
  //   addedLights.rgb = dot(vNormal, lightDirection) * pointLights[l].color;
  // }
  //
  // // vec4 specular = texture2D(specMap, vUv);
  // // vec4 invertSpecular = vec4(1.0, 1.0, 1.0, 0.0) - specular;
  //
  //
  // // gl_FragColor = addedLights;
  // gl_FragColor = texture2D(textureMap, vUv) * addedLights;
  // // gl_FragColor = texture2D(earthMap, vUv) * addedLights * invertSpecular
  // //  + vec4(0.0, 1.0, 1.0, 1.0) * addedLights * specular;
}

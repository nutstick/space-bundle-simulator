precision mediump float;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float time;
uniform float bumpScale;
uniform sampler2D bumpMap;

// xchunk(shadowmap_pars_vertex);

void main(void) {
  // xchunk(shadowmap_vertex);
  /*vec3 offset = vec3(
    sin(position.x * 10.0 + time) * 1.0,
    sin(position.y * 10.0 + time + 31.512) * 1.0,
    sin(position.z * 10.0 + time + 112.512) * 1.0
  );

  vec3 pos = position + offset;

  // just add some noise to the normal
  vNormal = normalMatrix * vec3(normal + normalize(offset) * 0.2);

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

  // store the world position as varying for lighting
  vPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
  */
  vUv = uv;
  
  vec4 bumpTex = texture2D(bumpMap, vUv);
  float noise = bumpTex.r;
  vec3 offset = normal * noise * bumpScale;

  vec3 pos = position + offset;

  vNormal = normalMatrix * vec3(normal + offset * 0.2);

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

  vPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}

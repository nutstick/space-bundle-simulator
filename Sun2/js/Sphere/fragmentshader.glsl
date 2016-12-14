precision mediump float;

uniform samplerCube cubemap;
uniform sampler2D envmap;
uniform sampler2D shiftSampler;
uniform float time;
uniform vec2 resolution;
uniform float radius;
uniform float beta;
uniform float gamma;
uniform float viewrot;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vView;

const float tanfov = 3.;

vec2 envMapEquirect(vec3 view, float flipEnvMap) {
  //I assume envMap texture has been flipped the WebGL way (pixel 0,0 is a the bottom)
  //therefore we flip wcNorma.y as acos(1) = 0
  float phi = acos(view.y);
  float theta = atan(flipEnvMap * view.z, view.x) + M_PI;
  return vec2(theta / 2.0 / M_PI, phi / M_PI);
}
  
vec2 envMapEquirect(vec3 view) {
  //-1.0 for left handed coordinate system oriented texture (usual case)
  return envMapEquirect(view, -1.0);
}

vec3 rotate(const vec3 v, float theta, const vec3 axis) {
  float cosTheta = cos(theta);
  return v * cosTheta + cross(axis, v) * sin(theta) + axis * dot(v, axis) * (1.0 - cosTheta);
}

vec4 stripes(vec3 view, float flag) {
  return vec4(flag * step(fract(5. * atan(view.z, view.x)), .8) * vec3(1., -view.y, view.y), 1.);
}

vec3 aberrate(vec3 original) {
  return vec3(-beta * length(original) + gamma * original.x, original.yz);
}

vec4 distort(vec3 view, float flag) {
  return min(
    texture2D( envmap, envMapEquirect(view) ),
    vec4(flag*vec3(1., 1., 1.), 1.)
  );
}

void main(void) {
  /*
  vec3 vReflect = reflect( vView, vNormal );
  float m = 2. * sqrt(
    pow( vReflect.x, 2. ) +
    pow( vReflect.y, 2. ) +
    pow( vReflect.z + 1., 2. )
  );
  */
  // vec2 uEnvMap = vReflect.xy / m + .5;

  
  // gl_FragColor = texture2D( envmap, envMapEquirect( vReflect ) );

  
  vec2 position  = gl_FragCoord.xy / resolution.xy - vec2(0.5);
  position *= vec2(1, resolution.y / resolution.x);
  position *= 5.;

  vec3 uv3 = normalize(
    // aberrate(
    rotate( vec3(position, -2.), viewrot, vec3(0., 1., 0.))
    // )
  );
  float theta = acos( dot( uv3, vec3(0, 0, -1) ) ) * 0.65;

  vec2 params = vec2((200. - 1.) / 9., 1. - theta / M_PI);

  vec4 distcolor = texture2D(shiftSampler, params);

  float Phi_ba = 2. * M_PI * (0.98 * distcolor.r + 0.1 * distcolor.g);
  // float Phi_ba = 2. * M_PI * (0.988 * distcolor.r + 0.1 * distcolor.g);
  float Phi = (1.-step(theta,1.0))*Phi_ba + (step(theta,1.0))*Phi_ba;

  vec3 v3 = -normalize(cross(vec3(0, 0, -1), -vView));

  vec3 uv4 = rotate(vec3(0, 0, 1.), Phi, v3);
  
  float nothorizon = max(
    smoothstep(0., 0.05, distcolor.r) * (1. - step(theta, 0.01)),
    (1. - step(theta, 2.57))
  );
  
  vec4 color = distort(normalize(uv4), nothorizon);

  // gl_FragColor = color;
  // gl_FragColor = mix( refractColor, reflectColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
  // gl_FragColor = textureCube( cubemap, uv3 );	//DEBUG: test uv
  // gl_FragColor = distcolor;
  gl_FragColor = vec4(uv3, 1.0);
  // gl_FragColor = vec4(theta * vec3(1.,1.,1.),1.);		//DEBUG: test theta
  // gl_FragColor = color;
}

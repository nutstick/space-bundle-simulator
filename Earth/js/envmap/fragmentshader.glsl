precision mediump float;

uniform sampler2D envmap;

varying vec4 vPosition;
varying vec3 vEye;
varying vec3 vNormal;
varying vec3 vView;

vec2 envMapEquirect(vec3 wcNormal, float flipEnvMap) {
  float phi = acos(-wcNormal.y);
  float theta = atan(flipEnvMap * wcNormal.x, wcNormal.z) + M_PI;
  return vec2(theta / 2.0 / M_PI, phi / M_PI);
}

vec2 envMapEquirect(vec3 wcNormal) {
  return envMapEquirect(wcNormal, -1.0);
}

void main(void) {
  vec3 vReflect = reflect( -vEye, vNormal );
  float m = 2. * sqrt(
    pow( vReflect.x, 2. ) +
    pow( vReflect.y, 2. ) +
    pow( vReflect.z + 1., 2. )
  );

  gl_FragColor = texture2D( envmap, envMapEquirect( -vEye ));
}

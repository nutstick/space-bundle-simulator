precision mediump float;

uniform sampler2D envmap;
uniform sampler2D shiftSampler;
uniform vec2 resolution;
uniform float viewrot;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;

const float tanfov = 3.;

vec2 envMapEquirect(vec3 wcNormal, float flipEnvMap) {
  float phi = acos(wcNormal.y);
  float theta = atan(flipEnvMap * wcNormal.x, wcNormal.z) + M_PI;
  return vec2(theta / 2.0 / M_PI, phi / M_PI);
}
  
vec2 envMapEquirect(vec3 wcNormal) {
  return envMapEquirect(wcNormal, -1.0);
}

vec3 rotate(const vec3 v, float theta, const vec3 axis) {
  float cosTheta = cos( theta );
  return v * cosTheta + cross( axis, v ) * sin( theta ) + axis * dot( v, axis ) * ( 1.0 - cosTheta );
}

vec4 textureUV(vec3 view, float flag) {
  return min(
    texture2D( envmap, envMapEquirect( view ) ),
    vec4( flag * vec3(1., 1., 1.), 1. )
  );
}

void main( void ) {

  vec2 position = gl_FragCoord.xy / resolution.xy - vec2( 0.5 );
  position *= vec2( 1, resolution.y / resolution.x );
  position *= 4.;

  vec3 uv = normalize(
    rotate( vec3( position, -1. ), viewrot, vec3( 0, 1, 0 ) )
  );

  // Theta for view angle.
  float theta = acos( dot( uv, vec3( 0, 0, -1 ) ) );

  // Mapping coordinates.
  // coordinate = ( distance , viewAngle )
  vec2 params = vec2( ( 200. - 1. ) / 9., 1. - theta / M_PI );

  // Distort Reference shfit angle from [https://github.com/rantonels/schwarzschild]
  // using variable params.
  vec4 distcolor = texture2D( shiftSampler, params );

  // Calculate Phi_ba and Phi from distcolor
  // Expression from [https://github.com/rantonels/schwarzschild]
  float Phi_ba = 2. * M_PI * (0.98 * distcolor.r + 0.1 * distcolor.g);
  float Phi = (1.-step(theta,1.0))*Phi_ba + (step(theta,1.0))*Phi_ba;

  vec3 viewAxis = -normalize(cross(vNormal, cameraPosition));

  // Rotate View vector by Phi angle with axis of view.
  vec3 distVector = rotate(-vView, Phi, viewAxis);
  
  // Event Horizon factor.
  float nothorizon = max(
    smoothstep(0., 0.05, distcolor.r) * (1. - step(theta, 0.01)),
    (1. - step(theta, 2.57))
  );
  
  // Plot distorted vector to Envirounment map with some vector was change to 
  // pure black because of event horizon.  
  vec4 color = textureUV( normalize(distVector), nothorizon );

  gl_FragColor = color;
  // gl_FragColor = texture2D( envmap, envMapEquirect( vView ) );
  // gl_FragColor = vec4(uv, 1.0);
  // gl_FragColor = vec4(theta * vec3(1.,1.,1.),1.);
  // gl_FragColor = distcolor;
  // gl_FragColor = vec4(distVector, 1.0);

}

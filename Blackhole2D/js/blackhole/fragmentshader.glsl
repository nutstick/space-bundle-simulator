precision mediump float;

varying vec2 vUv;
uniform sampler2D shiftSampler;
uniform sampler2D backgroudSampler;

uniform float time;
uniform vec2 resolution;
uniform float radius;
uniform float beta;
uniform float gamma;
uniform float viewrot;

const float tanfov = 3.;

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
  float latitude = acos(view.y) / M_PI;
  float longitude = atan(view.z, view.x) / (2.0 * M_PI);

  return min(
    texture2D(backgroudSampler, vec2(longitude, latitude)),
    vec4(flag*vec3(1., 1., 1.), 1.)
  );
}

const float textureSize = 512.0;
const float texelSize = 1.0 / textureSize;

vec4 texture2DInterp( sampler2D textureSampler, vec2 uv ) //not actually used right now
{
    vec4 tl = texture2D(textureSampler, uv);
    vec4 tr = texture2D(textureSampler, uv + vec2(texelSize, 0));
    vec4 bl = texture2D(textureSampler, uv + vec2(0, texelSize));
    vec4 br = texture2D(textureSampler, uv + vec2(texelSize , texelSize));
    vec2 f = fract( uv.xy * textureSize ); // get the decimal part
    vec4 tA = mix( tl, tr, f.x ); // will interpolate the red dot in the image
    vec4 tB = mix( bl, br, f.x ); // will interpolate the blue dot in the image
    //return mix( tA, tB, f.y ); // will interpolate the green dot in the image
    float st = smoothstep(0.,1.,f.y);
    return tA*(1.0-st) + st*tB;
}

void main() {
  // Match resolution with gl_FragCoord
  // determine center
  vec2 position  = gl_FragCoord.xy / resolution.xy - vec2(0.5);
  position *= vec2(1, resolution.y / resolution.x);
  position *= 3.2;

  vec3 uv3 = normalize(
    //aberrate(
    rotate(vec3(position, -1.), viewrot, vec3(0, 1, 0))
    //)
  );
  //  uv3 = normalize(rotate(vec3(position, -1.), viewrot, vec3(0, 1, 0)));

  float theta = acos(dot(uv3, vec3(0, 0, -1)));

  // params is coordinate in shiftSampler (viewAngle)
  vec2 params = vec2((radius - 1.) / 9., 1. - theta / M_PI);

  vec4 distcolor = texture2D(shiftSampler, params);

  float Phi_ba = 2. * M_PI * (0.98 * distcolor.r + 0.1 * distcolor.g);
  float Phi = (1.-step(theta,1.0))*Phi_ba + (step(theta,1.0))*Phi_ba;

  vec3 v3 = -normalize(cross(vec3(0, 0, -1), uv3));

 vec3 uv4 = rotate(vec3(0, 0, radius), Phi, v3);

  float nothorizon = max(
    smoothstep(0., 0.05, texture2D(shiftSampler, params).r) * (1. - step(theta, 0.01)),
    (1. - step(theta, 2.57))
  );

  // rotate backgroud
  uv3 = rotate(uv3, time * 0.0015/*0.0015*/, vec3(0., 1., 0.));

  vec4 color = distort(normalize(uv4), nothorizon);

  gl_FragColor = color;
  // gl_FragColor = distcolor;//texture2D(backgroudSampler, position);	//DEBUG: test uv
  // gl_FragColor = vec4(uv4, 1.0);
  // gl_FragColor = vec4(theta * vec3(1.,1.,1.),1.);		//DEBUG: test theta
  // gl_FragColor = vec4(viewrot * vec3(1., 1., 1.), 1.);
}

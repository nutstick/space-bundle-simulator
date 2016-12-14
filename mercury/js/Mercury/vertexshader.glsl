attribute vec4 tangent;

uniform vec3 lightPosition;
uniform sampler2D bumpMap;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;

void main() {

    vec3 offset = normal * (texture2D(bumpMap, uv).r - 0.5) * 0.5;
    vec3 pos = position + offset;

    vUv = uv;
    vEye = normalize( cameraPosition - position.xyz );
    vView = normalize( ( modelMatrix * vec4( vEye, 1.0 ) ).xyz );
    vNormal = normalize( ( normalMatrix * normal ).xyz );
    vPosition = ( modelMatrix * vec4( pos, 1.0 ) ).xyz;


    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}

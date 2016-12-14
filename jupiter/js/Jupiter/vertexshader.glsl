precision mediump float;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vEye;

void main() {
    vUv = uv;

    vUv = uv;
    vNormal = normalize( ( normalMatrix * normal ).xyz );
    vPosition = ( modelMatrix * vec4( position, 1.0 ) ).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

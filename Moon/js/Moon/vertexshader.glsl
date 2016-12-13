attribute vec4 tangent;

uniform vec2 uvScale;
uniform vec3 lightPosition;

varying vec2 vUv;
varying mat3 tbn;
varying vec3 vLightVector;

void main() {
    vUv = uvScale * uv;

    // Create the Tangent-Binormal-Normal Matrix used for transforming
    // coordinates from object space to tangent space
    vec3 vNormal = normalize(normalMatrix * normal);
    vec3 vTangent = normalize( normalMatrix * tangent.xyz );
    vec3 vBinormal = normalize(cross( vNormal, vTangent ) * tangent.w);
    tbn = mat3(vTangent, vBinormal, vNormal);

    // Calculate the Vertex-to-Light Vector 
    vec4 lightVector = viewMatrix * vec4(lightPosition, 1.0);
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vLightVector = normalize(lightVector.xyz - modelViewPosition.xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
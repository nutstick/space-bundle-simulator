
function Moon( scene, light, radius ) {
  var myRadius = radius || 140;
  var uniforms = Object.assign(
      THREE.UniformsLib['lights'],
      THREE.UniformsLib['normalmap'],
      {
        lightPosition: { type: 'v3', value: light.position },
        textureMap: { type: 't', value: Texture.moonmap },
        normalMap: { type: 't', value: Texture.moonnormalmap },
        uvScale: { type: 'v2', value: new THREE.Vector2( 1.0, 1.0 ) }
        // specular: { type: 'c', value: new THREE.Color('grey') }
      }
  );
  // var _geometry = new THREE.BufferGeometry().fromGeometry( new THREE.SphereGeometry( 140, 256, 256 ) );
  var _geometry = new THREE.SphereBufferGeometry( 140, 256, 256 );

  var _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.moon.vertex,
    fragmentShader: Shader.moon.fragment,
    lights: true,
    fog: false
  });

  var _mesh = new THREE.Mesh(_geometry, _material);

  _mesh.castShadow = true;
  _mesh.receiveShadow = true;
  THREE.BufferGeometryUtils.computeTangents( _mesh.geometry );

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add(_mesh);

  return this;

}


Moon.prototype.animate = function () {
  var axis = new THREE.Vector3(0, 1, 0).normalize();
  this.mesh.rotateOnAxis(axis, 0.005);
};

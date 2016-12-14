
function Mercury( scene, light, radius ) {
  var myRadius = radius || 140;
  var uniforms = Object.assign(
      THREE.UniformsLib['lights'],
      THREE.UniformsLib['normalmap'],
      {
        textureMap: { type: 't', value: Texture.Mercurymap },
        bumpMap: { type: 't', value: Texture.Mercurybumpmap }
      }
  );
  var _geometry = new THREE.SphereBufferGeometry( myRadius, 256, 256 );

  var _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.Mercury.vertex,
    fragmentShader: Shader.Mercury.fragment,
    lights: true
  });

  var _mesh = new THREE.Mesh(_geometry, _material);

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;

  scene.add(_mesh);

  return this;

}


Mercury.prototype.animate = function () {
  var axis = new THREE.Vector3(0, 1, 0).normalize();
  this.mesh.rotateOnAxis(axis, 0.005);
};

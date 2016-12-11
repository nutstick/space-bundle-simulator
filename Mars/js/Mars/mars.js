
function Mars( scene ) {
  var uniforms = Object.assign(
      THREE.UniformsLib['lights'],
      // THREE.UniformsLib['shadowmap'],
      {
        time: { type: 'f', value: 0 },
        textureMap: { type: 't', value: Texture.map },
        normalMap: { type: 't', value: Texture.normalmap },
        bumpMap: { type: 't', value: Texture.bumpmap },
        bumpScale: { type: 'f', value: 4.0 }
        // specular: { type: 'c', value: new THREE.Color('grey') }
      }
  );
  var _geometry = new THREE.SphereGeometry( 140, 256, 256 );
  var _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.mars.vertex,
    fragmentShader: Shader.mars.fragment,
    lights: true
  });
  
  var _mesh = new THREE.Mesh(_geometry, _material);

  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;
  
  scene.add(_mesh);

  return this;

}


Mars.prototype.animate = function () {

};

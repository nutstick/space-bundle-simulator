function venus( scene, light ){
  
  var uniforms = Object.assign(
      THREE.UniformsLib['lights'],
      THREE.UniformsLib['normalmap'],
      {
        lightPosition: { type: 'v3', value: light.position },
        textureMap: { type: 't', value: Texture.map },
        normalMap: { type: 't', value: Texture.normalmap },
        uvScale: { type: 'v2', value: new THREE.Vector2( 1.0, 1.0 ) }
        // specular: { type: 'c', value: new THREE.Color('grey') }
      }
  );

  var geometry = new THREE.SphereBufferGeometry( 140, 256, 256 );
  var material  = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.venus.vertex,
    fragmentShader: Shader.venus.fragment,
    lights: true,
    fog: false
  })
  var mesh = new THREE.Mesh(geometry, material)
  
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  THREE.BufferGeometryUtils.computeTangents( mesh.geometry );

  this.mesh = mesh;
  this.material = material;
  this.geometry = geometry;

  scene.add(mesh)
  return this;
}

venus.prototype.animate = function(){
  
  this.mesh.rotation.y  -= 1/32 * 0.05;
  
}


function Sphere( scene, light ) {
  var radians = 23.5 * Math.PI / 180;
  this.time = 0;
  var uniforms = Object.assign(
      THREE.UniformsLib['lights'],
      // THREE.UniformsLib['shadowmap'],
      {
        time: { type: 'f', value: 0 },
        earthMap: { type: 't', value: Texture.earthmap },
        bumpMap: { type: 't', value: Texture.bumpmap },
        specMap: { type: 't', value: Texture.specmap },
        bumpScale: { type: 'f', value: 3.0 }
        // specular: { type: 'c', value: new THREE.Color('grey') }
      }
  );
  var _geometry = new THREE.SphereGeometry( 140, 256, 256 );
  var _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    defines: {
      M_PI: Math.PI
    },
    vertexShader: Shader.earth.vertex,
    fragmentShader: Shader.earth.fragment,
    lights: true
  });
  // var _material = new THREE.MeshPhongMaterial();
  // _material.map = Texture.earthmap;
  // _material.bumpMap = Texture.bumpmap;
  // _material.bumpScale = 0.05;
  // _material.specularMap = Texture.specmap;
  // _material.specular = new THREE.Color('grey');

  var _mesh = new THREE.Mesh(_geometry, _material);
  // _mesh.castShadow = true;
  // _mesh.receiveShadow = true;
  // magic here
  /*_mesh.customDepthMaterial = new THREE.ShaderMaterial({
      vertexShader: Shader.vs_depth.vertex,
      fragmentShader: THREE.ShaderLib.depth.fragmentShader,
      uniforms: _material.uniforms
  })*/;


  // var cgeometry   = new THREE.SphereGeometry(5.2, 32, 32)
  // var cmaterial  = new THREE.MeshPhongMaterial();
  //   cmaterial.map     = Texture.cloudmap;
  //   cmaterial.side        = THREE.DoubleSide,
  //   cmaterial.opacity     = 0.3,
  //   cmaterial.transparent = true
  //   cmaterial.depthWrite  = false
  //
  //  var cloudMesh = new THREE.Mesh(cgeometry, cmaterial);


  this.mesh = _mesh;
  this.material = _material;
  this.geometry = _geometry;
  // this.cmesh = cloudMesh;
  this.mesh.rotation.z = -Math.sin(radians);
  // this.cmesh.rotation.z = -Math.sin(radians);
  // scene.add(cloudMesh);
  scene.add(_mesh);

  return this;

}


Sphere.prototype.animate = function () {
  var axis = new THREE.Vector3(0, 1, 0).normalize();
  this.mesh.rotateOnAxis(axis, 0.001);
  //  this.cmesh.rotateOnAxis(axis,this.time*1.3);
  this.time += 0.05;

  // // this.mesh.rotation.x += 0.01;
  // // this.mesh.rotation.y += 0.02;
  // // console.log(this);
  // this.radius = 10.0;// + 2.9 * Math.sin(timec * 0.0031);
  //
  // this.regime += 0.01 * (this.orbiting - this.regime);
  //
  // var beta_orb = 0.707 * 1.0 / Math.sqrt(this.radius - 1.0);
  // var gamma_orb = 1 / Math.sqrt(1.0 - this.beta * this.beta);
  //
  // this.beta = this.regime * beta_orb;
  // this.gamma = (1. - this.regime) + this.regime * gamma_orb;
  //
  // this.material.uniforms['time'].value = this.timec;
  // this.material.uniforms['radius'].value = this.radius;
  // this.material.uniforms['beta'].value = this.beta;
  // this.material.uniforms['gamma'].value = this.gamma;
  //
  // // material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  // this.timec += this.regime;

};

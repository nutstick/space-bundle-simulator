function fireball(scene){
  var start = Date.now();
  var geometry = new THREE.IcosahedronGeometry( 99, 6 );
  var material = new THREE.ShaderMaterial( {
    uniforms: {
        tExplosion: {
            type: "t",
            value: Texture.explosion
        },
        time: { // float initialized to 0
            type: "f",
            value: 0.0
        }
    },
    vertexShader: Shader.fireball.vertex,
    fragmentShader: Shader.fireball.fragment,
  } );

    // create a sphere and assign the material
  mesh = new THREE.Mesh(
      geometry,
      material
  );
  this.start = start;
  this.mesh = mesh;
  this.material = material;
  this.geometry = geometry;

  scene.add( mesh );

  return this;
}

fireball.prototype.animate = function(){// let there be light

  this.material.uniforms[ 'time' ].value = .00015 * ( Date.now() - this.start );
}

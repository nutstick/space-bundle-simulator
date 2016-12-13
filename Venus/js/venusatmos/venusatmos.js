function venusatmos( scene ){
  //this.delta = 0.1
  //console.log(Shader.sun.fragment);
  var geometry = new THREE.IcosahedronGeometry( 100, 6 );
  var material  = new THREE.ShaderMaterial({
    uniforms: {
        venusatmos: {
            type: "t",
            value: Texture.venusatmos
        }
    },
    vertexShader: Shader.venusatmos.vertex,
    fragmentShader: Shader.venusatmos.fragment,
    //side: THREE.Doubleside
  })
  var mesh = new THREE.Mesh(geometry, material)
  mesh.material.transparent = true;
  //mesh.material.alpha = true;
  this.mesh = mesh;
  this.material = material;
  this.geometry = geometry;

  scene.add(mesh)
  return this;
}

venusatmos.prototype.animate = function(){
  //onRenderFcts.push(function(delta, now){
  this.mesh.rotation.y  += 1/32 * 0.01;
	//})s
}
// cloud.prototype.animate = function(){
//   this.mesh.rotation.y  += 1/16 * this.delta;
// }

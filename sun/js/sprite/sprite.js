function sprite(scene, radius){
  var myRadius = radius/99*30 || 30;
  var geometry = new THREE.SphereGeometry( myRadius, 0, 0 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0,0,0);

  // use sprite because it appears the same from all angles
  var spriteMaterial = new THREE.SpriteMaterial(
  {
    map: Texture.sunglow,
    color: 0xffffff, blending: THREE.AdditiveBlending
  });
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(myRadius/30*250, myRadius/30*250, 1.0);

  mesh.add(sprite);
  scene.add(mesh);
}

var THREETextureloader = new THREE.TextureLoader();
var textureCount = 0;
var Texture = {};

function loadTexture(texture) {
  var $texture = $(texture);
  THREETextureloader.load(
    $texture.data('src'),
    function (textureImg) {
      // textureImg.wrapT = THREE.RepeatWrapping;
      // textureImg.wrapS = THREE.RepeatWrapping;
      // textureImg.repeat.set( 1, 1 );

      Texture[$texture.data('name')] = textureImg;
      textureCount--;
      if (!textureCount) {
        textureLoadComplete();
      }
    },
    function ( xhr ) {
  		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  	},
    function ( xhr ) {
  		console.log( 'An error happened' );
  	}
  )
}
function textureLoader() {
  var textures = $('[data-texture]');
  textureCount = textures.length;

  for (var t = 0; t < textures.length; t++) {
    loadTexture(textures[t]);
  }
}

function textureLoadComplete() {
  console.log(Texture);

  init();
  animate();
}

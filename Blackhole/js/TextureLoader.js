var THREETextureloader = new THREE.TextureLoader();
var THREECubeTextureLoader = new THREE.CubeTextureLoader();
var textureCount = 0;
var cubeTextureCount = 0;
var Texture = {};

function loadTexture(texture) {
  var $texture = $(texture);
  THREETextureloader.load(
    $texture.data( 'src' ),
    function ( textureImg ) {
      Texture[$texture.data( 'name' )] = textureImg;
      textureCount--;
      if (!textureCount) {
        textureLoadComplete();
      }
    },
    function ( xhr ) {},
    function ( xhr ) {
  		console.log( 'An error happened' );
  	}
  )
}

function loadCubeTexture(cubeTexture) {
  var $cubeTexture = $(cubeTexture);

  THREECubeTextureLoader.setPath( $cubeTexture.data( 'src' ) );
  THREECubeTextureLoader.load(
    [
      $cubeTexture.find( 'xpos' ).data( 'src' ),
      $cubeTexture.find( 'xneg' ).data( 'src' ),
      $cubeTexture.find( 'ypos' ).data( 'src' ),
      $cubeTexture.find( 'yneg' ).data( 'src' ),
      $cubeTexture.find( 'zpos' ).data( 'src' ),
      $cubeTexture.find( 'zneg' ).data( 'src' ),
    ],
    function (textureImg) {
      Texture[$cubeTexture.data( 'name' )] = textureImg;
      textureCount--;
      if (!textureCount) {
        textureLoadComplete();
      }
    })
}

function textureLoader() {
  var textures = $( '[data-texture]' );
  var cubeTextures = $( 'cubemap' );
  textureCount = textures.length + cubeTextures.length;

  for (var t = 0; t < textures.length; t++) {
    loadTexture(textures[t]);
  }

  for (var t = 0; t < cubeTextures.length; t++) {
    loadCubeTexture(cubeTextures[t]);
  }
}

function textureLoadComplete() {
  console.log(Texture);

  init();
  animate();
}

//  src: https://github.com/mrdoob/three.js/issues/283
//  and custom by Nuttapat Kirawittaya

var shaderCount = 0;
var Shader = {};

function loadShader(shader, type) {
  var $shader = $(shader);
  $.ajax({
    url: $shader.data('src'),
    dataType: 'text',
    context: {
      name: $shader.data('name'),
      type: type
    },
    complete: processShader
  });
}

function processShader(jqXHR, textStatus) {
  shaderCount--;
  if (!Shader[this.name]) {
    Shader[this.name] = { vertex: '', fragment: '' };
  }
  Shader[this.name][this.type] = jqXHR.responseText;
  if (!shaderCount) {
    shaderLoadComplete();
  }
}

function shaderLoader() {
  var fragmentShaders = $('script[type="x-shader/x-fragment"]');
  var vertexShaders = $('script[type="x-shader/x-vertex"]');
  shaderCount = fragmentShaders.length + vertexShaders.length;

  for (var f = 0; f < fragmentShaders.length; f++) {
    var fShader = fragmentShaders[f];
    loadShader(fShader, 'fragment');
  }

  for (var v = 0; v < vertexShaders.length; v++) {
    var vShader = vertexShaders[v];
    loadShader(vShader, 'vertex');
  }
}

function shaderLoadComplete() {
  console.log(Shader);
  textureLoader();
}

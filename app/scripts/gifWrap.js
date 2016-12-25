var gifMain = new Vue({
  el: '#gifWrap',
  data: {
    currGif: window.location.pathname.split('/').pop(),
    gifs: []
  },
  mounted: function() {
    var that = this;
    Vue.http.get('/files/' + this.currGif).then(function(gif){
      that.gifs = gif.body;
      Vue.nextTick(function(){
        componentHandler.upgradeDom('MaterialProgress', 'mdl-progress');
        var imgLoad = imagesLoaded(document.querySelectorAll('#gifWrap img'));
        imgLoad.on( 'progress', function( instance, image ) {
          var result = image.isLoaded ? 'loaded' : 'broken';
          //console.log( 'image is ' + result + ' for ' + image.img.src, image.img.getAttribute('data-gif') );
          //image.img.onclick = that.loadGif;
          document.getElementById("playicon-" + image.img.id).onclick = loadGif;
        });
      });
    });
  },
  methods: {
    
  }
})
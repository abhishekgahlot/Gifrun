var app = new Vue({
  el: '#app',
  data: {
    gifs: []
  },
  mounted: function() {
    var that = this;
    setTimeout(function(){
      that.getFiles()
      .then(function(){
        that.imageHandler();
      });
    }, 500);
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = this.search;
  },

  methods: {
    getFiles: function() {
      var that = this;
      return new Promise(function(resolve, reject) {
        that.$http.get('/files')
        .then(function(files){
          that.gifs = files.body;
          Vue.nextTick(function(){
            componentHandler.upgradeDom('MaterialProgress', 'mdl-progress');
          });
          resolve(true);
        });
      });
    },

    imageHandler: function() {
      var imgLoad = imagesLoaded(document.querySelectorAll('#app img'));
      var that = this;
      imgLoad.on( 'progress', function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        //console.log( 'image is ' + result + ' for ' + image.img.src, image.img.getAttribute('data-gif') );
        //image.img.onclick = that.loadGif;
        document.getElementById('playicon-' + image.img.id).onclick = loadGif;
      });
    },

    search: function() {
      if (document.getElementById('search-bar').value) {
        search._render();
      }
    }
  }
});

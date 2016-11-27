Vue.http.get('/user').then(function(user){
  window.user = user.body;
  if (user.body.name) {
    var userDiv = document.getElementById('user-name');
    userDiv.textContent = 'Hi '+user.body.name.split(' ').shift();

    var userNav = document.getElementById('user-nav');
    userNav.style.display = '';

    var normalNav = document.getElementById('normal-nav');
    normalNav.style.display = 'none';
  }
});

var app = new Vue({
  el: '#app',
  data: {
    gifs: []
  },
  mounted: function() {
    setTimeout(function(){
      this.getFiles()
      .then(function(){
        this.imageHandler();
      }.bind(this));
    }.bind(this), 1000);
  },
  methods: {
    getFiles: function() {
      return new Promise(function(resolve, reject) {
        this.$http.get('/files')
        .then(function(files){
          this.gifs = files.body;
          resolve(true);
        });
      }.bind(this));
    },
    imageHandler: function() {
      var imgLoad = imagesLoaded(document.querySelectorAll('#app img'));
      imgLoad.on( 'progress', function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        console.log( 'image is ' + result + ' for ' + image.img.src, image.img.getAttribute('data-gif') );
        window.bat = image;
      });
    }
  }
});




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
    var that = this;
    setTimeout(function(){
      that.getFiles()
      .then(function(){
        that.imageHandler();
      });
    }, 500);
    searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = this.search;
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
    },
    search: function() {
      if (document.getElementById('search-bar').value) {
        search._render();
      }
    }
  }
});


var search = new Vue({
  el: '#search',
  data: {
    searchResults: []
  },
  mounted: function() {
    var that = this;
    var searchBar = document.getElementById('search-bar');
    var mainBody = document.querySelector('.main-body');
    var searchBody = document.getElementById('search');

    searchBar.onkeyup = function(){
      if (searchBar.value) {
        mainBody.style.display = "none";
        searchBody.style.display = "block";
        Vue.http.get('/search?query=' + searchBar.value)
        .then(function(result){
          that.searchResults = result.body;
          search._render();
        });
      } else {
        mainBody.style.display = "block";
        searchBody.style.display = "none";
      }
    }
  },
  methods: {
    getSearch: function() {
      console.log('bat')
    }
  }
});



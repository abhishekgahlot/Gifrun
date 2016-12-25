
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
          Vue.nextTick(function(){
            componentHandler.upgradeDom('MaterialProgress', 'mdl-progress');
          })
          resolve(true);
        });
      }.bind(this));
    },

    imageHandler: function() {
      var imgLoad = imagesLoaded(document.querySelectorAll('#app img'));
      var that = this;
      imgLoad.on( 'progress', function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        //console.log( 'image is ' + result + ' for ' + image.img.src, image.img.getAttribute('data-gif') );
        image.img.onclick = that.loadGif;
      });
    },

    loadGif: function(e) {
      var currentGif = new SuperGif({ gif: document.getElementById(e.target.id) } );
      currentGif.load();
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
    searchResults: [],
    searchBar: null,
  },
  mounted: function() {
    this.searchBar = document.getElementById('search-bar');
    this.searchBar.onkeyup = this.getSearch;
  },
  methods: {
    getSearch: function() {
      var mainBody = document.querySelector('.main-body');
      var searchBody = document.getElementById('search');
      var query = this.searchBar.value;
      var that = this;

      if (query) {
        mainBody.style.display = "none";
        searchBody.style.display = "block";
        Vue.http.get('/search?query=' + query)
        .then(function(result){
          that.searchResults = result.body;
          search._render();
        });
      } else {
        mainBody.style.display = "block";
        searchBody.style.display = "none";
      }
    }
  }
});
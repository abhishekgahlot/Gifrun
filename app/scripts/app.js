window.gifCanvas = {};

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

window.loadGif = function(e) {
  var sibling = e.target.previousSibling.previousElementSibling;
  var currentGif = window.gifCanvas[sibling.id] = new SuperGif({ gif: document.getElementById(sibling.id) } );
  document.getElementById('progress-' + sibling.id).style.display = 'block';
  currentGif.load(function(){
    document.getElementById('progress-' + sibling.id).style.display = 'none';
    document.getElementById('playicon-' + sibling.id).style.display = 'none';
  });
}

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
        mainBody.style.display = 'none';
        searchBody.style.display = 'block';
        Vue.http.get('/search?query=' + query)
        .then(function(result){
          that.searchResults = result.body;
          search._render();
        });
      } else {
        mainBody.style.display = 'block';
        searchBody.style.display = 'none';
      }
    }
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


var gifMain = new Vue({
  el: '#gifWrap',
  data: {
    currGif: window.location.pathname.split('/').pop(),
    gifs: []
  },
  mounted: function() {
    var that = this;
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = this.search;
    Vue.http.get('/files/' + this.currGif).then(function(gif){
      that.gifs = gif.body;
      Vue.nextTick(function(){
        componentHandler.upgradeDom('MaterialProgress', 'mdl-progress');
        var imgLoad = imagesLoaded(document.querySelectorAll('#gifWrap img'));
        imgLoad.on( 'progress', function( instance, image ) {
          var result = image.isLoaded ? 'loaded' : 'broken';
          //console.log( 'image is ' + result + ' for ' + image.img.src, image.img.getAttribute('data-gif') );
          //image.img.onclick = that.loadGif;
          document.getElementById('playicon-' + image.img.id).onclick = loadGif;
        });
      });
    });
  },
  methods: {
    search: function() {
      if (document.getElementById('search-bar').value) {
        search._render();
      }
    }
  }
});

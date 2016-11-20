Vue.http.get('/user').then(function(user){
  window.user = user.body;
  if (user.body.name) {
    $('#user-name').text('Hi '+user.body.name.split(' ').shift());
    $('#user-nav').show();
    $('#normal-nav').hide();
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
        $('#app img').each(function() {
            $(this).on('load', function() {
              console.log('loaded');
            });
         });
      });
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
    }
  }
});


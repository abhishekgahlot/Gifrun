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
  document.getElementById("progress-" + sibling.id).style.display = "block";
  currentGif.load(function(){
    document.getElementById("progress-" + sibling.id).style.display = "none";
    document.getElementById("playicon-" + sibling.id).style.display = "none";
  });
}
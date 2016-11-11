var app = new Vue({
  el: '#app',
  data: {
    gifs: [
      { message: 'Foo', link: 'https://media.giphy.com/media/3oz8xEDAGOgSqtke1q/giphy.gif' },
      { message: 'Bar', link: 'https://66.media.tumblr.com/b948b4d80d72b67d82b0f7417051d70a/tumblr_og97gfVwEZ1u929uoo1_400.gif' }
    ]
  }
});
gipher();
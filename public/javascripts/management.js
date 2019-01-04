$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

$(document).ready(function() {
  $('#tournament-list').sortable();
})

function removeTournament(obj) {
  var data = {
    'id': obj[0].id
  }

  $.post("/remove_one", data, function(info) {
    console.log(info);
      if(info.ok == 1 && info.n == 1){
        $(obj).animateCss('zoomOutRight', function() {
          $(obj).remove();
        });
      }
  });
}

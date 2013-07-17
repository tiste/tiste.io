(function ($) {
  $.fn.parallax = function (options) {
    var defaults = {
      'coef': 0.7
    };

    var opt = $.extend(defaults, options);

    return this.each(function () {
      var $$ = $(this);

      $(window).bind('scroll', function () {
        var offset = $$.offset();
        var stop = offset.top + $$.height();
        var windowTop = $(this).scrollTop();

        if ((windowTop >= 0) && ((windowTop + $(this).height()) >= offset.top) && (windowTop <= stop)) {
          newCoord = windowTop * opt.coef;

          $$.css({
            'background-position': 'center -' + newCoord + 'px'
          });
        }
      });
    });
  }
})(jQuery);

function prompt(element, text) {
  var span = document.createElement('span');
  span.innerHTML = text;
  element.appendChild(span);
}

function type_writer() {
  var realisticTypewriter = new RealisticTypewriter(),
      typeWriterElement   = document.getElementById('typewriter');

  prompt(typeWriterElement, 'Hi !');

  setTimeout(function () {
    prompt(typeWriterElement, '<br/>');
    realisticTypewriter.type("I'm Baptiste Lecocq.", typeWriterElement, function () {
      setTimeout(function () {
        prompt(typeWriterElement, '<br/>');
        realisticTypewriter.type('A 20yo french student developer.', typeWriterElement, function () {
          prompt(typeWriterElement, '<br/>');
          setTimeout(function () {
            prompt(typeWriterElement, '<br/>');
            realisticTypewriter.type('Oh, I love web development.', typeWriterElement);
          }, 1000);
        });
      }, 1000);
    });
  }, 1000);
}

function set_percent(language, percent) {
  i = 0;
  clear = setInterval(function () {
    i++;
    $(language).val(i).trigger('change');

    if (i >= percent) {
      clearInterval(clear);
    }
  }, 25);
}

$(function() {
  $('.skill')
    .knob({
      readOnly: true
    })
    .trigger(
      'configure', { 'fgColor': '#1abc9c', 'bgColor': '#FFFFFF' }
    );

  $('.skill').each(function () {
    skill       = $(this);
    skill_value = $(this).data('value');

    set_percent(skill, skill_value);
  });
});

$(window).load(function () {
  type_writer();

  $('.me').parallax({coef: 0.7});
});

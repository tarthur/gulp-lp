
/********** smoothScrolling **********/

/**
 * Smooth Page Scrolling
 * @function
 * @param {string} selector - string selector to be used for scrolling 
 * @param {number} [speed = 1250] - scroll speed
 * @param {number} [offset = 0] - offset from block
 * @param {string} [easing] - easing function
 * @param {function} [callbackBegin] - function at the beginning of scrolling
 * @param {function} [callbackEnd] - function at the end of scrolling
 */
function smoothScrolling (userSettings) {
  var defaultSettings = {
    clickOn : false,
    delay: 0,
    speed : 800,
    offset : 0,
    easing : '',
    dataName : 'data-smooth-scroll',
    callbackBegin : $.noop, 
    callbackEnd : $.noop,
  }
  
  var settings = $.extend(defaultSettings, (userSettings || {}));

  $('[' + settings.dataName + ']').each(function () {

    if (!settings.clickOn) {
      $(this).on('click', function(event) {
        var $anchor = $(this);
        var $anchorData = $anchor.attr(settings.dataName);
        
        event.preventDefault();

        setTimeout(function () {
          $('html, body').stop().animate({
            scrollTop: ( $($anchorData).offset().top - settings.offset)
          }, settings.speed, settings.easing, function () {
            if ($.isFunction(settings.callbackEnd)) {
              settings.callbackEnd();
            }
          });
        }, settings.delay)

        if ($.isFunction(settings.callbackBegin)) {
          settings.callbackBegin();
        }

      });
    } else {
      setTimeout(function () {
        $('html, body').stop().animate({
          scrollTop: ( $(settings.clickOn).offset().top - settings.offset)
        }, settings.speed, settings.easing, function () {
          if ($.isFunction(settings.callbackEnd)) {
            settings.callbackEnd();
          }
        });
      }, settings.delay)
    }

  });
}

// How to use:

// js:

// LP.smoothScrolling({
//   speed : 1000,
// });

// html:

// <a href="#" data-smooth-scroll="#catalog">Подробнее</a>
// You can use any container! (a, div, li, span etc.)

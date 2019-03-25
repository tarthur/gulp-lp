$(document).ready(function(){

  /*=============
  *  MAIN
  ===============*/

  
  function detectthreeDays() {
    var nowData = new Date();
    var startYear = new Date(2019, 0, 0);
    var startYearNowDays = (nowData - startYear) / 1000 / 60 / 60 / 24;

    return (Math.ceil(startYearNowDays) % 3) + 1;
  }

  // timer
  var now = new Date();
  var secPassed = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
  var t = ((60 * 60 * 24) * detectthreeDays()) - secPassed;
  var tmp = '<ul class="time">' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{d10}</span>' +
                  '<span>{d1}</span>' +
                '</div>' +
                '<span class="time-text">дней</span>' +
              '</li>' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{h10}</span>' +
                  '<span>{h1}</span>' +
                '</div>' +
                '<span class="time-text">часов</span>' +
              '</li>' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{m10}</span>' +
                  '<span>{m1}</span>' +
                '</div>' +
                '<span class="time-text">минут</span>' +
              '</li>' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{s10}</span>' +
                  '<span>{s1}</span>' +
                '</div>' +
                '<span class="time-text">секунд</span>' +
              '</li>' +
            '</ul>'

  $('.timer').countdown({
    until: (t),
    labels: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
    labels1: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
    format: 'HMS',
    layout: tmp
  });

  //fancybox
  $("[data-fancybox]").fancybox({
    loop: true,
    infobar: false,
    buttons: [
      "zoom",
      "close"
    ],
  });

  // don't dragging img
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  // smoothScrolling
  smoothScrolling();

  // added item-n classes to .form-group elems
  ;(function addNumericFormGroup(form) {
    if (!form) return;

    $('.order-form').each(function() {
      $('.order-form .form-group #name_first').closest('.form-group').addClass('item-1');
      $('.order-form .form-group #phone').closest('.form-group').addClass('item-2');
      $('.order-form .form-group [type="submit"]').closest('.form-group').addClass('item-3');
    });
  })($('*').is('.order-form'));
    

  // $('.multiple-items').slick({
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 3
  // });
      

  /*=============
  *  FUNCTIONS
  ===============*/
  
  /********** mediaQuery **********/
  
  /**
   * javascript media query
   * @function
   * @param {string} breakpoint - breakpoint border
   * @param {function} [Up = empty function] - code that runs above breakpoint
   * @param {function} [Down = empty function] - code that runs below breakpoint
   */
  
  // How to use:
  // mediaQuery('768px', {
  //   'Up' : function () {
  //     console.log('some code');
  //   }, 
  //   'Down' : function () {
  //     console.log('some code');
  //   }
  // }); 
  
  function mediaQuery (breakpoint, userSettings) {
    var defaultSettings = {
      'Up' : $.noop, 
      'Down' : $.noop
    }
    var settings = $.extend(defaultSettings, (userSettings || {}));
    var mediaQueryList = window.matchMedia("(min-width: " + breakpoint + " )");
  
  
    function handleOrientationChange(mql) {
      if (mql.matches) settings.Up() 
      else settings.Down();
    }
  
    mediaQueryList.addListener(handleOrientationChange);
    handleOrientationChange(mediaQueryList);
  }
  
  
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
  
  // libs/functions/Accordion.js
  // libs/functions/Tabs.js
});
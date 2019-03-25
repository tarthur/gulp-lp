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
  $(".privacy-modal-btn").fancybox({
    loop: true,
    infobar: false,
    buttons: [
      "zoom",
      "close"
    ], 
    touch: false,
  });
  
  //fancybox
  $("#slider-1 [data-fancybox]").fancybox({
    loop: true,
    infobar: false,
    buttons: [
      "zoom",
      "close"
    ], 
    animationEffect: "fade",
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
  //=require libs/functions/mediaQuery.js
  //=require libs/functions/smoothScrolling.js
  // libs/functions/Accordion.js
  // libs/functions/Tabs.js
});
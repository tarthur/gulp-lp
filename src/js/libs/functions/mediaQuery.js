
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

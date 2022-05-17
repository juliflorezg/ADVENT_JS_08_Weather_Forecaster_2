//todo (thu 5 04 22) revisit callback, promises and async await videos on jon mirchas chanel: [CHECK]
// https://www.youtube.com/watch?v=TYG2_iUr8XY
// https://www.youtube.com/watch?v=QO4NXhWo_NM
// todo watch fetch video on the coding train chanel:
// https://www.youtube.com/watch?v=tc8DU14qX6I
// todo upload tip calculator project to github [CHECK]
// todo think about markup, css and js behavior for this weather app [CHECK]
//* useful links for the api:
//https://openweathermap.org/api/one-call-api#current
//https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// /https://store.selfteach.me/view/courses/d2550633-b921-4971-8371-ff53ea196d05/1103550-challenge-8/3324220-challenge-8

* generate classes for bg-colors and txt-colors maps  [CHECK]
* set weather day  element grid disposition for mobile and tablet / pc [CHECK]

// https://flagicons.lipis.dev/
// https://geocode.xyz/api
// https://geocode.xyz/bogota?json=1

* make a git repository and upload the project in its current state (just weekly weather and no side-menu, 09-05-22)

* work on side menu:
  * finish styles for buttons
  * add form form selecting country and city
  * give styles to close button
  * give close button the closing behavior 
* 

* LEARNED ABOUT: new Intl.DisplayNames(['en'], { type: 'region' }) -> internationalization object for (in this case) getting country names from country codes   
* LEARNED ABOUT: document.createElementNS('http://www.w3.org/2000/svg', 'svg') -> used for creating new svg elements and we can also use `document.createElementNS('http://www.w3.org/2000/svg','path')` for setting the inner path, along with the function implemented, it creates an svg and appends it to the node we pass to the function

* LEARNED ABOUT: async - await function in conjunction with the fetch API for getting resources from the web
  
* LEARNED ABOUT: generating classes with SASS using maps and loops

* LEARNED ABOUT: WEBPACK implementation for packing this project and getting to work with SASS prefixes for the styles, image files and  asynchronous code altogether
  
* LEARNED ABOUT: CSSStyleDeclaration on document for setting CSS properties `document.styleSheets[1].cssRules[56].style.setProperty(
      'background-image',
      `url(https://countryflagsapi.com/svg/${countryCode})`
    )`
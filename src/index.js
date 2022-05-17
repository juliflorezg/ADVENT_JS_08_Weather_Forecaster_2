// const regeneratorRuntime = require('regenerator-runtime')
// import regeneratorRuntime from 'regenerator-runtime'
import 'regenerator-runtime/runtime.js'
import './scss/styles.scss'
import umbrella from './assets/icon-precipitation.svg'
import cloudy from './assets/cloudy.png'
import partlyCloudy from './assets/partly-cloudy.png'
import rainy from './assets/rainy.png'
import snowy from './assets/snowy.png'
import sunny from './assets/sunny.png'
import stormy from './assets/stormy.png'
//flags
import arFlag from './assets/ar.svg'
import auFlag from './assets/au.svg'
import brFlag from './assets/br.svg'
import caFlag from './assets/ca.svg'
import coFlag from './assets/co.svg'
import esFlag from './assets/es.svg'
import frFlag from './assets/fr.svg'
import peFlag from './assets/pe.svg'
import ukFlag from './assets/uk.svg'
import usFlag from './assets/us.svg'
//icons
import closeIcon from './assets/close.png'
import favicon from './assets/favicon.png'

// const MY_KEY = 'a160c9f9d33936d99b022f2f7848b56b'
const K = process.env.AK
const coordinates = {
  //presented in the form [latitude, longitude]
  ar: ['-34.6', '-58.38', 'ar'], //Buenos Aires
  au: ['-35.47', '149.01', 'au'], //Canberra
  br: ['-15.79', '-47.88', 'br'], //Brazilia
  ca: ['45.42', '-75.69', 'ca'], //Ottawa
  co: ['4.62', '-74.06', 'co'], //Bogota
  es: ['40.41', '-3.7', 'es'], //Madrid
  fr: ['48.86', '2.34', 'fr'], // Paris
  pe: ['-12.04', '-77.04', 'pe'], // Lima
  uk: ['51.5', '-0.11', 'uk'], // GB / London
  us: ['38.9', '-77.03', 'us'], // washington
  // co: ['3.31', '-76.5'], // Cali, CO
}
const weekDays = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
}
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
console.log(regionNames.of('AR'))

const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)
const $mainContainer = $('#mainContainer')
const $fragment = document.createDocumentFragment()
const $openMenuButton = $('#openMenu')
const $closeMenuButton = $('#closeMenuButton')
const $sideMenu = $('.side-menu-wrapper')
const $countrySelectMenu = $('#country-select')

console.log(document.querySelector('#AR').style)

// let bgcolorOfARBefore = window
//   .getComputedStyle(document.querySelector('#AR'), ':before')
//   .getPropertyValue('background-color')
// console.log(bgcolorOfARBefore)

let currentDateClasses = []

// fetch(
//   `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.us[0]}&lon=${coordinates.us[1]}&exclude=hourly,minutely&appid=${MY_KEY}`
// )
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err))

function renderSVGUmbrella(node) {
  // debugger
  console.log(node)
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )

  iconSvg.setAttribute('viewBox', '0 0 32 32')
  iconSvg.setAttribute('width', '32')
  iconSvg.setAttribute('height', '32')
  iconSvg.style.fill = 'currentColor'
  iconSvg.style.marginRight = '5px'

  iconPath.setAttribute(
    'd',
    'M30.5363 15.355C28.9868 9.16 23.7398 4.705 17.4998 4.0825V1H14.4998V4.0825C8.25982 4.705 3.01282 9.16 1.46332 15.355C1.32382 15.913 1.51582 16.504 1.95982 16.8715C2.40382 17.239 3.01732 17.3215 3.54232 17.0845C7.07332 15.475 11.1953 15.73 14.4953 17.635V27.25C14.4953 29.3185 16.1783 31 18.2453 31C20.3123 31 21.9953 29.3185 21.9953 27.25V26.5H18.9953V27.25C18.9953 27.664 18.6593 28 18.2453 28C17.8313 28 17.4953 27.664 17.4953 27.25V17.6425C20.7968 15.7315 24.9263 15.472 28.4603 17.0845C28.9838 17.323 29.5988 17.2405 30.0428 16.8715C30.4868 16.5025 30.6758 15.913 30.5363 15.355ZM15.9998 15.01C13.7243 13.693 11.1518 13 8.49982 13C7.46482 13 6.44182 13.1065 5.43982 13.318C7.49032 9.4915 11.5013 7 15.9998 7C20.4983 7 24.5093 9.4915 26.5598 13.318C22.9943 12.5665 19.1633 13.1785 15.9998 15.01Z'
  )
  // iconPath.setAttribute('stroke-linecap', 'round')
  // iconPath.setAttribute('stroke-linejoin', 'round')
  // iconPath.setAttribute('stroke-width', '2')

  iconSvg.appendChild(iconPath)

  // return node.appendChild(iconSvg)
  return node.insertAdjacentElement('afterbegin', iconSvg)
}

//*** using async function and fetch api combined to call the weather api
async function callWeatherAPI(lat, lon, apiKey, countryCode) {
  try {
    console.log(
      document.styleSheets[1].cssRules[56].style.getPropertyValue(
        'background-image'
      )
    )

    //* when the api is called, it updates the titles flag and country with new information
    document.styleSheets[1].cssRules[56].style.setProperty(
      'background-image',
      `url(https://countryflagsapi.com/svg/${countryCode})`
    )
    // console.log(
    //   document.styleSheets[1].cssRules[56].style.getPropertyValue(
    //     'background-image'
    //   )
    // )
    $('#city').textContent = regionNames.of(`${countryCode.toUpperCase()}`)

    $mainContainer.innerHTML = ''

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/onecall?lat=4.62&lon=-74.06&exclude=hourly,minutely&units=metric&appid=a160c9f9d33936d99b022f2f7848b56b`
    )
    let data
    // console.log(response)
    // console.log(response.status)
    // console.log(response.statusText)

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText }

    data = await response.json()
    // console.log(data, typeof data)
    // console.log(JSON.stringify(data))

    data.daily.forEach(day => {
      // console.log('lol')
      // create the parent article element
      const $weatherDay = document.createElement('article')
      $weatherDay.className = 'weather__day'
      //create img for the weather icon
      const $weatherDayIcon = document.createElement('img')
      //create span for the weather DATE
      const $weatherDayDate = document.createElement('span')
      const weekDay = new Date(day.dt * 1000).getDay()
      const monthDay = new Date(day.dt * 1000).getDate()
      //create span for the weather POP
      const $weatherDayPOP = document.createElement('span')
      // $weatherDayPOP.style.display = 'inline-block'
      renderSVGUmbrella($weatherDayPOP)
      console.log($weatherDayPOP)
      //create span for the weather TEMP
      const $weatherDayTemp = document.createElement('span')
      $weatherDayIcon.className = 'weather__icon'
      $weatherDayDate.className = 'weather__date'
      $weatherDayPOP.className = 'weather__pop'
      $weatherDayTemp.className = 'weather__temp'
      // console.log(day.weather[0].id)
      // console.log(typeof day.weather[0].id)

      let weatherID = day.weather[0].id
      // debugger
      // console.log(weatherID)

      switch (true) {
        case weatherID >= 200 && weatherID < 300:
          {
            $weatherDay.classList.add('bgc-stormy')
            $weatherDayDate.classList.add('txt-sunny')
            $weatherDayPOP.classList.add('txt-light-snow')
            $weatherDayTemp.classList.add('txt-sunny')
            $weatherDayIcon.setAttribute('src', './assets/stormy.png')
            $weatherDayIcon.setAttribute('alt', 'stormy weather icon')
          }
          break
        case weatherID >= 300 && weatherID < 600:
          {
            $weatherDay.classList.add('bgc-rainy')
            $weatherDayDate.classList.add('txt-sunny')
            $weatherDayPOP.classList.add('txt-light-snow')
            $weatherDayTemp.classList.add('txt-sunny')
            $weatherDayIcon.setAttribute('src', './assets/rainy.png')
            $weatherDayIcon.setAttribute('alt', 'rainy weather icon')
          }
          break
        case weatherID >= 600 && weatherID < 700:
          {
            $weatherDay.classList.add('bgc-snowy')
            $weatherDayDate.classList.add('txt-stormy')
            $weatherDayPOP.classList.add('txt-light-storm')
            $weatherDayTemp.classList.add('txt-stormy')
            $weatherDayIcon.setAttribute('src', './assets/snowy.png')
            $weatherDayIcon.setAttribute('alt', 'snowy weather icon')
          }
          break
        case weatherID >= 700 && weatherID < 800:
          {
            $weatherDay.classList.add('bgc-partly-cloudy')
            $weatherDayDate.classList.add('txt-sunny')
            $weatherDayPOP.classList.add('txt-light-snow')
            $weatherDayTemp.classList.add('txt-sunny')
            $weatherDayIcon.setAttribute('src', './assets/partly-cloudy.png')
            $weatherDayIcon.setAttribute('alt', 'partly cloudy weather icon')
          }
          break
        case weatherID === 800:
          {
            $weatherDay.classList.add('bgc-sunny')
            $weatherDayDate.classList.add('txt-cloudy')
            $weatherDayPOP.classList.add('txt-light-storm')
            $weatherDayTemp.classList.add('txt-cloudy')
            $weatherDayIcon.setAttribute('src', './assets/sunny.png')
            $weatherDayIcon.setAttribute('alt', 'sunny weather icon')
          }
          break
        case weatherID > 800 && weatherID < 900:
          {
            $weatherDay.classList.add('bgc-cloudy')
            $weatherDayDate.classList.add('txt-sunny')
            $weatherDayPOP.classList.add('txt-light-snow')
            $weatherDayTemp.classList.add('txt-sunny')
            $weatherDayIcon.setAttribute('src', './assets/cloudy.png')
            $weatherDayIcon.setAttribute('alt', 'cloudy weather icon')
            console.log('cloudy')
          }
          break
      }

      $weatherDay.appendChild($weatherDayIcon)
      // console.log($weatherDay)
      // console.log($weatherDayIcon)
      // console.log(weekDay)
      switch (weekDay) {
        case 0:
          $weatherDayDate.textContent = `${weekDays[0]} ${monthDay}`
          break
        case 1:
          $weatherDayDate.textContent = `${weekDays[1]} ${monthDay}`
          break
        case 2:
          $weatherDayDate.textContent = `${weekDays[2]} ${monthDay}`
          break
        case 3:
          $weatherDayDate.textContent = `${weekDays[3]} ${monthDay}`
          break
        case 4:
          $weatherDayDate.textContent = `${weekDays[4]} ${monthDay}`
          break
        case 5:
          $weatherDayDate.textContent = `${weekDays[5]} ${monthDay}`
          break
        case 6:
          $weatherDayDate.textContent = `${weekDays[6]} ${monthDay}`
          break
      }
      $weatherDay.appendChild($weatherDayDate)

      $weatherDayPOP.textContent = `${(day.pop * 100).toFixed()}%`
      $weatherDayTemp.textContent = `${day.temp.day.toFixed(1)}°`

      $weatherDay.appendChild($weatherDayPOP)
      $weatherDay.appendChild($weatherDayTemp)
      $fragment.appendChild($weatherDay)
    })

    $mainContainer.append($fragment)

    const POPelements = $$('.weather__pop')
    // const POPelements = await $$('.weather__pop')

    POPelements.forEach(element => {
      renderSVGUmbrella(element)
    })

    //~ this next loop saves the classes of all the span elements containing the day and date, ie (SAT 7, SUN 8 etc.) so we can use the array currentDateClasses later when the user resizes the window
    // document.querySelectorAll('.weather__date').forEach(date => {
    //   currentDateClasses.push(date.className)
    //   // console.log(date.className)
    //   // date.className = 'weather__date txt-cloudy'
    // })
    // console.log(currentDateClasses)

    // if (window.innerWidth >= 1300) {
    //   // document.querySelectorAll('.weather__date').forEach(date => date.classList.add('txt-cloudy'))
    //   document.querySelectorAll('.weather__date').forEach(date => {
    //     // let currentClasses = date.className
    //     // console.log( date.className)
    //     date.className = 'weather__date txt-cloudy'
    //   })
    // } else {
    //   document
    //     .querySelectorAll('.weather__date')
    //     .forEach((date, index) => (date.className = currentDateClasses[index]))
    // }
  } catch (err) {
    console.error(err)
    console.error(err.status, err.statusText)
  } finally {
  }
  // else {
  //   response
  // }
}

async function getLatitudeAndLongitudeFromAPI(country) {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
      // `https://restcountries.com/v3.1/name/germany`
    )
    let data
    let latitude
    let longitude
    // console.log(response)
    // console.log(response.status)
    // console.log(response.statusText)

    if (!response.ok)
      throw { status: response.status, statusText: response.statusText }

    data = await response.json()
    console.log(data)

    // latitude = data[0].capitalInfo.latlng[0]
    // longitude = data[0].capitalInfo.latlng[1]
    ;[latitude, longitude] = data[0].capitalInfo.latlng

    return { latitude, longitude }
  } catch (err) {
    console.log(err)
  }
}

// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.error(err))

// callWeatherAPI(coordinates.co[0], coordinates.co[1], MY_KEY)
// callWeatherAPI(coordinates.au[0], coordinates.au[1], MY_KEY, coordinates.au[2])
// ;(async () =>
//   await callWeatherAPI(
//     coordinates.us[0],
//     coordinates.us[1],
//     MY_KEY,
//     coordinates.us[2]
//   ))()

document.addEventListener(
  'DOMContentLoaded',
  async () =>
    await callWeatherAPI(
      coordinates.us[0],
      coordinates.us[1],
      K,
      coordinates.us[2]
    )
)

// console.log(coordinates.us[0], coordinates.us[1])

let today = new Date()
let day8 = new Date(1652284800 * 1000)

console.log(today.getDay())
console.log(day8)

// window.addEventListener('resize', e => {
//   // debugger
//   console.log(window.innerWidth)

//   if (window.innerWidth >= 1300) {
//     // document.querySelectorAll('.weather__date').forEach(date => date.classList.add('txt-cloudy'))
//     document.querySelectorAll('.weather__date').forEach(date => {
//       // let currentClasses = date.className
//       // console.log( date.className)
//       date.className = 'weather__date txt-cloudy'
//     })
//   } else {
//     document
//       .querySelectorAll('.weather__date')
//       .forEach((date, index) => (date.className = currentDateClasses[index]))
//   }
// })

//~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE MENU BUTTON~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE MENU BUTTON~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~CLOSE MENU BUTTON~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log($closeMenuButton)

$closeMenuButton.addEventListener('click', function () {
  $sideMenu.classList.toggle('active')
})

$openMenuButton.addEventListener('click', function () {
  $sideMenu.classList.toggle('active')
})

document.addEventListener('click', function (e) {
  // if(e.target !== $openMenuButton && !e.target.matches('.side-menu__select')) {
  // if (
  //   e.target !== $openMenuButton &&
  //   e.target !==
  //     $('.side-menu__select' && e.target !== $$('.side-menu__select *'))
  // ) {
  //   if ($sideMenu.className.includes('active'))
  //     $sideMenu.classList.remove('active')
  //   console.log('lol')
  // }
  if (
    e.target === $openMenuButton ||
    e.target === $('.side-menu__select') ||
    e.target.matches('.side-menu__select *')
  )
    return
  if ($sideMenu.className.includes('active'))
    $sideMenu.classList.remove('active')
  console.log('lol')

  // if (e.target !== $sideMenu && $sideMenu.className.includes('active')) {
  //   $sideMenu.remove('active')
  //   console.log('lol')
  // }

  // console.log(e.target)
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~MENU FLAG BUTTONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~MENU FLAG BUTTONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~MENU FLAG BUTTONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// when any of the buttons on the side menu is clicked, it calls the api again with the new latitude and longitude from that country and displays the weekly weather in the screen
$$('.side-menu__country').forEach(btn => {
  btn.addEventListener('click', function () {
    let lat = coordinates[this.textContent.toLowerCase()][0]
    let long = coordinates[this.textContent.toLowerCase()][1]
    let countryCode = coordinates[this.textContent.toLowerCase()][2]
    console.log(this.textContent)
    // console.log(coordinates[this.textContent.toLowerCase()])
    console.log(lat, long)

    callWeatherAPI(lat, long, K, countryCode)
  })
})

console.log($('#city').style.getPropertyValue('--url'))
let cityColor = $('#city').style.getPropertyValue('font-size')
console.log(cityColor)
console.log($('#city'))

// console.log(document.styleSheets[1].cssRules[52].style.getPropertyValue('--url'))
console.log(
  document.styleSheets[1].cssRules[56].style.getPropertyValue(
    'background-image'
  )
)

// console.log(document.styleSheets[1].style.getPropertyValue('font-size'))

// console.log(renderSVGUmbrella(document.querySelector('.title')))

// setTimeout(function () {
//   const POPelements = $$('.weather__pop')

//   POPelements.forEach(element => {
//     renderSVGUmbrella(element)
//   })
//   // console.log(renderSVGUmbrella(document.querySelector('.weather__pop')))
// }, 1000)

//~~~~~~~~~~~~~~~~~~~~~~~~SELECT MENU FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~SELECT MENU FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~SELECT MENU FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~SELECT MENU FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~

$countrySelectMenu.addEventListener('change', async e => {
  console.log('menu has changed')
  console.log(e.target)

  let countryCode = e.target.value
  let country = regionNames.of(e.target.value)

  $sideMenu.classList.remove('active')
  console.log('countryCode:', countryCode)
  console.log('country:', country)

  await getLatitudeAndLongitudeFromAPI(country.toLowerCase()).then(latlong =>
    console.log(latlong)
  )

  const { latitude, longitude } = await getLatitudeAndLongitudeFromAPI(
    country.toLowerCase()
  ).then(latlong => latlong)

  console.log('LAT=', latitude)
  console.log('LONG=', longitude)

  // todo call API weather function with the values we obtained
  callWeatherAPI(latitude, longitude, K, countryCode)
})

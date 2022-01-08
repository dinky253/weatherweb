console.log('Client Side Js Loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const columnHeading1 = document.querySelector('.column__heading--1')
const columnHeading2 = document.querySelector('.column__heading--2')
const cell1 = document.querySelector('.cell-1')
const cell2 = document.querySelector('.cell-2')
const cell3 = document.querySelector('.cell-3')
const cell4 = document.querySelector('.cell-4')
const cell5 = document.querySelector('.cell-5')
const cell6 = document.querySelector('.cell-6')
const cell7 = document.querySelector('.cell-7')
const cell8 = document.querySelector('.cell-8')
const cell9 = document.querySelector('.cell-9')
const cell10 = document.querySelector('.cell-10')
const cell11 = document.querySelector('.cell-11')
const cell12 = document.querySelector('.cell-12')
const cell13 = document.querySelector('.cell-13')
const cell14 = document.querySelector('.cell-14')
const cell15 = document.querySelector('.cell-15')
const cell16 = document.querySelector('.cell-16')
const cell17 = document.querySelector('.cell-17')
const cell18 = document.querySelector('.cell-18')
const result = document.querySelector('.result')

const mymap = L.map('mapid').setView([0, 0], 1)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
   attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   id: 'mapbox/streets-v11',
   tileSize: 512,
   zoomOffset: -1,
   accessToken:
      'pk.eyJ1IjoiYWJoaWluMjQyNSIsImEiOiJja2JqNTQxcWowa215MnNteTdpd2FkYWwyIn0.IOQupMMNwtszul5Wfhc3XQ',
}).addTo(mymap)

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const location = search.value
   messageOne.textContent = 'Loading...'

   fetch('/weather?address=' + location).then((response) => {
      response.json().then((data) => {
         if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
         } else {
            const {
               weather_details: {
                  temperature,
                  wind_direction,
                  wind_speed,
                  humidity,
                  local_time,
                  climate,
               },
               address: { latitude, longitude, location },
            } = data
            messageOne.textContent = ''
            L.marker([latitude, longitude]).addTo(mymap)
            mymap.setView([latitude, longitude], 8)

            result.style = 'background-color: #eee; display: block;'
            columnHeading1.style = 'background-color: #111'
            columnHeading1.textContent = 'DATA'
            columnHeading2.textContent = 'VALUES'
            cell1.textContent = 'Latitude'
            cell2.textContent = latitude

            cell3.textContent = 'Longitude'
            cell4.textContent = longitude

            cell5.textContent = 'Location'
            cell6.textContent = location

            cell7.textContent = 'Temperature'
            cell8.textContent = temperature

            cell9.textContent = 'Wind Speed'
            cell10.textContent = wind_speed

            cell11.textContent = 'Wind Direction'
            cell12.textContent = wind_direction

            cell13.textContent = 'Humidity'
            cell14.textContent = humidity

            cell15.textContent = 'Local Time'
            cell16.textContent = local_time

            cell17.textContent = 'Climate'
            cell18.textContent = climate
         }
      })
   })
})

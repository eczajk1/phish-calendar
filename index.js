const axios = require('axios');
const ical = require('ical-generator')

// const calendar = require('./calendar.json')

axios.get('https://api.phish.net/v5/shows/artist/phish.json?order_by=showdate&direction=desc&apikey=E334A0B4D0535769A41D')
  .then(function (response) {

    const shows = response.data.data

    const calendar = ical({name: 'Phish'});

    shows.forEach(show => {

      const showDate = new Date(show.showdate)
      show.show_date

      calendar.createEvent({
        start: showDate,
        end: showDate,
        summary: show.venue,
        description: show.setlist_notes,
        location: `${show.city}, ${show.state}`,
        // url: 'http://sebbo.net/'
      });
    })

    console.info(calendar.toString())

  })

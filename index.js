const fs = require('fs').promises
const axios = require('axios');
const ical = require('ical-generator')

const run = async () => {
  const { data } = await axios.get('https://api.phish.net/v5/shows/artist/phish.json?order_by=showdate&direction=desc&apikey=')

  const calendar = ical({name: 'Phish'});

  const shows = data.data

  shows.forEach(show => {

    const {
      showdate,
      venue,
      city,
      state,
      country,
      permalink,
    } = show

    calendar.createEvent({
      
      // NOTE: dates are in UTC
      start: new Date(showdate),
      allDay: true,

      summary: venue,

      // NOTE: description has some escaped characters
      // description: show.setlist_notes,
      location: [city, state, country].filter(l => !!l).join(', '),

      // NOTE: Link to setlist (doesn't show up in Google)
      url: permalink,
    });
  })

  console.info(calendar.toString())
  await fs.writeFile('phish.ics', calendar.toString())
}

run()

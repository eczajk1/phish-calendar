const fs = require('fs').promises
const axios = require('axios');
const ical = require('ical-generator')

const run = async () => {
  const url = `https://api.phish.net/v5/shows/artist/phish.json?order_by=showdate&direction=desc&apikey=${process.env.API_KEY}`
  const { data } = await axios.get(url)
  console.info(JSON.stringify(data, null, 2))

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

  await fs.writeFile('phish.ics', calendar.toString())
}

run()

const path = require('node:path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Swadhin Baroi',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Swadhin Baroi',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Swadhin Baroi',
    helpText: 'This is a help text',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      console.log(location);
      console.log(forecastData);
      res.send({
        address,
        location,
        forecast: forecastData,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Swadhin',
    message: 'Help Artical Not Found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Swadhin',
    message: 'Page Not Found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

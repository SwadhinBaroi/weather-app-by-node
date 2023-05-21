const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4e6a21e9fc3884d7e0ec72374c8f48d8&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect Weather Service!', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const result = `${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} degree out. But It feels like ${body.current.feelslike} degree. And the Humidity is ${body.current.humidity}% outside.`;
      callback(undefined, result);
    }
  });
};

module.exports = forecast;

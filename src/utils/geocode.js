const request = require('request');

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=394827df6c9dce951df19b255dbe917b&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect Map Service!', undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else if (body.data.length == 0) {
      callback('There is no information about this palce', undefined);
    } else {
      const latitude = body.data[0].latitude;
      const longitude = body.data[0].longitude;
      const location = body.data[0].label;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const showLocation = document.querySelector('.location');
const showForecast = document.querySelector('.forecast');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showLocation.textContent = 'Loading messages...';
  showForecast.textContent = '';
  const location = searchInput.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (showLocation.textContent = `Error: ${data.error}`);
        }
        showLocation.textContent = `Location: ${data.location}`;
        showForecast.textContent = `Forecast: ${data.forecast}`;
      });
    }
  );
});

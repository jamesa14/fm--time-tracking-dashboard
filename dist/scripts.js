// Data
const url = '../data.json';
let timeframeData = '';

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

getData(url).then(data => {
  timeframeData = data; // store so we don't have to retrieve it each time.
  displayData(data, 'weekly');
});

// UI
const timeCards = document.querySelector('#time-cards');
const timeframeButtons = document.querySelectorAll('.timeframe-select');

function displayData(data, timeframe) {
  if (!['daily', 'weekly', 'monthly'].includes(timeframe)) {
    console.log('invalid timeframe!');
    return; // exit early if invalid timeframe
  }

  // reset inner html
  timeCards.innerHTML = '';

  // generate correct timeframe text to display
  let timeframeText = '';
  switch (timeframe) {
    case 'daily':
      timeframeText = 'Yesterday';
      break;
    case 'weekly':
      timeframeText = 'Last Week';
      break;
    case 'monthly':
      timeframeText = 'Last Month';
      break;
  }

  // map the data and insert HTML
  data.map(time => {
    const markup = `
      <div class="card type-${time.title.replace(/\s+/g, '-').toLowerCase()}">
        <div class="inner">
          <span class="title">${time.title}</span>
          <span class="current-time">${time.timeframes[timeframe].current}hrs</span>
          <span class="previous-time">${timeframeText} - ${time.timeframes[timeframe].previous}hrs</span>
        </div>
      </div>
    `;
    timeCards.insertAdjacentHTML('beforeend', markup);
  });
}

function handleTimeframeChange(e) {
  // update data base on new timeframe selected
  const timeframe = e.target.dataset.timeframe;
  displayData(timeframeData, timeframe);

  // change active class
  timeframeButtons.forEach(button => {
    if (button != e.target) {
      button.classList.remove('active');
    } else {
      button.classList.add('active');
    }
  });
  
}

timeframeButtons.forEach(button => addEventListener('click', handleTimeframeChange));

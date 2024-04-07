import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button');

let userSelectedDate;
let timeInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - new Date();
    if (timeInterval < 1) {
      startButton.disabled = true;
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
    } else {
      startButton.disabled = false;
      inputTime.disabled = true;
      startButton.classList.add(`btn-active`);
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const calendar = flatpickr('#datetime-picker', options);
const inputTime = document.querySelector('#datetime-picker');
const showTime = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
console.log(showTime);

startButton.disabled = true;


startButton.addEventListener('click', event => {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    timeInterval = userSelectedDate.getTime() - currentTime.getTime();
    startButton.classList.remove(`btn-active`);
    if (timeInterval < 1) {
      startButton.disabled = true;
      clearInterval(intervalId);
      return;
    }
    const timer = convertMs(timeInterval);
    showTime.days.innerText = timer.days.toString().padStart(2, '0');
    showTime.hours.innerText = timer.hours.toString().padStart(2, '0');
    showTime.minutes.innerText = timer.minutes.toString().padStart(2, '0');
    showTime.seconds.innerText = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});

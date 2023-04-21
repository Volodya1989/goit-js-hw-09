// Described in documentation
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_green.css');
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector("input[type = 'text']"),
  btnStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
let days = null;
let hours = null;
let minutes = null;
let seconds = null;
let selectedTime = null;
let currentTime = null;
let difference = null;

Notiflix.Notify.init({
  timeout: 3000,
});
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedTime = parseInt(selectedDates[0].getTime());
    currentTime = parseInt(options.defaultDate.getTime());
    if (selectedTime <= currentTime) {
      refs.btnStart.disabled = true;
      updateUI(0, 0, 0, 0);
      return Notiflix.Notify.failure('Please choose a date in the future...');
    }
    difference = selectedTime - currentTime;
    convertMs(difference);

    updateUI(days, hours, minutes, seconds);
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

function onStart() {
  refs.btnStart.disabled = true;
  Notiflix.Notify.success('Countdown timer started successfully!');
  const timerId = setInterval(() => {
    let currentTime2 = new Date();
    difference = selectedTime - currentTime2;
    convertMs(difference);
    updateUI(days, hours, minutes, seconds);
    if (difference < 0) {
      clearInterval(timerId);
      updateUI(0, 0, 0, 0);
    }
  }, 1000);
}

function updateUI(d, h, m, s) {
  refs.dataDays.innerHTML = addLeadingZero(d);
  refs.dataHours.innerHTML = addLeadingZero(h);
  refs.dataMinutes.innerHTML = addLeadingZero(m);
  refs.dataSeconds.innerHTML = addLeadingZero(s);
}

function addLeadingZero(value) {
  return (result = value.toString().padStart(2, '0'));
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  days = Math.floor(ms / day);
  // Remaining hours
  hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.btnStart.addEventListener('click', onStart);

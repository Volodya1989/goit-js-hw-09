// Described in documentation
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_green.css');
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

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
  timeout: 4000,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedTime = parseInt(selectedDates[0].getTime());
    currentTime = new Date().getTime();
    difference = selectedTime - currentTime;

    if (selectedTime <= currentTime) {
      refs.btnStart.disabled = true;
      updateUI(0, 0, 0, 0);
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    convertMs(difference);
    updateUI(days, hours, minutes, seconds);
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

function onStart() {
  refs.btnStart.disabled = true;
  Notiflix.Notify.success('Countdown timer started successfully!', {
    timeout: 3000,
  });
  const timerId = setInterval(() => {
    let currentTime2 = new Date();
    difference = selectedTime - currentTime2;
    convertMs(difference);
    updateUI(days, hours, minutes, seconds);
    if (difference < 0) {
      jsConfetti.addConfetti();
      clearInterval(timerId);
      const confettiId = setInterval(() => {
        jsConfetti.addConfetti();
        setTimeout(() => {
          clearInterval(confettiId);
        }, 6000);
      }, 1500);
      updateUI(0, 0, 0, 0);

      setTimeout(() => {
        Notiflix.Notify.warning(
          'Please reload the page to start countdown timer again',
          {
            timeout: 25000,
          }
        );
      }, 4000);
    }
  }, 1000);
}

function updateUI(d, h, m, s) {
  refs.dataDays.textContent = addLeadingZero(d);
  refs.dataHours.textContent = addLeadingZero(h);
  refs.dataMinutes.textContent = addLeadingZero(m);
  refs.dataSeconds.textContent = addLeadingZero(s);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

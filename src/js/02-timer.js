// Described in documentation
import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/material_green.css');

// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector("input[type = 'text']"),
  btnStart: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedTime = parseInt(selectedDates[0].getTime());
    const currentTime = parseInt(options.defaultDate.getTime());
    if (selectedTime <= currentTime) {
      refs.btnStart.disabled = true;
      return alert('Please choose a date in the future');
    }
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

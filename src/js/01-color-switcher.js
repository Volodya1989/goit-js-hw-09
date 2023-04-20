refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let myInterval = null;

refs.btnStop.disabled = true;

const btnStopDisabled = () => {
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
};

const btnStartDisabled = () => {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
};

const onStart = () => {
  myInterval = setInterval(colorForBackground, 1000);
  btnStartDisabled();
};
const onStop = () => {
  clearInterval(myInterval);
  btnStopDisabled();
};

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const colorForBackground = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

refs.btnStart.addEventListener('click', onStart);

refs.btnStop.addEventListener('click', onStop);

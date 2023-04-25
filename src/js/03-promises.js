import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  inputDelay: document.querySelector("input[name='delay']"),
};

let intId = null;
let position = null;
let total = null;
const formData = {};

const onInput = e => {
  if (e.target.value < 0) {
    e.target.value = 0;
  }
  if (e.target.name === 'amount' && e.target.value < 1) {
    e.target.value = 1;
  }
  formData[e.target.name] = e.target.value;
};
const onSubmit = e => {
  e.preventDefault();

  const { delay, amount, step } = formData;

  intId = setInterval(() => {
    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        if (position === 1) {
          total = parseInt(delay);
          console.log(`✅ Fulfilled promise ${position} in ${total} ms`);
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${total} ms`,
            {
              timeout: delay,
            }
          );
        } else {
          total += parseInt(step);
          console.log(`✅ Fulfilled promise ${position} in ${total} ms`);
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${total} ms`,
            {
              timeout: delay,
            }
          );
        }
      })
      .catch(({ position, delay }) => {
        if (position === 1) {
          total = parseInt(delay);
          console.log(`❌ Rejected promise ${position} in ${total} ms`);
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${total} ms`,
            {
              timeout: delay,
            }
          );
        } else {
          total += parseInt(step);
          console.log(`❌ Rejected promise ${position} in ${total} ms`);
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${total} ms`,
            {
              timeout: delay,
            }
          );
        }
      });
    if (position === parseInt(amount)) {
      return clearInterval(intId);
    }
  }, step);
  position = null;
  total = null;
  console.clear();
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.formEl.addEventListener('input', onInput);

refs.formEl.addEventListener('submit', onSubmit);

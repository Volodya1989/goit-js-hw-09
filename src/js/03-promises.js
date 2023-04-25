import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  inputDelay: document.querySelector("input[name='delay']"),
};
let intId = null;
let position = null;
let total = null;
const formData = {};
refs.formEl.addEventListener('input', e => {
  if (e.target.value < 0) {
    e.target.value = 0;
  }
  if (e.target.name === 'amount' && e.target.value < 1) {
    e.target.value = 1;
  }

  formData[e.target.name] = e.target.value;
});
const onSubmit = e => {
  e.preventDefault();

  const { delay, amount, step } = formData;

  intId = setInterval(() => {
    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        if (position === 1) {
          total = parseInt(delay);
          // console.log(`✅ Fulfilled promise ${position} in ${total} ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${total} ms`, {
            timeout: total,
          });
        } else {
          total += parseInt(step);
          // console.log(`✅ Fulfilled promise ${position} in ${total} ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${total} ms`, {
            timeout: step,
          });
        }
      })
      .catch(({ position, delay }) => {
        if (position === 1) {
          total = parseInt(delay);
          // console.log(`❌ Rejected promise ${position} in ${total} ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${total} ms`, {
            timeout: total,
          });
        } else {
          total += parseInt(step);
          // console.log(`❌ Rejected promise ${position} in ${total} ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${total} ms`, {
            timeout: step,
          });
        }
      });
    if (position === parseInt(amount)) {
      return clearInterval(intId);
    }
  }, step);
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
function onSuccess({ amount, counter }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  if (counter === amount) {
    clearInterval(intId);
  }
}

refs.formEl.addEventListener('submit', onSubmit);

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 3000,
});

const formEl = document.querySelector('form[class="form"]');
const btnCreate = document.querySelector('button[type="submit"]');

function activateBtn(delayValue) {
  setTimeout(() => {
    btnCreate.disabled = false;
    formEl.reset();
  }, delayValue + 3000);
}

const onSubmit = e => {
  btnCreate.disabled = true;
  e.preventDefault();

  const { delay, amount, step } = e.target.elements;
  let delayValue = Number(delay.value);
  let total = delayValue - Number(step.value);

  function onSuccess(i) {
    Notiflix.Notify.success(
      `✅ Fulfilled promise ${i} in ${(total += Number(step.value))} ms`
    );
  }
  function onFailure(i) {
    Notiflix.Notify.failure(
      `❌ Rejected promise ${i} in ${(total += Number(step.value))} ms`
    );
  }

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayValue)
      .then(() => {
        onSuccess(i);
      })
      .catch(() => {
        onFailure(i);
      });
    delayValue += Number(step.value);
  }
  activateBtn(delayValue);
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

formEl.addEventListener('submit', onSubmit);

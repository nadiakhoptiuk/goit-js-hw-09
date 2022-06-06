import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', createPromises);

function createPromises(evt) {
  evt.preventDefault();
  const { delay, step, amount } = getDataFromForm(evt.currentTarget);
  const dataArrayForEachPromise = calculatePromiseData(delay, step, amount);
  createAllPromises(dataArrayForEachPromise);
}

function getDataFromForm(form) {
  const formData = new FormData(form);

  const dataObject = {};
  formData.forEach((value, name) => {
    dataObject[name] = Number(value);
  });

  return dataObject;
}

function calculatePromiseData(delay, step, amount) {
  const dataArrayForCreate = [];

  for (let i = 0; i < amount; i += 1) {
    const delayForEach = delay + i * step;
    const dataObjForEachPromise = {};
    dataObjForEachPromise.position = i + 1;
    dataObjForEachPromise.delay = delayForEach;
    dataArrayForCreate.push(dataObjForEachPromise);
  }

  return dataArrayForCreate;
}

function createAllPromises(arrayOfObj = []) {
  return arrayOfObj.map(({ position, delay }) =>
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })
  );
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return (promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  }));
}

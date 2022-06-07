// імпортуємо бібліотеку notiflix для сповіщень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

// додаємо слухача на форму
refs.form.addEventListener('submit', createPromises);

// загальна функція, яка викликається при відправленні форми
function createPromises(evt) {
  // скидаємо налаштування (перезавантаження сторінки)
  evt.preventDefault();

  // отримуємо в об'єкті та деструктуризуємо в змінні дані з форми
  const { delay, step, amount } = getDataFromForm(evt.currentTarget);

  // обчислюємо вихідні дані для кожного проміса
  const dataArrayForEachPromise = calculatePromiseData(delay, step, amount);

  // створюємо проміси за обчисленими вихідними даними
  createAllPromises(dataArrayForEachPromise);
}

// функція, яка забирає з форми дані і повертає їх у вигляді об'єкта
function getDataFromForm(form) {
  const formData = new FormData(form);

  const dataObject = {};
  formData.forEach((value, name) => {
    dataObject[name] = Number(value);
  });

  return dataObject;
}

// функція, яка обчислює вихідні дані для кожного проміса (в об'єкті) і поміщає їх в масив
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

// функція, яка створює проміси за обчисленими вихідними даними
function createAllPromises(arrayOfObj = []) {
  return arrayOfObj.map(({ position, delay }) =>
    // створюємо проміс для кожного елемента масива, викликаючи функцію для створення одного проміса:
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })
  );
}

// функція, яка створює один проміс за вихідними даними
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

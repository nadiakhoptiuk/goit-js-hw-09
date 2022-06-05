const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', startChangeColors);
refs.stopBtn.addEventListener('click', stopChangeColors);
refs.stopBtn.setAttribute('disabled', '');

// функція, яка генерує рандомний колір
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// функція, яка починає змінювати кольори фону
function startChangeColors(evt) {
  evt.target.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled');
  setBodyBgColor();

  intervalId = setInterval(() => {
    setBodyBgColor();
  }, 1000);
}

// функція, яка зупиняє зміну кольору фону
function stopChangeColors(evt) {
  clearInterval(intervalId);
  evt.target.setAttribute('disabled', '');
  refs.startBtn.removeAttribute('disabled');
}

// функція, яка встановлює колір на фон
function setBodyBgColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

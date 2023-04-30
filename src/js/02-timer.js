// імпорт бібліотеки flatpickr для календаря
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId;
let selectedDate = null;

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] > new Date()) {
      startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
      selectedDate = null;
      startBtn.setAttribute('disabled', true);
    }
  },
};
flatpickr(inputEl, options);

startBtn.addEventListener('click', onStartBtnClick);
function onStartBtnClick() {
  //   console.log('Button was clicked');
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    if (selectedDate - Date.now() < 0) {
      clearInterval(timerId);
    } else {
      convertMs(selectedDate - Date.now());
    }
    console.log(selectedDate - Date.now());
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  daysEl.textContent = addLeadingZero(days);

  const hours = Math.floor((ms % day) / hour);
  hoursEl.textContent = addLeadingZero(hours);

  const minutes = Math.floor(((ms % day) % hour) / minute);
  minutesEl.textContent = addLeadingZero(minutes);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  secondsEl.textContent = addLeadingZero(seconds);

  return { days, hours, minutes, seconds };
}

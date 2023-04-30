const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodeEl: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', () => {
  colors.start();
});

refs.stopBtn.addEventListener('click', () => {
  colors.stop();
});

const colors = {
  colorId: null,
  start() {
    this.colorId = setInterval(() => {
      refs.bodeEl.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    disabledStartBtn();
    visibleStopBtn();
  },
  stop() {
    clearInterval(this.colorId);

    disabledStopBtn();
    visibleStartBtn();
  },
};

function disabledStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
}
function visibleStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function disabledStopBtn() {
  refs.stopBtn.setAttribute('disabled', true);
}
function visibleStopBtn() {
  refs.stopBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

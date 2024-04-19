const ALERT_SHOW_TIME = 5000;

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElementsFromArray = (array, count) => {
  const arrayCopy = array.slice();
  const randomElements = [];

  count = array.length > count
    ? count
    : array.length;

  for (let i = 0; i < count; i++) {

    const randomIndex = getRandomPositiveInteger(0, arrayCopy.length - 1);

    randomElements.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }

  return randomElements;
};

const checkStringLength = (string, length) =>
  string.length <= length;


const isEscapeKey = (evt) =>
  evt.key === 'Escape';


const isEnterKey = (evt) =>
  evt.key === 'Enter';

const makeCounter = () => {
  let count = 0;

  return () =>
    ++count;
};

const throttle = (func, ms) => {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.color = '#eee';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getClickedChildWithClass = (parent, clickedNode, childElementClass) => {
  let needNode = clickedNode;

  while (needNode !== parent && needNode.tagName !== 'BODY') {
    if (needNode.classList.contains(childElementClass)) {
      break;
    }

    needNode = needNode.parentElement;
  }

  return needNode !== parent ? needNode : false;
};

export {
  getRandomPositiveInteger,
  getRandomElementsFromArray,
  checkStringLength,
  isEscapeKey,
  isEnterKey,
  makeCounter,
  throttle,
  debounce,
  showAlert,
  getClickedChildWithClass,
};

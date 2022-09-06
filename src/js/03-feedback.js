import storage from './storage.js';
const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

if (localStorage.getItem(LOCALSTORAGE_KEY)) {
  const formInfo = storage.load(LOCALSTORAGE_KEY);
  const formArrKeys = Object.keys(formInfo);

  formArrKeys.forEach(name =>
    formRef.elements[name].value = formInfo[name]
  );
}

formRef.addEventListener('input', throttle(updateStorage, 500));
formRef.addEventListener('submit', clearLocaleStorageAndFormFields);

function updateStorage(evt) {
  console.log(evt.currentTarget);
  const feedback = {};
  const formData = new FormData (formRef);
  formData.forEach((value, name) => {
    feedback[name] = value;
  });

  storage.save(LOCALSTORAGE_KEY, feedback);
}

function clearLocaleStorageAndFormFields(evt) {
  if (evt.currentTarget.elements.message.value) {
    evt.preventDefault();
    localStorage.clear();
    formRef.reset();
  } else {
    alert('Не все поля заполнены. За тобой выехали!');
  }
}
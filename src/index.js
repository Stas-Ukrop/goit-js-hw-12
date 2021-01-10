import './styles.css';
import card from './template/card.hbs';
import country from './template/country.hbs';
import _ from 'lodash';
import getFetch from './js/fetchCountries';
// import { data } from 'autoprefixer';
import errorNotification from './js/errorPnotify';

const refs = {
  inputText: document.querySelector('input[class="form-control"]'),
  outputText: document.querySelector('div[class="answer"]'),
  outputCountry: document.querySelector('div[class="contry"]'),
};
refs.inputText.addEventListener(
  'input',
  _.debounce(e => {
    e.preventDefault();
    callBackFetch(e.target.value);
  }, 300),
);
refs.outputText.addEventListener('click', e => {
  let targetCounry = e.target.textContent;
  if (e.target.localName === 'li') {
    getCountry(targetCounry);
  }
});

function callBackFetch(data) {
  refs.outputText.innerHTML='';
  refs.outputCountry.innerHTML='';
  if(!data){
    return;
  }
  getFetch(data)
    .then(returnListOfCountry)
    .catch(err => console.log(err));
}
function getCountry(point) {
  getFetch(point)
    .then(data => {
      const putCountry = country(data[0]);
      refs.outputCountry.innerHTML = putCountry;
    })
    .catch(err => console.log(err));
}

function addToList(data) {
  const murkUp = card(data);
  refs.outputText.innerHTML = murkUp;
}

function returnListOfCountry(data) {
  let d = [...data].length;
  if (data.status === 404) {
    return errorNotification(
      'not found.',
      'Please enter a more "конкретно)" query!',
    );
  } else if (d > 10) {
    return errorNotification(
      'Too many "дохрена" found.',
      'Please enter a more "конкретно)" query!',
    );
  } else if (d === 1) {
    addToList(data);
    getCountry(data[0].name);
    return;
  } else if (0 < d && d < 11) {
    addToList(data);
    return;
  }
}

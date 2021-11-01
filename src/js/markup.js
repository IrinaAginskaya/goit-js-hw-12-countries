import fetchCountries from './fetchCountries';
import refs from './refs';
import countryCardTpl from '../templates/one-country.hbs';
import countriesListTpl from '../templates/countries.hbs';
import pnotify from './pnotify';

const debounce = require('lodash.debounce');
const errorMessage = 'Too many matches found. Please enter a more specific query!';


refs.input.addEventListener('input', debounce(markupCountryResult, 500));
let nameCountry;

function markupCountryResult() {
  nameCountry = refs.input.value;
  fetchCountries(nameCountry).then(resultMoreTen).catch(message => pnotify(message));
};



function resultMoreTen(array) {
  
let numberCountries = array.length;
 if (numberCountries === 1) {
    const markup = countryCardTpl(array[0]);
    refs.result.innerHTML = markup;
  } else if (numberCountries <= 10) {
    const markup = countriesListTpl(array);
    refs.result.innerHTML = markup;
  } else if (numberCountries > 10) {
    pnotify(errorMessage);
  } else {
   refs.result.innerHTML = `Введена ерунда`;
  }
  }
  
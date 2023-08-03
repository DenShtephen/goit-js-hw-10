
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const selectors = {
  selectBtn: document.querySelector('.breed-select'),
  loaderMessage: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
  catInfoDiv: document.querySelector('.cat-info'),
};

selectors.selectBtn.addEventListener('change', handleSelectChange);

function handleSelectChange() {
  const selectedBreedId = selectors.selectBtn.value;

 selectors.catInfoDiv.innerHTML = '';

  showLoader();
  fetchCatByBreed(selectedBreedId)
        .then(data => {
      if (data.length === 0) {
        throw new Error('No cat found for the selected breed');
      }
      return data[0];
    })
    .then(cat => {
      displayCatInfo(cat);
      hideLoader();
    })
    .catch(error => {
      console.error(error);
      showError();
      hideLoader();
    });
}

function showLoader() {
  selectors.loaderMessage.style.display = 'block';
  hideError();
}

function hideLoader() {
  selectors.loaderMessage.style.display = 'none';
}

function showError() {
  Notiflix.Notify.failure(selectors.errorMessage.textContent);
}

function hideError() {
  selectors.errorMessage.style.display = 'none';
}

function populateBreedSelect(data) {
  const optionsCats = data
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');

  selectors.selectBtn.insertAdjacentHTML('beforeend', optionsCats);

  hideLoader();
}

function displayCatInfo(cat) {
  selectors.catInfoDiv.innerHTML = `<img src="${cat.url}" alt="Cat Image">
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <h3>Temperament: ${cat.breeds[0].temperament}</h3>`;
}

showLoader();
fetchBreeds()
  .then(data => {
    populateBreedSelect(data);
    new SlimSelect({
      select: '.breed-select',
    });

    selectors.selectBtn.classList.remove("is-hidden")
  })
  .catch(error => {
    console.error(error);
    showError();
    hideLoader();
  });
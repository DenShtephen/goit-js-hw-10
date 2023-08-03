// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import '/node_modules/slim-select/dist/slimselect.css';
// import SlimSelect from 'slim-select';


// const CATS_LIST = 'https://api.thecatapi.com/v1/breeds';
// const DESCRIPTION_CATS = 'https://api.thecatapi.com/v1/images/search';

// const refs = {
//   select: document.querySelector('.breed-select'),
//   pLoader: document.querySelector('.loader'),
//   pError: document.querySelector('.error'),
//   catInfo: document.querySelector('.cat-info'),
// };



// function fetchBreeds() {
//   return fetch(CATS_LIST)
//     .then(res => {
//       if (!res.ok) throw new Error('Failed to fetch cat breeds. Please try again later.');
//       return res.json();
//     });
// }

// function fetchCatsByBreed(data) {
//   return fetch(`${DESCRIPTION_CATS}?breed_ids=${data}`)
//     .then(res => {
//       if (!res.ok) throw new Error('Failed to fetch cat information. Please try again later.');
//       return res.json();
//     });
// }

// function catsID(id) {
//   return fetch(`https://api.thecatapi.com/v1/images/${id}`)
//     .then(res => {
//       if (!res.ok) throw new Error('Failed to fetch cat information. Please try again later.');
//       return res.json();
//     });
// }

// function catsMarkup(cat, catDiscr) {
//   const markup = `<img class="cat-img" src="${cat.url}" width="340"/>
//                   <div class="cat-description">
//                     <h2>${cat.breeds[0].name}</h2>
//                     <p>${cat.breeds[0].description}</p>
//                     <p><h3>Temperament:</h3> ${cat.breeds[0].temperament}</p>
//                   </div>`;
//   catDiscr.innerHTML = markup;
// }

// fetchBreeds()
//   .then(res => {
//     refs.select.innerHTML = res.map(({ id, name }) => {
//       return `<option value="${id}">${name}</option>`;
//     }).join('');
//     new SlimSelect({
//       select: refs.select
//     });
//   })
//   .catch(err => {
//     Notiflix.Notify.failure('Oops! Failed to fetch cat breeds. Please try reloading the page.');
//   })
//   .finally(() => {
//     refs.pLoader.style.display = 'none';
//     refs.select.style.display = 'block';
//   });

// refs.select.addEventListener('change', () => {
//   refs.catInfo.innerHTML = '';
//   const valueSelect = refs.select.value;
//   refs.pLoader.style.display = 'block';
  
//   fetchCatsByBreed(valueSelect)
//     .then(img => catsID(img[0].id))
//     .then(res => {
//       catsMarkup(res, refs.catInfo);
//     })
//     .catch(err => {
//       Notiflix.Notify.failure('Oops! Failed to fetch cat information. Please try again later.');
//     })
//     .finally(() => {
//       refs.pLoader.style.display = 'none';
//     });
// });


import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_gUld3cMrYmHs3gm8tWo5f9G9vTAV4G5ihyJNMUOmW5lZeRmq54qrDKaR9z1Xf3xn';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  const END_POINT = '/breeds';

  return axios.get(`${END_POINT}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';

  return axios
    .get(`${END_POINT}?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No cat found for the selected breed');
      }
      return data[0];
    });
}

export { fetchBreeds, fetchCatByBreed };
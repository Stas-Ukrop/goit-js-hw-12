function getFetch(point) {
  return fetch(`https://restcountries.eu/rest/v2/name/${point}`)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
}

export default getFetch;

function getFetch(point) {
  return fetch(`https://restcountries.eu/rest/v2/name/${point}`).then(response => {
    return response.json();
  });
}

export default getFetch;

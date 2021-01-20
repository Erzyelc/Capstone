'use strict';

let searchURL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getJobs(query){
    const jobDescription = query.split(", ");
    const params = {
        location: $('#js-location').val(),
        page: 1
    }
    let queryURL  = '';

    for(let i = 0; i < jobDescription.length; i++){
        queryURL += `description=${jobDescription[i]}&`;
     }

        console.log(params);

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryURL + queryString;
    
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {;
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults (responseJson) {
    console.log(responseJson);

    $('#results-list').empty();


    for(let i = 0; i < responseJson.length; i++){
      console.log('STRING', responseJson);
      console.log('STRINGGGGGG', responseJson[i].fullName);
      $('#results-list').append(
          `<li>
          <h2>${responseJson[i].company}</h2>
          <h3><a href="${responseJson[i].url}" >${responseJson[i].title}<a></h3>
          <h3>Location: ${responseJson[i].location}</h3>
          <h3>${responseJson[i].description}</h3>
          </li>
          `
      )};

      $('#results').removeClass('hidden');
}


function watchForm(){
    $('form').submit( event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const searchLocation = $('#js-location').val();
        getJobs(searchTerm, searchLocation);
    });
}

$(watchForm);
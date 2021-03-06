import React from 'react';

import CurrentWeather from './CurrentWeather';

const SearchResult = ({searchInput, countries, showCountry}) => {
    let matchingCountries = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()));

    if (matchingCountries.length > 10) {
      return "Too many matches, specify another filter";
    }  else if (matchingCountries.length === 1) {
        const country = matchingCountries[0];
        const imgAlt = "Flag of " + country.name;
        return (
          <div>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            <ul>
              {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt={imgAlt} width="150"/>
            <CurrentWeather capitalName={country.capital}/>
          </div>
        )
    } else {
      return matchingCountries.map(country=><p key={country.numericCode}>{country.name} <button onClick={()=>showCountry(country.name)} aria-label="Show country details">Show</button></p>)
    }
  }

export default SearchResult;
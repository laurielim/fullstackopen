import React, {useState, useEffect} from 'react';
import axios from "axios"

import SearchResult from "./components/SearchResult"

const App = () => {
  const [countries, setCountries] = useState([])
  
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const res = await axios.get("https://restcountries.eu/rest/v2/all")
          setCountries(res.data)
        } catch (e) {
          console.log(e)
        }
      }
      fetchData();
    },
    []
  )

  const [searchInput, setSearchInput] = useState("");

  return (
    <main>
      <div>
      <label htmlFor="searchBar">Find countries </label>
      <input type="text" name="searchBar" id="searchBar" onChange={(e)=>setSearchInput(e.target.value)}/>
      </div>
      <SearchResult searchInput={searchInput} countries={countries}/>
    </main>
  );
};

export default App;
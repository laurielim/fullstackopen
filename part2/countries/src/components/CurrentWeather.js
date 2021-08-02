import React, {useState, useEffect} from 'react';
import axios from "axios"

const CurrentWeather = ({capitalName}) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const [currentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://api.weatherstack.com/current", {
                    params: {
                        access_key: API_KEY,
                        query: capitalName
                        }
                    })
                setCurrentWeather(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [API_KEY, capitalName])

    return (Object.keys(currentWeather).length > 0) && (
        <div>
            <h2>Weather in {capitalName}</h2>
            <p>Temperature: {currentWeather.current.temperature} Celsius</p>
            <img src={currentWeather.current.weather_icons} alt={currentWeather.current.weather_description} />
            <p>Wind: {currentWeather.current.wind_speed} mph direction {currentWeather.current.wind_dir}</p>
        </div>
    );
};

export default CurrentWeather;
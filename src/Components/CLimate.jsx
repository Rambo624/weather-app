import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './search';

function CLimate() {
    const [search, setSearch] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchWeatherData(query) {
        setLoading(true);
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/current.json?key=1d49908dc7e14abc99c144219241606&q="+query+"&aqi=no");
            const data = response.data;
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    useEffect(() => {
        fetchWeatherData('kochi');
    }, []);

    console.log(weatherData);

    return (
        <div className='box'>
            <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
            {loading ? (
                <div className='loading'>loading...</div>
            ) : (
                <div>
                    <div className='cityname'>
                        <h2>
                            {weatherData?.location?.name},<span>{weatherData?.location?.country}</span>
                        </h2>
                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className='temp'>{weatherData?.current?.temp_c}</div>
                        <p className='description'>
                            {weatherData?.current?.condition?.text || ''}
                        </p>
                        <div className='weather-info'>
                            <div className='column'>
                                <div>
                                    <p className='wind'>{weatherData?.current?.wind_kph}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                            <div className='column'>
                                <div>
                                    <p className='humidity'>{weatherData?.current?.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CLimate;

import { useState, useEffect, useCallback } from "react";

const fetchCurrentWeather = (locationName) => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-559199CB-505D-46CE-9C68-F1490CEE2040&limit=5&format=JSON&StationName=${locationName}`
  )
    .then((response) => response.json())
    .catch((e) => {
      console.log(`${e.message}`);
    })
    .then((data) => {
      const locationData = data.records.Station[0];
      const weatherElements = locationData.WeatherElement

      return {
        observationTime: locationData.ObsTime.DateTime,
        locationName: locationData.StationName,
        temperature: weatherElements.AirTemperature,
        windSpeed: weatherElements.WindSpeed,
        humid: weatherElements.RelativeHumidity,
      };
    });
};

const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-559199CB-505D-46CE-9C68-F1490CEE2040&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      console.log(locationData);
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );

      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    isLoading: true,
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName),
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
    };

    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, [locationName, cityName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;

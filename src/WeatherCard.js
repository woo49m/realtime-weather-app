import React from "react";
import styled from "@emotion/styled";
import WeatherIcon from "./WeatherIcon.js";

import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RedoIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";
import { ReactComponent as CogIcon } from "./images/cog.svg";

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  background-color: rgba(31, 32, 34, 0.9);
  box-sizing: border-box;
  padding: 60px 40px;
`;

const Location = styled.div`
  font-size: 28px;
  color: #f5f5f5;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #f5f5f5;
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #f5f5f5;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #f5f5f5;
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #f5f5f5;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #f5f5f5;
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const SettingButtonTtile = styled.span`
  position: absolute;
  top: 17px;
  right: 35px;

  height: 15px;
  font-size: 12px;
  color: #f5f5f5;
`;

const WeatherCard = ({
  weatherElement,
  moment,
  fetchData,
  setCurrentPage,
  cityName,
}) => {
  return (
    <WeatherCardWrapper>
      <SettingButtonTtile>更換地區</SettingButtonTtile>
      <Cog onClick={() => setCurrentPage("WeatherSetting")} />
      <Location>{cityName}</Location>
      <Description>
        {weatherElement.description} {weatherElement.comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {weatherElement.temperature} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon
          currentWeatherCode={weatherElement.weatherCode}
          moment={moment || "day"}
        />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {weatherElement.windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon />
        {Math.round(weatherElement.humid)} %
      </Rain>
      <Redo onClick={fetchData} isLoading={weatherElement.isLoading}>
        最後觀測時間 :{" "}
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(weatherElement.observationTime))}{" "}
        {weatherElement.isLoading ? <LoadingIcon /> : <RedoIcon />}
      </Redo>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;

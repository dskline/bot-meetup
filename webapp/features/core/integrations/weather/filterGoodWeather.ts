interface Temporal {
  dateTime: Date;
}
export type WeatherData = {
  userApproved: boolean;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
  };
  wind: {
    speed: number;
    gust: number;
  };
  pop: number;
};
type WeatherApiResponse = {
  list: Array<WeatherData>;
};
export default async function filterGoodWeather<T extends Temporal>(
  temporals: Array<T>
): Promise<Array<T & WeatherData>> {
  const url =
    "https://community-open-weather-map.p.rapidapi.com/forecast?zip=27560&units=imperial";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.WEATHER_API_KEY!,
    },
    contentType: "application/json",
  };

  const response: WeatherApiResponse = await fetch(url, options)
    .then((data) => data.json())
    .catch((error) => console.error("error:" + error));

  const returnValue: Array<T & WeatherData> = [];
  for (const temporal of temporals) {
    const weatherData = response.list.find(
      (data) => new Date(data.dt_txt.replace(" ", "T")) >= temporal.dateTime
    );
    if (weatherData) {
      if (
        weatherData.main.feels_like > 60 &&
        weatherData.main.feels_like < 85 &&
        (weatherData.wind.gust + weatherData.wind.speed) / 2 < 20 &&
        weatherData.pop === 0 // no rain
      ) {
        weatherData.userApproved = true;
      }
      returnValue.push({
        ...temporal,
        ...weatherData,
      });
    }
  }
  return returnValue;
}

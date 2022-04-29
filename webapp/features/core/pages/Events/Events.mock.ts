import { MeetupEvent } from '@/features/core/integrations/meetup/eventsByGroup'
import { WeatherData } from '@/features/core/integrations/weather/filterGoodWeather'

export const simpleMock: Array<MeetupEvent & WeatherData> = [
  {
    title: 'Christmas Party',
    eventUrl: 'https://www.meetup.com/London-JS/events/264525894/',
    dateTime: new Date('2020-12-25T00:00:00.000Z'),
    dt_txt: '2020-12-25T00:00:00.000Z',
    main: {
      temp: 40,
      feels_like: 40,
    },
    pop: 0.5,
    wind: {
      speed: 1,
      gust: 1,
    },
  }
]

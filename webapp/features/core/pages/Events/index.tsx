import React from "react";

import { MeetupEvent } from "@/features/core/integrations/meetup/eventsByGroup";
import { WeatherData } from "@/features/core/integrations/weather/filterGoodWeather";

export type EventsProps = {
  events: Array<MeetupEvent & WeatherData>
};
const Events = (props: EventsProps) => {
  const [events, setEvents] = React.useState(props.events);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const refresh = async () => {
    fetch("/api/events/refresh")
      .then(() => {
        window.location.reload();
        return true;
      })
      .catch(() => {
        window.location.reload();
      });
  };

  return (
    <div>
      <h1>Events</h1>
      <button onClick={refresh}>Refresh</button>
      <ul>
        {props.events.map((event) => (
          <li key={event.dt_txt}>
            <a
              href={event.eventUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-900"
            >
              {event.title}
            </a>
            <p>{new Date(event.dt_txt).toLocaleString()}</p>
            <p>{event.main.temp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Events;

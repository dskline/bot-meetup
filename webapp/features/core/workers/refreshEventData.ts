import tennisEvents from "@/features/core/integrations/meetup/tennisEvents";
import filterGoodWeather from "@/features/core/integrations/weather/filterGoodWeather";
import { db } from "@/features/db/firebase";

export default async function refreshEventData() {
  const events = await tennisEvents();
  const eventsWithWeather = await filterGoodWeather(events);
  const database = db();

  for (const event of eventsWithWeather) {
    database.collection("events").doc(event.dateTime.toDateString()).set(event);
  }
  return eventsWithWeather;
}

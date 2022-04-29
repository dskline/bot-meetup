import eventsByGroup, {
  MeetupEvent,
} from "@/features/core/integrations/meetup/eventsByGroup";

export default async function () {
  const events = await eventsByGroup("Triangle-Tennis-Enthusiasts");

  // lower bound of 3.0 or 3.5, upper bound between 3.5 and 4.5
  const skillRegex = /3\.[05].*-.*[34]\.[05]/;

  const eventsInSkillRange: Array<MeetupEvent> = [];
  for (const event of events) {
    if (skillRegex.test(event.title)) {
      eventsInSkillRange.push(event);
    }
  }
  return eventsInSkillRange;
}

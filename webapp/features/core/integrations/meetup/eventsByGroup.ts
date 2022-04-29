import { gql, GraphQLClient } from "graphql-request";

const queryEventsByUrlname = gql`
  query ($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      upcomingEvents(input: { first: 15 }) {
        edges {
          node {
            id
            title
            dateTime
            eventUrl
          }
        }
      }
    }
  }
`;

export type MeetupEvent = {
  title: string,
  dateTime: Date,
  eventUrl: string
};
export default async function (urlname: string): Promise<MeetupEvent[]> {
  const client = new GraphQLClient("https://api.meetup.com/gql", {
    headers: {
      cookie: process.env.MEETUP_COOKIE!,
    },
  });
  const result = await client.request(queryEventsByUrlname, { urlname });
  return result.groupByUrlname.upcomingEvents.edges.map(
    (event: { node: MeetupEvent }) => ({
      ...event.node,
      dateTime: new Date(event.node.dateTime),
    })
  );
}

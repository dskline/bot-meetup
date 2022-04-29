import React from "react";

import { GetServerSideProps } from "next";

import Events, { EventsProps } from "@/features/core/pages/Events";
import { db } from "@/features/db/firebase";

export const getServerSideProps: GetServerSideProps = async () => {
  const database = db();
  const events = await database
    .collection("events")
    .where("dateTime", ">", new Date())
    .get();
  const eventsData = events.docs.map((doc) => doc.data());

  return {
    props: {
      events: JSON.parse(JSON.stringify(eventsData)),
    },
  };
};

const EventsPage = ({ events }: { events: EventsProps["events"] }) => (
  <Events events={events} />
);

export default EventsPage;

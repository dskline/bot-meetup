import type { NextApiRequest, NextApiResponse } from "next";

import refreshEventData from "@/features/core/workers/refreshEventData";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const eventsWithWeather = await refreshEventData();
  res.status(200).json(eventsWithWeather);
};

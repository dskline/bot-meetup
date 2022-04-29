import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/features/db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = db();
  const docs = await database
    .collection("events")
    .where("dateTime", "<", new Date())
    .get();

  // eslint-disable-next-line unicorn/no-array-for-each
  docs.forEach((doc) => {
    database.collection("events").doc(doc.id).delete();
  });
  res.status(200).json({ message: "ok" });
};

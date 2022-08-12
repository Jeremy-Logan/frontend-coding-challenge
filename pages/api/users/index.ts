import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../api-util/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await users.get());

    default:
      return res.status(404).send("");
  }
};

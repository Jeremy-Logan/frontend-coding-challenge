import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../api-util/database";
import { makeParseValidatedIntRouteParam } from "../../../api-util/validate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = makeParseValidatedIntRouteParam(res)(
    req.query.userId as string,
    "userId"
  );

  switch (req.method) {
    case "GET":
      const user = await users.getById(userId);
      return res.status(user !== undefined ? 200 : 404).json(user);

    default:
      return res.status(404).send("");
  }
};

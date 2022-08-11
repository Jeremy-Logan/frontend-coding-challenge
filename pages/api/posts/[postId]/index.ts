import { NextApiRequest, NextApiResponse } from "next";
import { posts } from "../../../../api-util/database";
import { makeParseValidatedIntRouteParam } from "../../../../api-util/validate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = makeParseValidatedIntRouteParam(res)(
    req.query.postId as string,
    "postId"
  );

  switch (req.method) {
    case "GET":
      const postComments = await posts.getById(postId);
      return res
        .status(postComments !== undefined ? 200 : 404)
        .json(postComments);

    default:
      return res.status(404).send("");
  }
};

import { NextApiRequest, NextApiResponse } from "next";
import { comments } from "../../../../../api-util/database";
import {
  makeParseValidatedComment,
  makeParseValidatedIntRouteParam,
} from "../../../../../api-util/validate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = makeParseValidatedIntRouteParam(res)(
    req.query.postId as string,
    "postId"
  );

  switch (req.method) {
    case "GET":
      const postComments = await comments.getByPostId(postId);
      return res
        .status(postComments !== undefined ? 200 : 404)
        .json(postComments);

    case "POST": {
      const incomingComment = {
        ...req.body,
        userId: 1, // HACK: assume we're logged in as user 1
        postId,
      };
      const validComment = await makeParseValidatedComment(res)(
        incomingComment
      );
      const newComment = await comments.create(validComment);
      return res.status(201).json(newComment);
    }

    default:
      return res.status(404).send("");
  }
};

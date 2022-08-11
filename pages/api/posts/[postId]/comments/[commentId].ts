import { NextApiRequest, NextApiResponse } from "next";
import { comments } from "../../../../../api-util/database";
import {
  makeParseValidatedComment,
  makeParseValidatedIntRouteParam,
} from "../../../../../api-util/validate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const validateIntRouteParam = makeParseValidatedIntRouteParam(res);
  const postId = validateIntRouteParam(req.query.postId as string, "postId");
  const commentId = validateIntRouteParam(
    req.query.commentId as string,
    "commentId"
  );

  switch (req.method) {
    case "GET":
      const comment = await comments.getById(commentId);
      return res.status(comment !== undefined ? 200 : 404).send(comment);

    case "PATCH": {
      const baseComment = await comments.getById(commentId);
      if (baseComment === undefined) return res.status(404).send("");

      const incomingComment = {
        ...req.body,
        id: commentId,
        userId: 1, // HACK: Assume we're logged in as user 1,
        postId,
      };
      const validComment = await makeParseValidatedComment(res)(
        incomingComment
      );
      comments.edit(validComment);
      return res.status(200).json(validComment);
    }

    case "DELETE": {
      comments.delete(commentId);
      return res.status(204).send("");
    }

    default:
      return res.status(404).send("");
  }
};

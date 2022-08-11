import { NextApiResponse } from "next";
import * as Yup from "yup";

export const makeParseValidatedIntRouteParam =
  (res: NextApiResponse) =>
  (x: string, paramName: string = "param") => {
    const parsed = Number(x);
    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) {
      res.status(422).send(`${paramName} must be an integer`);
      throw new Error(`${paramName} must be an integer`);
    }

    return parsed;
  };

const createCommentSchema = Yup.object({
  postId: Yup.number().required(),
  userId: Yup.number().required(),
  body: Yup.string().required(),
}).noUnknown();

const editCommentSchema = createCommentSchema.concat(
  Yup.object({
    id: Yup.number().required(),
  })
);

export const makeParseValidatedComment =
  (res: NextApiResponse) => async (incomingComment: any) => {
    try {
      const schema =
        "id" in incomingComment ? editCommentSchema : createCommentSchema;
      return await schema.validate(incomingComment, { strict: true });
    } catch (e: unknown) {
      res.status(422).send((e as Yup.ValidationError).message);
      throw e;
    }
  };

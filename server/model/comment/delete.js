/* eslint-disable no-underscore-dangle */
import { ResponseUtility } from "appknit-backend-bundle";
import { Types } from "mongoose";
import { CommentModel } from "../../schemas";

/**
 * @description a service model function to handle deletion of a comment for a User.
 * @author Sahil Siddiqui
 * @since 07, 2022
 */

export default ({ commentRef }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!commentRef) {
        return reject(
          ResponseUtility.MISSING_PROPS({
            message: "Missing Property commentRef!",
          })
        );
      }
      const [commentExists] = await CommentModel.aggregate([
        {
          $match: {
            _id: Types.ObjectId(commentRef),
            deleted: false,
          },
        },
      ]);

      if (!commentExists) {
        return reject(
          ResponseUtility.GENERIC_ERR({
            message: "No comment on such User exists!",
          })
        );
      }
      await CommentModel.updateOne({ _id: commentRef }, { deleted: true });
      return resolve(
        ResponseUtility.SUCCESS({ message: "Comment has been deleted!" })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

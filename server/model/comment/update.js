/* eslint-disable no-underscore-dangle */
import { ResponseUtility } from "appknit-backend-bundle";
import { Types } from "mongoose";
import { CommentModel, UserModel } from "../../schemas";

/**
 * @description a service model function to handle updation of a comment for a post.
 * @author Sahil Siddiqui
 * @since Nov 07 , 2022
 */

export default ({ id, commentRef, text = "" }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!(commentRef && text)) {
        return reject(
          ResponseUtility.MISSING_PROPS({
            message: `Missing Property ${commentRef ? "text" : "commentRef"}`,
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
            message: "No comment on such user exists!",
          })
        );
      }

      const commentUpdate = await CommentModel.findOneAndUpdate(
        { _id: commentRef },
        { text: text.trim() },
        { new: true }
      );

      const user = await UserModel.findOne(
        { _id: commentUpdate.userRef },
        {
          profilePicture: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
        }
      );

      return resolve(
        ResponseUtility.SUCCESS({
          data: Object.assign(commentUpdate._doc, { user }),
          message: "Comment has been updated!",
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

/* eslint-disable no-underscore-dangle */
import { ResponseUtility } from "appknit-backend-bundle";
import { CommentModel, UserModel } from "../../schemas";

/**
 * @description a service model function to handle creation of a comment for a user.
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */

export default ({ id, userRef, text = "" }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!(userRef && text)) {
        return reject(
          ResponseUtility.MISSING_PROPS({
            message: `Missing Property ${userRef ? "text" : "userRef"}`,
          })
        );
      }

      const userExists = await UserModel.findOne({
        _id: userRef,
        deleted: false,
      });

      if (!userExists) {
        return reject(
          ResponseUtility.GENERIC_ERR({ message: "User does not exists!" })
        );
      }
      const comment = new CommentModel({
        commentedByRef: id,
        commentedOnRef: userRef,
        text: text.trim(),
      });
      await comment.save();

      const user = await UserModel.findOne(
        { _id: id },
        {
          profilePicture: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
        }
      );

      return resolve(
        ResponseUtility.SUCCESS({
          message: "Comment has been created!",
          data: Object.assign(comment._doc, { user }),
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

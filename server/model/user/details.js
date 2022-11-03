/* eslint-disable no-underscore-dangle */
import { ResponseUtility } from "appknit-backend-bundle";
import { Types } from "mongoose";
import { UserModel } from "../../schemas";

/**
 * @description service model function to handles the details of a user.
 * @author Sahil Siddiqui
 * @since Nov 03, 2022
 */

export default ({ id, userRef }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [user] = await UserModel.aggregate([
        {
          $match: {
            _id: Types.ObjectId(userRef || id),
            deleted: false,
            blocked: false,
          },
        },
        {
          $unset: ["password", "verified", "blocked", "deleted", "__v"],
        },
      ]);
      if (!user) {
        return reject(ResponseUtility.NO_USER());
      }
      return resolve(
        ResponseUtility.SUCCESS({
          message: "Profile fetcheded successfully",
          data: user,
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

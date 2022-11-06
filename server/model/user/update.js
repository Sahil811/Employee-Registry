/* eslint-disable no-underscore-dangle */
import { ResponseUtility, SchemaMapperUtility } from "appknit-backend-bundle";
import { UserModel } from "../../schemas";
import { SUCCESS_CODE } from "../../constants";
import { UsersDetailsService } from ".";

/**
 * @description service model function to handles the
 * updation of an user.
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */

export default ({ userRef, userName, firstName, lastName, address, role }) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = await SchemaMapperUtility({
        userName,
        firstName,
        lastName,
        address,
        role,
      });
      await UserModel.updateOne({ _id: userRef }, updateQuery);
      const user = await UsersDetailsService({ id: userRef });
      if (user.code !== SUCCESS_CODE) {
        return reject(ResponseUtility.GENERIC_ERR({ message: user.message }));
      }
      return resolve(ResponseUtility.SUCCESS({ data: user.data }));
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

import {
  ResponseUtility,
  PropsValidationUtility,
} from "appknit-backend-bundle";
import UserModel from "../../schemas/user";
import { SUCCESS_CODE } from "../../constants";

/**
 * @description service model function to handles the signup
 * of a user.
 * @author Sahil Siddiqui
 * @since Nov 02, 2022
 */

export default ({ userName, email, firstName, lastName, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { code, message } = await PropsValidationUtility({
        validProps: ["userName", "email", "password"],
        sourceDocument: {
          userName,
          email,
          firstName,
          lastName,
          password,
        },
      });

      if (code !== SUCCESS_CODE) {
        return reject(ResponseUtility.MISSING_PROPS({ message }));
      }

      // eslint-disable-next-line no-param-reassign
      email = email.toLowerCase();
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        return reject(
          ResponseUtility.GENERIC_ERR({
            message: `Email ${email} is already registered.`,
          })
        );
      }

      const userObject = new UserModel({
        userName,
        email,
        firstName,
        lastName,
        password,
      });

      await userObject.save();

      if (user.code !== SUCCESS_CODE) {
        return reject(ResponseUtility.GENERIC_ERR({ message: user.message }));
      }
      return resolve(
        ResponseUtility.SUCCESS({
          data: {
            accessToken: token,
            user: user.data,
          },
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

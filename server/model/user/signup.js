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

export default ({
  userName,
  email,
  firstName,
  lastName,
  password,
  address,
  role,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { code, message } = await PropsValidationUtility({
        validProps: [
          "userName",
          "email",
          "firstName",
          "lastName",
          "password",
          "address",
          "role",
        ],
        sourceDocument: {
          userName,
          email,
          firstName,
          lastName,
          password,
          address,
          role,
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
        address,
        role,
      });

      await userObject.save();

      return resolve(
        ResponseUtility.SUCCESS({
          message: "You have registered successfully. Please login to continue",
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

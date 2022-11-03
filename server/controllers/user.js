/**
 * @description
 * This is the controller for the users
 * @author Sahil Siddiqui
 * @since Nov 02, 2022
 */

import { UserModel } from "../model";
import { ModelResolver } from "./resolvers";

export default {
  signup: (req, res) => ModelResolver(req, res, UserModel.UsersSignupService),
};

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
  login: (req, res) => ModelResolver(req, res, UserModel.UsersLoginService),
  list: (req, res) => ModelResolver(req, res, UserModel.UsersListService),
  update: (req, res) => ModelResolver(req, res, UserModel.UsersUpdateService),
  edit: (req, res) => ModelResolver(req, res, UserModel.UsersEditService),
  googlePlaceDetails: (req, res) =>
    ModelResolver(req, res, UserModel.GooglePlaceDetails),
};

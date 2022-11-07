/**
 * @description
 * This is the controller for the comment
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */

import { CommentModel } from "../model";
import { ModelResolver } from "./resolvers";

export default {
  create: (req, res) => ModelResolver(req, res, CommentModel.Create),
  list: (req, res) => ModelResolver(req, res, CommentModel.List),
  update: (req, res) => ModelResolver(req, res, CommentModel.Update),
};

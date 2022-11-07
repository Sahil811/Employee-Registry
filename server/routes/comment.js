import { AuthenticationControllers, CommentControllers } from "../controllers";

const prefix = "/api/comment/";
/**
 * @description
 * This is the route handler for the comments.
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */
export default (app) => {
  app.post(
    `${prefix}create`,
    AuthenticationControllers.authenticateUser,
    CommentControllers.create
  );
  app.post(
    `${prefix}list`,
    AuthenticationControllers.authenticateUser,
    CommentControllers.list
  );
  app.post(
    `${prefix}update`,
    AuthenticationControllers.authenticateUser,
    CommentControllers.update
  );
  app.post(
    `${prefix}delete`,
    AuthenticationControllers.authenticateUser,
    CommentControllers.delete
  );
};

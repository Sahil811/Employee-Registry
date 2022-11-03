import {
  // AuthenticationControllers,
  UserControllers,
} from "../controllers";

/**
 * @description
 * This is the route handler for the employees
 * @author Sahil Siddiqui
 * @since 02 Nov, 2022
 */

const prefix = "/api/user/";

export default (app) => {
  app.post(`${prefix}signup`, UserControllers.signup);
};

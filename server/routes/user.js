import { AuthenticationControllers, UserControllers } from "../controllers";
import { MultipartService } from "../services";

/**
 * @description
 * This is the route handler for the employees
 * @author Sahil Siddiqui
 * @since 02 Nov, 2022
 */

const prefix = "/api/user/";

export default (app) => {
  app.post(`${prefix}signup`, UserControllers.signup);
  app.post(`${prefix}login`, UserControllers.login);
  app.post(
    `${prefix}list`,
    AuthenticationControllers.authenticateUser,
    UserControllers.list
  );
  app.post(
    `${prefix}update`,
    AuthenticationControllers.authenticateUser,
    UserControllers.update
  );
  app.post(
    `${prefix}edit`,
    AuthenticationControllers.authenticateUser,
    UserControllers.edit
  );
  app.post(
    `${prefix}details`,
    AuthenticationControllers.authenticateUser,
    UserControllers.details
  );
  app.post(
    `${prefix}import`,
    MultipartService,
    AuthenticationControllers.authenticateUser,
    UserControllers.import
  );
  app.post(
    `${prefix}googlePlaceDetails`,
    AuthenticationControllers.authenticateUser,
    UserControllers.googlePlaceDetails
  );
};

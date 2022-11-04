import { ResponseUtility } from "appknit-backend-bundle";
import csv from "csvtojson";
import UserModel from "../../schemas/user";

/**
 * @description service model function to handles the import of user
 * of a user.
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */

export default ({ employeeCsv }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!employeeCsv) {
        return reject(
          ResponseUtility.MISSING_PROPS({
            message: `Please select a file to import.`,
          })
        );
      }

      csv({ delimiter: ";" })
        .fromString(employeeCsv.data.toString("utf8"))
        .on("data", async (data) => {
          const jsonStr = JSON.parse(data.toString("utf8"));
          const user = {};
          user.firstName = jsonStr.Vorname;
          user.lastName = jsonStr.Nachname;
          user.role = jsonStr.Rolle;
          user.address = `${jsonStr.Strasse}, ${jsonStr.Nr}, ${jsonStr.PLZ}, ${jsonStr.Ort}, ${jsonStr.Land}`;

          if (Object.keys(user).length) {
            UserModel.insertMany(user);
          }
        });
      // .on("done", () => {
      //   console.log("done parsing");
      // });

      return resolve(
        ResponseUtility.SUCCESS({
          message: "Employees data is imported successfully.",
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

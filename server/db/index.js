/**
 * this contains the database connection specification
 * @author Sahil Siddiqui
 * @since Nov 03, 2022
 */
import mongoose from "mongoose";
import { Promise as es6Promise } from "es6-promise";
import { mongoConnectionString } from "../constants";

const useNewUrlParser = true;
const useUnifiedTopology = true;
// const useCreateIndex = true;

mongoose.Promise = es6Promise;
mongoose.connect(
  mongoConnectionString,
  {
    useNewUrlParser,
    useUnifiedTopology,
    // useCreateIndex,
  },
  (err) => {
    if (err) {
      console.log("mongo connection err", err);
    } else {
      console.log("database connected");
    }
  }
);

export default mongoose;

/**
 * This schema represents the users profile schema
 * @author Sahil Siddiqui
 * @since Nov 02, 2022
 */
import { Schema } from "mongoose";
import { HashUtility } from "appknit-backend-bundle";
import database from "../db";
import { applyMiddleware } from "./commonSchemaMiddleware";

const User = new Schema({
  userName: String,
  email: String,
  firstName: String,
  lastName: String,
  address: String,
  role: Number,
  password: String,
  verified: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  deletedOn: Date,
  createdOn: Date,
  updatedOn: Date,
  //   location: {
  //     address: String,
  //     type: { type: String },
  //     coordinates: [Number, Number],
  //   },
});

applyMiddleware(User);
applyMiddleware(User, async function (next) {
  const data = this;
  if (data.password) {
    data.password = await HashUtility.generate({ text: data.password });
  }
  next();
});
export default database.model("User", User);

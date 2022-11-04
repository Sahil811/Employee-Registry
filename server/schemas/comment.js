/* eslint-disable no-underscore-dangle */
/**
 * This schema represents a comment.
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */

import { Schema } from "mongoose";
import database from "../db";
import { applyMiddleware } from "./commonSchemaMiddleware";

const Comment = new Schema({
  commentedByRef: { type: Schema.Types.ObjectId, required: true },
  commentedOnRef: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  deletedOn: Date,
  createdOn: Date,
  updatedOn: Date,
});

applyMiddleware(Comment);
// eslint-disable-next-line func-names

export default database.model("Comment", Comment);

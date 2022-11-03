import { ResponseUtility } from "appknit-backend-bundle";
import mongoose from "../../db/index";
import { UserModel } from "../../schemas";
import { PAGINATION_LIMIT } from "../../constants";

/**
 * @description service model function to fetch the listing of the users
 * @author Sahil Siddiqui
 * @since Nov 03, 2022
 */

export default ({ id, text = "", page = 1, limit = PAGINATION_LIMIT }) =>
  new Promise(async (resolve, reject) => {
    try {
      const andQuery = [
        { deleted: false },
        { _id: { $ne: mongoose.Types.ObjectId(id) } },
      ];

      if (text) {
        andQuery.push(
          { email: new RegExp(text, "i") },
          { name: new RegExp(text, "i") }
        );
      }

      const [data] = await UserModel.aggregate([
        {
          $match: {
            $and: andQuery,
          },
        },
        {
          $unset: ["password", "__v"],
        },
        {
          $sort: {
            createdOn: -1,
          },
        },
        {
          $facet: {
            list: [
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
            total: [
              {
                $count: "count",
              },
            ],
          },
        },
        {
          $unwind: "$total",
        },
      ]);
      return resolve(
        ResponseUtility.SUCCESS({
          data: {
            list: (data || {}).list || [],
            page,
            limit,
            total: ((data || {}).total || {}).count || 0,
            size: ((data || {}).list || []).length,
            hasMore: ((data || {}).list || []).length === limit,
          },
        })
      );
    } catch (err) {
      return reject(
        ResponseUtility.GENERIC_ERR({ message: err.message, error: err })
      );
    }
  });

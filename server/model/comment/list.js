import { ResponseUtility } from "appknit-backend-bundle";
import mongoose from "../../db/index";
import { CommentModel } from "../../schemas";
import { PAGINATION_LIMIT } from "../../constants";

/**
 * @description service model function to fetch the listing of the comment for user
 * @author Sahil Siddiqui
 * @since Nov 04, 2022
 */

export default ({ userRef, page = 1, limit = PAGINATION_LIMIT }) =>
  new Promise(async (resolve, reject) => {
    try {
      const andQuery = [
        { deleted: false },
        { commentedOnRef: mongoose.Types.ObjectId(userRef) },
      ];

      const [data] = await CommentModel.aggregate([
        {
          $match: {
            $and: andQuery,
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$commentedByRef",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$id"] },
                      { $eq: ["$blocked", false] },
                      { $eq: ["$deleted", false] },
                    ],
                  },
                },
              },
              {
                $project: {
                  email: "$email",
                  firstName: "$firstName",
                  lastName: "$lastName",
                  userName: "userName",
                },
              },
            ],
            as: "user",
          },
        },
        {
          $unwind: "$user",
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

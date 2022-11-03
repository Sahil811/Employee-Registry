/**
 * This is the {{app_name}} constant file
 * @author Sahil Siddiqui
 * @since Nov 2, 2022
 */

export const {
  HOST = "http://localhost:3000/api/",
  ATLAS_USER,
  ATLAS_PASSWORD,
  ATLAS_CLUSTER,
  SECRET_STRING,
  PAGINATION_LIMIT = 30,
  APP_NAME = "APP_NAME",
  NODE_ENV = `${APP_NAME}-development`,
} = process.env;

const db = process.env.MONGO_DB || "{{app_name}}";

// export const mongoConnectionString = `mongodb://${host}:${port}/${db}`;
export const mongoConnectionString = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER}/${db}?retryWrites=true`;

// this string is unique for each project construction
export const secretString = SECRET_STRING;

export const SUCCESS_CODE = 100;

export const ADMIN_USER_ACTIONS = {
  VERIFIED: 1,
  BLOCKED: 2,
  UNBLOCKED: 3,
  DELETED: 4,
};

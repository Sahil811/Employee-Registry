/**
 * This multipart service will merge the passed media in the body with the same
 * name, add all fields from req.body.data to req.body
 * @author Sahil Siddiqui <
 * @since Nov 04, 2022
 */

export default (req, res, next) => {
  const {
    files,
    body: { data, id },
  } = req;
  req.body = data ? { ...JSON.parse(data) } : {};
  if (id) {
    req.body.id = id;
  }
  if (files && Object.keys(files).length) {
    Object.assign(req.body, { ...files });
  }
  return next();
};

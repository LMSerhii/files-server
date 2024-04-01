import HttpError from "../helpers/HttpError.js";

export const checkExtension = (req, res, next) => {
  const EXTENSIONS = ["txt", "html", "doc", "png", "jsx"];

  const { filename } = req.body;

  const ext = filename.split(".").pop();

  if (!EXTENSIONS.includes(ext)) {
    next(
      HttpError(400, `Sorry, this application does not support ${ext} format`)
    );
  }

  next();
};

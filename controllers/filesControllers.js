import fs from "fs/promises";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const FOLDERPATH = path.resolve("./files");

export const createFile = async (req, res, next) => {
  try {
    const { filename, content } = req.body;
    const filePath = path.resolve("./files", filename);

    await fs.writeFile(filePath, content, "utf-8");

    res.status(201).json({ message: "Created successfuly" });
  } catch (error) {
    next(error);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const files = await fs.readdir(FOLDERPATH);
    if (!files.length) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

export const getFileInfo = async (req, res, next) => {
  try {
    const files = await fs.readdir(FOLDERPATH);
    const { filename } = req.params;
    if (!files.includes(filename)) {
      throw HttpError(404, "Not found");
    }
    const filePath = path.resolve("./files", filename);

    const filesReader = await fs.readFile(filePath, "utf-8");
    const extName = path.extname(filePath);
    const name = path.basename(filePath, extName);
    res.json({
      content: filesReader,
      extantion: extName.slice(1),
      name,
    });
  } catch (error) {
    next(error);
  }
};

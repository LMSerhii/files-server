import fs from "fs/promises";
import path from "path";

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

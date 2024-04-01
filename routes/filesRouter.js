import express from "express";
import { createFile } from "../controllers/filesControllers.js";
import { createFilesSchema } from "../schemas/filesSchemas.js";
import { checkExtension } from "../middlewares/checkExtension.js";
import validateBody from "../helpers/validateBody.js";

const filesRouter = express.Router();

filesRouter.post(
  "/",
  validateBody(createFilesSchema),
  checkExtension,
  createFile
);

export default filesRouter;

import express from "express";
import {
  createGuide,
  getGuides,
  getGuideById,
} from "../controllers/guideController.js";

const router = express.Router();

router.route("/").post(createGuide).get(getGuides);

router.route("/:id").get(getGuideById);

export default router;

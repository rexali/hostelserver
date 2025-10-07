"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getReviewsHandler_1 = require("../handlers/getReviewsHandler");
const createReviewHandler_1 = require("../handlers/createReviewHandler");
const removeReviewHandler_1 = require("../handlers/removeReviewHandler");
const updateReviewHandler_1 = require("../handlers/updateReviewHandler");
const reviewRouter = express_1.default.Router();
reviewRouter.get("/", getReviewsHandler_1.getReviewsHandler);
reviewRouter.post("/", createReviewHandler_1.createReviewHandler);
reviewRouter.delete("/:id", removeReviewHandler_1.removeReviewHandler);
reviewRouter.patch("/:id", updateReviewHandler_1.updateReviewHandler);
exports.default = reviewRouter;

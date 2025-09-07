"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createProfileHandler_1 = require("../handlers/createProfileHandler");
const getProfileHandler_1 = require("../handlers/getProfileHandler");
const updateProfileHandler_1 = require("../handlers/updateProfileHandler");
const getProfilesHandler_1 = require("../handlers/getProfilesHandler");
const removeProfileHandler_1 = require("../handlers/removeProfileHandler");
// router instance
const profileRouter = express_1.default.Router();
// profile creation routes
profileRouter.post("/", createProfileHandler_1.createProfileHandler);
profileRouter.get("/:id", getProfileHandler_1.getProfileHandler);
profileRouter.get("/", getProfilesHandler_1.getProfilesHandler);
profileRouter.delete("/:id", removeProfileHandler_1.removeProfileHandler);
profileRouter.patch("/:id", updateProfileHandler_1.updateProfileHandler);
exports.default = profileRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserHandler = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const removeUserHandler = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await auth_controller_1.AuthService.removeUser(id);
        if (result) {
            res.json({ status: "success", data: { result: true }, message: "Account removed" });
        }
        else {
            res.json({ status: "fail", data: { result: false }, message: "Failed to remove account" });
        }
    }
    catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + error.message });
    }
};
exports.removeUserHandler = removeUserHandler;

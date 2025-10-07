"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersHandler = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const getAllUsersHandler = async (req, res) => {
    try {
        const id = req.params.id;
        let users = await auth_controller_1.AuthService.getAllUsers();
        if (users !== null) {
            res.json({ status: "success", data: { users }, message: "Users fetched" });
        }
        else {
            res.json({ status: "fail", data: null, message: "Users fetched failed" });
        }
    }
    catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + error.message });
    }
};
exports.getAllUsersHandler = getAllUsersHandler;

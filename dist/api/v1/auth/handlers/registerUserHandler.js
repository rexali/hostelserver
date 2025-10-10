"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerUserHandler;
const async_mutex_1 = require("async-mutex");
const joi_1 = __importDefault(require("joi"));
const auth_controller_1 = require("../controllers/auth.controller");
const hashCheckPassword_1 = require("../utils/hashCheckPassword");
const uuid_1 = require("uuid");
const html_escaper_1 = require("html-escaper");
const profile_model_1 = __importDefault(require("../../profiles/models/profile.model"));
const mutex = new async_mutex_1.Mutex();
/**
 * Add new user
 * @param req - a request
 * @param res - a response
 * @returns void
 */
async function registerUserHandler(req, res) {
    // acquire path to perform operation to prevent race condition
    const release = await mutex.acquire();
    try {
        // let us validate user data
        const userDataSchema = joi_1.default.object().keys({
            name: joi_1.default.string().required(),
            username: joi_1.default.string().required(), // i.e. email
            password: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            address: joi_1.default.string().required(),
            localGovt: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            role: joi_1.default.string().required(),
            permission: joi_1.default.array(),
            status: joi_1.default.string()
        });
        const { name, username, password, phone, address, localGovt, state, role, permission, status, } = req.body;
        const validationResult = userDataSchema.validate({
            name,
            username,
            password,
            phone,
            address,
            localGovt,
            state,
            role,
            permission,
            status,
        });
        if (validationResult.error) {
            res.status(200).json({
                status: "fail",
                data: null,
                error: "Validation failed: " + validationResult.error.message
            });
        }
        else {
            // generate registration code
            const code = (0, uuid_1.v4)();
            // let us sanitise user data now
            const userData = {
                name: (0, html_escaper_1.escape)(name),
                username: (0, html_escaper_1.escape)(username),
                password: (0, html_escaper_1.escape)(password),
                phone: (0, html_escaper_1.escape)(phone),
                address: (0, html_escaper_1.escape)(address),
                localGovt: (0, html_escaper_1.escape)(localGovt),
                state: (0, html_escaper_1.escape)(state),
                role: (0, html_escaper_1.escape)(role),
                permission: permission ?? ["read", "write"],
                status: (0, html_escaper_1.escape)(status ?? "no"),
                code: code
            };
            const authData = {
                username: userData.username,
                password: (0, hashCheckPassword_1.hashPassword)(userData.password),
                role: userData.role,
                permission: permission,
                status: userData.status,
                code: userData.code
            };
            const authService = new auth_controller_1.AuthService(authData);
            const user = await authService.createUser();
            if (user !== null) {
                // enter to profile
                let profile = await profile_model_1.default.create({
                    name: userData.name,
                    UserId: user?.id,
                    phone: userData.phone,
                    address: userData.address,
                    localGovt: userData.localGovt,
                    state: userData.state,
                });
                res.status(200).json({
                    status: 'success',
                    data: {
                        user: {
                            username: user?.username,
                            role: user?.role,
                            permission: user?.permission,
                            status: user?.status,
                            code: user?.code,
                            userId: user?.id,
                            profile
                        }
                    },
                    messsage: 'Registeration successful'
                });
            }
            else {
                res.status(400).json({ status: 'fail', data: null, messsage: 'Try again' });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', data: null, messsage: 'Error: ' + error });
    }
    finally {
        // release path for others
        release();
    }
}

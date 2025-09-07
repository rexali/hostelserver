"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyTokenHandler;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_mutex_1 = require("async-mutex");
// import { ProfileService } from "../../profiles/controllers/profile.controller";
const secureJWToken_1 = require("../../auth/utils/secureJWToken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// create mutex instance
const mutex = new async_mutex_1.Mutex();
// create mutex instance
async function verifyTokenHandler(req, res, next) {
    // acquire access to the path to do operation (for race condition)
    const release = await mutex.acquire(); // lock the thread
    const token = req.body.token || req.cookies.token;
    try {
        const unpaddedToken = (0, secureJWToken_1.unpadToken)(token);
        let decoded = jsonwebtoken_1.default.verify(unpaddedToken, process.env.SECRET_KEY);
        if (decoded.userId && decoded.role) {
            // const profile = await ProfileService.getProfile(decoded.userId);
            // const photo = profile?.image;
            return res.status(200).json({
                status: 'success',
                data: {
                    token,
                    email: decoded.username,
                    userId: decoded.userId,
                    role: decoded.role,
                    // photo,
                },
                messsage: 'Verified'
            });
        }
        else {
            res.status(404).json({ status: 'success', data: null, messsage: 'Error: Unauthorized' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 'fail', data: null, messsage: 'Error: ' + error });
    }
    finally {
        // release path for other
        release(); // unlock the thread
    }
}

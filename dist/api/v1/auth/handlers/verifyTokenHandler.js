"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyTokenHandler;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_mutex_1 = require("async-mutex");
const secureJWToken_1 = require("../../auth/utils/secureJWToken");
const dotenv_1 = __importDefault(require("dotenv"));
const profile_controller_1 = require("../../profiles/controllers/profile.controller");
dotenv_1.default.config();
// create mutex instance
const mutex = new async_mutex_1.Mutex();
// create mutex instance
async function verifyTokenHandler(req, res, next) {
    // acquire access to the path to do operation (for race condition)
    const release = await mutex.acquire(); // lock the thread
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    try {
        const unpaddedToken = (0, secureJWToken_1.unpadToken)(token);
        let decoded = jsonwebtoken_1.default.verify(unpaddedToken, process.env.SECRET_KEY);
        if (decoded.userId && decoded.role) {
            const profile = await profile_controller_1.ProfileService.getProfile(decoded.userId);
            return res.status(200).json({
                status: 'success',
                data: {
                    userId: decoded.userId,
                    email: decoded.username,
                    role: decoded.role,
                    profile
                },
                messsage: 'Verified'
            });
        }
        else {
            res.status(404).json({ status: 'fail', data: null, messsage: 'Error: Unauthorized' });
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

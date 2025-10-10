import { Mutex } from "async-mutex";
import Joi from "joi";
import { AuthService } from "../controllers/auth.controller";
import { UserType } from "../types/types";
import { hashPassword } from "../utils/hashCheckPassword";
import { v4 as uuidV4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { escape } from "html-escaper";
import Profile from "../../profiles/models/profile.model";

const mutex = new Mutex();
/**
 * Add new user
 * @param req - a request
 * @param res - a response
 * @returns void
 */
export default async function registerUserHandler(req: Request, res: Response) {
    // acquire path to perform operation to prevent race condition

    const release = await mutex.acquire();
    try {

        // let us validate user data
        const userDataSchema = Joi.object().keys({
            name: Joi.string().required(),
            username: Joi.string().required(), // i.e. email
            password: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            localGovt: Joi.string().required(),
            state: Joi.string().required(),
            role: Joi.string().required(),
            permission: Joi.array<string>(),
            status: Joi.string()
        });

        const {
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
        } = req.body;

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
        } else {

            // generate registration code
            const code = uuidV4();
            // let us sanitise user data now
            const userData = {
                name: escape(name),
                username: escape(username),
                password: escape(password),
                phone: escape(phone),
                address: escape(address),
                localGovt: escape(localGovt),
                state: escape(state),
                role: escape(role),
                permission: permission ?? ["read", "write"],
                status: escape(status ?? "no"),
                code: code
            }

            const authData = {
                username: userData.username,
                password: hashPassword(userData.password) as string,
                role: userData.role,
                permission: permission,
                status: userData.status,
                code: userData.code
            };

            const authService = new AuthService(authData);

            const user = await authService.createUser();

            if (user !== null) {
                // enter to profile
                let profile = await Profile.create({
                    name: userData.name,
                    UserId: user?.id as number,
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

            } else {
                res.status(400).json({ status: 'fail', data: null, messsage: 'Try again' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', data: null, messsage: 'Error: ' + error });
    } finally {
        // release path for others
        release()
    }
}

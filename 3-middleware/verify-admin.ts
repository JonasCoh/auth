import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { AuthErrorModel } from "../4-models/error-models";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try {

        const isAdmin = await cyber.verifyAdmin(request);
        if (!isAdmin) throw new AuthErrorModel('Unauthrized: You are not loggedin as Admin');
        next();

    } catch (error) {
        next(error)
    }

}
export default verifyAdmin;
import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { AuthErrorModel } from "../4-models/error-models";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

    try {

        const isValid = await cyber.verifyToken(request);
        if (!isValid) throw new AuthErrorModel('Unauthrized');
        next();

    } catch (error) {
        next(error)
    }

}
export default verifyLoggedIn;
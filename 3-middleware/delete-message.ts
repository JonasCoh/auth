import { NextFunction, Request, Response } from "express";

function deleteMessage(request: Request, response: Response, next: NextFunction) {

    // Console the id of deleted item
    console.log(`Delete ${request.params.id}`);

    next();

}
export default deleteMessage;
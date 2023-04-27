import { NextFunction, Request, Response } from "express";

function logRequest(request: Request, response: Response, next: NextFunction) {

    // Console Method and Route
    console.log(`Method: ${request.method}, Route: ${request.originalUrl}`);

    // Trasfer the flow to the next middleware or route 
    next();

}
export default logRequest;
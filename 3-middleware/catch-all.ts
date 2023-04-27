import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    // Log all the errors to the console
    console.log(err);

    // Log all the errors to file
    logger(err.message);

    // Send back the response to the front
    response.status(err.status || 500).send(err.message);

}
export default catchAll;
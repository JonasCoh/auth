import { NextFunction, Request, Response } from "express";

function blockMonday(request: Request, response: Response, next: NextFunction) {

    const today = new Date();
    const day = today.getDay() + 1;

    if (day === 2) {
        response.status(403).send("Can't get data on Mondoy...");
        return;
    }

    // Transfer the flow to next function
    next();

}
export default blockMonday;
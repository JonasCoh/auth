import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import RoleModel from "../4-models/role-model";

// Create uniqe KEY
const secertKey = 'mitziandkitithecats';

function getNewToken(user: UserModel): string {

    // Create container:
    const container = { user };

    // Create expiration time: 
    const options = { expiresIn: "3h" };

    // Crate the Token
    const token = jwt.sign(container, secertKey, options);

    return token;

}

// 
async function verifyToken(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        try {

            // Token format
            // Authorization: Bearer ****
            //                01234567

            // Extract Header from request
            const header = request.header('authorization');

            // if no header
            if (!header) {
                resolve(false);
                return;
            }

            // Extract token from the header
            const token = header.substring(7);
            // const token = header.split('Bearer ')[1];

            // if no token
            if (!token) {
                resolve(false);
                return;
            }

            // Verify Token
            jwt.verify(token, secertKey, (err) => {

                if (err) {
                    resolve(false);
                    return
                }

                resolve(true);
            });


        } catch (error: any) {
            reject(error)
        }
    })
}


// Verify Admin
async function verifyAdmin(request: Request): Promise<boolean> {

    // Check if user is logged in 
    const isLoggedIn = await verifyToken(request);
    if (!isLoggedIn) return false;

    // Extract Token from Header from request
    const header = request.header('authorization');
    const token = header.substring(7);

    // Extract container from token
    const container: any = jwt.decode(token);

    // Extract user from Container
    const user: UserModel = container.user;

    // Return true if is admin and false if not
    return user.role === RoleModel.Admin
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
}
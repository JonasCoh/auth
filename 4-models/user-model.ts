import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    public static ValidationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(17),
        lastName: Joi.string().required().min(2).max(17),
        username: Joi.string().required().min(2).max(17),
        password: Joi.string().required().min(6).max(26),
        role: Joi.forbidden()
    });

    public validate(): string {
        const result = UserModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

}
export default UserModel;
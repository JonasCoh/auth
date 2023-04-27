import Joi from "joi";

class CredentialsModel {

    public username: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    public static ValidationSchema = Joi.object({
        username: Joi.string().required().min(2).max(17),
        password: Joi.string().required().min(6).max(26),
    });

    public validate(): string {
        const result = CredentialsModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialsModel;
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { AuthErrorModel, ValidationErrorModel } from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {

    // TODO: Validatian:
    const err = user.validate();
    if (err) throw new ValidationErrorModel(err);


    // Get all users:
    const users = await dal.getAllUsers();

    // TODO: IF username is taken:
    if (users.some(u => u.username === user.username)) {
        throw new AuthErrorModel('User name invalid');
    }

    // Add ID to user object:
    user.id = users.reduce((max, user) => user.id > max ? user.id : max, users[0].id) + 1;
    // const id = users[users.length-1].id + 1;

    // Add role to user object:
    user.role = RoleModel.User;

    // Add the user to Array:
    users.push(user)

    // Save all users:
    await dal.saveAllUsers(users);

    // Generate Token
    const token = cyber.getNewToken(user);

    // return Token
    return token;

}



async function login(credentials: CredentialsModel): Promise<string> {

    // TODO: Validatian:
    const err = credentials.validate();
    if (err) throw new ValidationErrorModel(err);

    // Get all users
    const users = await dal.getAllUsers();

    // Find user by credetials
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);

    // if user is not valid
    if (!user) throw new AuthErrorModel('username or password incorrect');

    // Generate Token
    const token = cyber.getNewToken(user);

    // return Token
    return token;

}

export default {
    register,
    login
}
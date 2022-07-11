import User, { UserInput } from "../models/user.model";
import {omit} from "lodash";

export async function isExistingUser(email: UserInput["email"]){
    const user = await User.findOne({email});
    if(!email || !user) return false;

    return true;
}

export async function createUser(input: UserInput){
    const user = await User.create({...input});
    return omit(user.toJSON(), "password");
}
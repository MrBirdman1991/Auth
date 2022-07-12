import User, { UserInput } from "../models/user.model";
import {omit} from "lodash";

export async function existingUser(email: UserInput["email"]){
    const user = await User.findOne({email});
    if(!email || !user) return false;

    return user;
}

export async function createUser(input: UserInput){
    const user = await User.create({...input});
    return omit(user.toJSON(), "password");
}
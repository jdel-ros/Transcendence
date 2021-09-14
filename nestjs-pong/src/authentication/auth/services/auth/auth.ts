import { User } from "../../../typeorm";
import { UserDetails } from "../../../utils/type";

export interface AuthenticationProvider {
    validateUser(details: UserDetails);
    createUser(details: UserDetails);
    findUser(username: string): Promise <User | undefined>;
}
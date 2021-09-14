import { User } from "../typeorm";

export type UserDetails = {
	username: string,
	email: string,
	login42: string,
	image_url: string;
	displayName: string;
}

export type Done =  (err: Error, user: User) => void;
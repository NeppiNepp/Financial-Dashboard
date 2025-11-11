import { createContext, type Context } from "react";
import type { Updater } from "use-immer";

export interface User {
	email: string;
	password: string;
	username: string;
	userId: string;
}

export interface UserContextModel {
	updateUser: Updater<User>;
	user: User;
}

export const defaultUser: Readonly<User> = Object.freeze<User>({
	email: "",
	password: "",
	username: "",
	userId: "",
});

export const defaultUserContext: Readonly<UserContextModel> = Object.freeze<UserContextModel>({
	updateUser: () => {},
	user: defaultUser,
});

export const UserContext: Context<UserContextModel> = createContext<UserContextModel>(defaultUserContext);

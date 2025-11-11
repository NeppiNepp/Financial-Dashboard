import { useImmer } from "use-immer";
import { defaultUser, UserContext, type User, type UserContextModel } from "./UserContext";
import { useMemo, type PropsWithChildren } from "react";

interface UserContextProviderProps {}

export const UserContextProvider: React.FC<PropsWithChildren<UserContextProviderProps>> = (props) => {
	const [user, updateUser] = useImmer<User>(defaultUser);
	const userContext: UserContextModel = useMemo(() => {
		return { user, updateUser };
	}, [user])
	return <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>;
}
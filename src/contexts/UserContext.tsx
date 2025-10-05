"use client";

import { createContext, useContext, useState } from "react";
import type { User } from "@/domains/auth/types";

const UserContext = createContext<{ user: User | null; setUser: (u: User | null) => void }>({
	user: null,
	setUser: () => {},
});

export function UserContextProvider({ children, user: initialUser }: { children: React.ReactNode; user: User | null }) {
	const [user, setUser] = useState(initialUser);
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

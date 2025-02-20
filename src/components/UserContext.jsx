import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserPovider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState("");

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser}}>
            {children}
        </UserContext.Provider>
    );
};
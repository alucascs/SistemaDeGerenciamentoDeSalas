import { useState, createContext, useEffect } from 'react';

export const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : { id: null, email: '', role: '', nome: '' };
    });

    useEffect(() => {
        if (user.id) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

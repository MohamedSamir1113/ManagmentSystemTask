import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext(undefined);

function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const updateUser = async (id, data) => {
        try {
            const res = await axios.put(`https://dummyjson.com/users/${id}`, data);
            console.log(res.data);
            setUsers(users => users.map(user => (user.id === id ? { ...user, ...res.data } : user)));
            return res.data;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };

    const addUser = async (data) => {
        try {
            const res = await axios.post(`https://dummyjson.com/users/add`, data);
            console.log(res.data);
            setUsers((prevUsers) => [...prevUsers, res.data]);
            return res.data;
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`https://dummyjson.com/users/${id}`);
            setUsers(users => users.filter((user) => user.id !== id));
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    };

    return (
        <>
            <UserContext.Provider value={{ users, setUsers, updateUser, addUser, deleteUser, searchQuery, setSearchQuery }}>
                {children}
            </UserContext.Provider>
        </>
    );
}

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) throw new Error("context out of provider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };



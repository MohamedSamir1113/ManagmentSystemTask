import { createContext, useContext, useState } from "react";
import * as api from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Simple state management instead of complex reducer
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Show 10 users per page

  // Load all users from API
  const loadUsers = async () => {
    const usersData = await api.fetchUsers();
    setUsers(usersData);
  };

  // Add a new user
  const addUser = async (userData) => {
    const newUser = await api.addUser(userData);
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  // Update an existing user
  const updateUser = async (userId, userData) => {
    const updatedUser = await api.updateUser(userId, userData);
    setUsers(prevUsers => 
      prevUsers.map(user => user.id === userId ? updatedUser : user)
    );
    return updatedUser;
  };

  // Delete a user
  const deleteUser = async (userId) => {
    await api.deleteUser(userId);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  // Get paginated users based on current page and search query
  const getPaginatedUsers = () => {
    let filteredUsers = users;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = (user.email || "").toLowerCase();
        const phone = (user.phone || "").toLowerCase();
        const birthDate = (user.birthDate || "").toLowerCase();
        
        return fullName.includes(query) || 
               email.includes(query) || 
               phone.includes(query) || 
               birthDate.includes(query);
      });
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    
    return {
      users: filteredUsers.slice(startIndex, endIndex),
      totalUsers: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / usersPerPage),
      currentPage,
      usersPerPage
    };
  };

  // Reset to first page when search query changes
  const setSearchQueryWithReset = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        searchQuery,
        setSearchQuery: setSearchQueryWithReset,
        currentPage,
        setCurrentPage,
        usersPerPage,
        loadUsers,
        addUser,
        updateUser,
        deleteUser,
        getPaginatedUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
}

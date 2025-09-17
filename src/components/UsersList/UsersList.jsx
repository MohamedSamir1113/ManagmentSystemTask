import { useEffect, useState } from "react";
import styles from "./UsersList.module.css";
import axios from "axios";
import User from "../User/User";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const UsersList = ({ setUserData }) => {
    const { users, setUsers, deleteUser: contextDeleteUser, searchQuery } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [errorFound, setError] = useState(false);
    const navigate = useNavigate();

    async function getUsers() {
        try {
            const res = await axios.get(`https://dummyjson.com/users`);
            console.log(res.data.users);
            setUsers(res.data.users);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error fetching users:", message);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }
    
    async function deleteUser(id) {
        try {
            await contextDeleteUser(id);
            toast.success("User Deleted Successfully 🚮");
        } catch (error) {
            toast.error("Failed to delete user. Please try again.");
            console.error("Error deleting user:", error);
        }
    }
    async function getUserToBeUpdated(_id, data) {
        setUserData(data)
        navigate("/dashboard/user-data")
        
       
    }
    useEffect(() => {
        if (users.length === 0) {
            setIsLoading(true);
            getUsers();
        }
        // if users already exist (e.g., after adding), skip refetch to avoid overwrite
    }, [users.length]);
   
    return (
        <section className={`${styles.sectionBg} container `}>
             <ToastContainer theme="dark"/>
            <div className="d-flex justify-content-between mb-3">
                <h3>UserList</h3>
                <button 
                    style={{ backgroundColor: "#FEAF00" }} 
                    className="btn text-white"
                    onClick={() => {
                        setUserData({});
                        navigate("/dashboard/user-data");
                    }}
                >
                    Add New User
                </button>
            </div>
            <hr />
            {errorFound ?
                <div className="d-flex justify-content-center align-items-center vh-100"> error fetching users</div>
                : isLoading ? <div className="d-flex fs-1 justify-content-center align-items-center vh-100"> <i className={`fa-solid fa-spinner ${styles.spin}`}></i></div> :
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="text-muted">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>BirthDate</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{users
                                .filter((user) => {
                                    const q = (searchQuery || "").toLowerCase();
                                    if (!q) return true;
                                    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();
                                    const email = (user.email ?? "").toLowerCase();
                                    const phone = (user.phone ?? "").toLowerCase();
                                    const birth = (user.birthDate ?? "").toLowerCase();
                                    return (
                                        name.includes(q) ||
                                        email.includes(q) ||
                                        phone.includes(q) ||
                                        birth.includes(q)
                                    );
                                })
                                .map((user) => (
                                <User onUpdate={getUserToBeUpdated} onDelete={deleteUser} key={user.id} user={user} />
                            ))}</tbody>
                        </table>
                    </div>
            }

        </section>
    )
}
export default UsersList;



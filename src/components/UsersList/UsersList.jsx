import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "./UsersList.module.css";
import User from "../User/User";
import { useUser } from "../../contexts/UserContext";

const UsersList = ({ setUserData }) => {
  const { users, loadUsers, deleteUser, searchQuery, currentPage, setCurrentPage, getPaginatedUsers } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load users when component mounts
  useEffect(() => {
    const loadUsersData = async () => {
      try {
        await loadUsers();
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    if (users.length === 0) {
      loadUsersData();
    } else {
      setLoading(false);
    }
  }, [users.length, loadUsers]);

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully 🚮");
    } catch {
      toast.error("Failed to delete user. Try again.");
    }
  };

  // Handle user edit - navigate to edit form
  const handleEdit = (user) => {
    setUserData(user);
    navigate("/dashboard/user-data");
  };

  // Handle add new user - navigate to add form
  const handleAddNew = () => {
    setUserData({});
    navigate("/dashboard/user-data");
  };

  // Get paginated data from context
  const paginationData = getPaginatedUsers();
  const { users: paginatedUsers, totalUsers, totalPages } = paginationData;

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="d-flex fs-1 justify-content-center align-items-center vh-100">
        <i className={`fa-solid fa-spinner ${styles.spin}`}></i>
      </div>
    );
  }

  if (error) {
    return <div className="d-flex justify-content-center align-items-center vh-100">{error}</div>;
  }

  return (
    <section className={`${styles.sectionBg} container`}>
      <ToastContainer theme="dark" />
      <div className="d-flex justify-content-between mb-3">
        <h3>User List ({totalUsers} users)</h3>
        <button
          style={{ backgroundColor: "#FEAF00" }}
          className="btn text-white"
          onClick={handleAddNew}
        >
          Add New User
        </button>
      </div>
      <hr />

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
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <User key={user.id} user={user} onDelete={handleDelete} onEdit={handleEdit} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  {searchQuery ? "No users found matching your search" : "No users available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted">
            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalUsers)} of {totalUsers} users
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              
              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
};

export default UsersList;

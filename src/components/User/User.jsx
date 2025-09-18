import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const User = ({ user, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { email, firstName, image, phone, birthDate, id } = user;

  // Handle edit button click
  const handleEditClick = () => {
    onEdit(user);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    onDelete(id);
  };

  // Close delete modal
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <tr>
        <td>
          <img 
            src={image} 
            alt={`${firstName}'s avatar`} 
            className="rounded" 
            style={{ width: "40px", height: "40px" }} 
          />
        </td>
        <td>{firstName}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{birthDate}</td>
        
        {/* Edit button */}
        <td>
          <i 
            onClick={handleEditClick} 
            className="fa-solid fa-pen text-warning" 
            style={{ cursor: "pointer" }}
            title="Edit user"
          />
        </td>

        {/* Delete button */}
        <td>
          <Button 
            className="bg-transparent border-0 p-0 m-0" 
            onClick={() => setShowDeleteModal(true)}
          >
            <i 
              className="fa-solid fa-trash-can text-warning" 
              style={{ cursor: "pointer" }}
              title="Delete user"
            />
          </Button>
        </td>
      </tr>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {firstName} from the user list?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default User;



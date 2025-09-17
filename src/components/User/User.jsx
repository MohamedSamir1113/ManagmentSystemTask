import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const User = ({ user, onDelete, onUpdate }) => {
    const { email, firstName, image, phone, birthDate, id } = user
    const [show, setShow] = useState(false);

    const handleDelete = (id) => {
        setShow(false)
        onDelete(id)
    };
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    
    function handleUpdate(id, userData) {
        onUpdate(id, userData);
    }
    return (
        <>
            <tr>
                <th ><img src={image} alt="" className="rounded rounded-1" style={{ width: "40px", height: "40px" }} /></th>
                <th>{firstName}</th>
                <td className="col-1">{email}</td>
                <td>{phone}</td>
                <td>{birthDate}</td>

                <td><i onClick={()=>handleUpdate(id,user)} className="fa-solid fa-pen text-warning"></i></td>

                <td> <Button className="bg-transparent border-0 p-0 m-0" onClick={handleShow}>
                    <i style={{ cursor: "pointer" }} className="fa-solid fa-trash-can text-warning"></i>
                </Button></td>
            </tr>

            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove {firstName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove {firstName} from the list of users?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default User;



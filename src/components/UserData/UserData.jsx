import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";

const UserData = ({ userData, setUserData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { updateUser, addUser } = useUser();
  
  // Check if we're editing an existing user or adding a new one
  const isEditing = userData && userData.id;
  const { firstName, lastName, email, phone, age, id, birthDate } = userData || {};
  
  // Populate form fields when userData changes
  useEffect(() => {
    if (userData) {
      setValue("firstName", firstName || "");
      setValue("lastName", lastName || "");
      setValue("email", email || "");
      setValue("phone", phone || "");
      setValue("age", age || "");
      setValue("birthDate", birthDate || "");
    }
  }, [userData, setValue]);

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      if (isEditing) {
        // Update existing user
        await updateUser(id, formData);
        toast.success("User updated successfully! ✅");
      } else {
        // Add new user
        await addUser(formData);
        toast.success("User added successfully! ✅");
      }
      
      // Show toast for 1.5 seconds before navigating
      setTimeout(() => {
        setUserData({});
        navigate("/dashboard/users");
      }, 1500);
    } catch (error) {
      toast.error("Failed to save user. Please try again.");
      console.error("Error saving user:", error);
    }
  };

    return (
        <>
            <ToastContainer theme="dark"/>
            <section className="container">
                <div className="mb-3">
                    {isEditing ? <h3>Update User</h3> : <h3>Add User</h3>}
                </div>
                <hr />
                <div className="pt-4 mt-4 d-flex justify-content-center align-items-center ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow shadow-sm py-5 rounded rounded-2 w-75"
                    >
                        <div className="row  m-0 p-4">
                            <div className="col-md-6">
                                <label className="text-muted mb-2">First Name</label>
                                <input
                                    {...register("firstName", { required: "First Name is required" })}
                                    placeholder="Enter Your First Name"
                                    className="form-control mb-3"
                                    type="text"
                                />
                                {errors?.firstName && (
                                    <span className="text-danger">{errors.firstName?.message}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted mb-2">Last Name</label>
                                <input
                                    {...register("lastName", { required: "Last Name is required" })}
                                    placeholder="Enter Your Last Name"
                                    className="form-control mb-3"
                                    type="text"
                                />
                                {errors?.lastName && (
                                    <span className="text-danger">{errors.lastName?.message}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted mb-2">Email</label>
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Enter Your Email"
                                    className="form-control mb-3"
                                    type="email"
                                />
                                {errors?.email && (
                                    <span className="text-danger">{errors.email?.message}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted mb-2">Age</label>
                                <input
                                    {...register("age", {
                                        required: "Age is required",
                                        setValueAs: (value) => Number(value),
                                    })}
                                    placeholder="Enter Your Age"
                                    className="form-control mb-3"
                                    type="number"
                                />
                                {errors?.age && (
                                    <span className="text-danger">{errors.age?.message}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted mb-2">Phone Number</label>
                                <input
                                    {...register("phone", { required: "Phone is required" })}
                                    placeholder="Enter Your Phone Number"
                                    className="form-control mb-3"
                                    type="text"
                                />
                                {errors?.phone && (
                                    <span className="text-danger">{errors.phone?.message}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted mb-2">Date Of Birth</label>
                                <input
                                    {...register("birthDate", { required: "Date of Birth is required" })}
                                    placeholder="Enter Your Date of Birth"
                                    className="form-control mb-3"
                                    type="date"
                                />
                                {errors?.birthDate && (
                                    <span className="text-danger">{errors.birthDate?.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="d-flex my-3 justify-content-center">
                            <button type="submit" className="btn btn-warning w-50 text-white">
                                {isEditing ? "Update" : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default UserData;



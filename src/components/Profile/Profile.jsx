import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
    const { loggedUser } = useAuth()
    const { firstName, lastName, email, phone, age, birthDate } = loggedUser || {}
    return <div>
        <section className="container">
            <div className="mb-3">
                profile
            </div>
            <hr />
            <div className="pt-4 mt-4 d-flex justify-content-center align-items-center ">
                <form className="bg-white shadow shadow-sm py-5 rounded rounded-2 w-75">
                    <div className="row justify-content-center  m-0 p-4">
                        <div className="col-md-6">
                            <label className="text-muted mb-2">First Name</label>
                            <input
                                value={firstName || ''}
                                className="form-control mb-3"
                                type="text"
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted mb-2">Last Name</label>
                            <input
                                value={lastName || ''}
                                className="form-control mb-3"
                                type="text"
                                readOnly
                            />

                        </div>
                        <div className="col-md-6">
                            <label className="text-muted mb-2">Email</label>
                            <input
                                value={email || ''}
                                className="form-control mb-3"
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>

                </form>
            </div>
        </section>
    </div>;
}

export default Profile;



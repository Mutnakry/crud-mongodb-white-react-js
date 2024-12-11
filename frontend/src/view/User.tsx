// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// // Define the User type
// interface User {
//     _id: string;
//     names: string;
//     email: string;
//     age: string;
//     createdAt?: string;
//     updatedAt?: string;
// }

// const UserList: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // Fetch users from the backend API
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get<User[]>('http://localhost:5000/api/user');
//             setUsers(response.data);
//         } catch (err) {
//             setError('Error fetching users');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteUser = async (userId: string) => {
//         try {
//           await axios.delete(`http://localhost:5000/api/user/${userId}`);
//           setUsers(users.filter((user) => user._id !== userId));
//         } catch (err:any) {
//           console.error("Error deleting user:", err);
//           setError(`Error deleting user: ${err.response?.data?.message || err.message}`);
//         }
//       };
      

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h2>User List</h2>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.length > 0 ? (
//                         users.map((user) => (
//                             <tr key={user._id}>
//                                 <td>{user._id}</td>
//                                 <td>{user.names}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.age}</td>
//                                 <button onClick={() => window.confirm('Are you sure?') && deleteUser(user._id)}>
//                                     Delete
//                                 </button>
//                                 <Link to={`/updateuser/${user._id}`}>Update</Link>

//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={5}>No users found.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserList;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

// Define the User type
interface User {
    _id: string;
    names: string;
    email: string;
    age: string;
    createdAt?: string;
    updatedAt?: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal open state
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Selected user to update
    const [userData, setUserData] = useState<User | null>(null); // Form data for the selected user

    // Fetch users from the backend API
    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>('http://localhost:5000/api/user');
            setUsers(response.data);
        } catch (err) {
            setError('Error fetching users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (err: any) {
            console.error("Error deleting user:", err);
            setError(`Error deleting user: ${err.response?.data?.message || err.message}`);
        }
    };

    // Open modal for updating user
    const openModal = (user: User) => {
        setSelectedUser(user);
        setUserData(user); // Pre-fill the form with the current user's data
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setUserData(null); // Reset form data
    };

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value,
            });
        }
    };

    // Handle form submit for updating user
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userData && selectedUser) {
            try {
                // Call backend API to update user
                await axios.put(`http://localhost:5000/api/user/${selectedUser._id}`, userData);
                // Update user list after update
                setUsers(users.map((user) => (user._id === selectedUser._id ? userData : user)));
                closeModal();
            } catch (err) {
                setError('Error updating user');
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.names}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button onClick={() => window.confirm('Are you sure?') && deleteUser(user._id)}>
                                        Delete
                                    </button>
                                    <Link to={`/updateuser/${user._id}`}>Update</Link>
                                    <button onClick={() => openModal(user)}>Update On Modal</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for updating user */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                <h2>Update User</h2>
                {userData && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="names"
                                value={userData.names}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Age:</label>
                            <input
                                type="number"
                                name="age"
                                value={userData.age}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Update User</button>
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default UserList;

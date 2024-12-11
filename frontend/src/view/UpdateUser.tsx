import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Define the User type
interface User {
    _id: string;
    names: string;
    email: string;
    age: string;
}

const UpdateUser: React.FC = () => {
    const { id } = useParams(); // Get the user ID from URL parameters
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch the user data from the API by ID
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:5000/api/user/${id}`);
                setUser(response.data);
            } catch (err) {
                setError('Error fetching user');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    // Handle form submit to update the user
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (user) {
            try {
                await axios.put(`http://localhost:5000/api/user/${user._id}`, user);
                navigate('/'); // Redirect to the home page after updating
            } catch (err) {
                setError('Error updating user');
                console.error(err);
            }
        }
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Update User</h2>
            {user && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="names"
                            value={user.names}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={user.age}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default UpdateUser;

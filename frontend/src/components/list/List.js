import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/list`);
                setUsers(response.data);
            } catch (error) {
                setError('Error al obtener la lista de usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
            <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                                    >
                                        <TrashIcon className="h-3 w-3" aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUsers;

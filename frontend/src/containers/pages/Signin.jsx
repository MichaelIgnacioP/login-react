import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import loginImage from '../../assets/img/login.jpg'; 


function Home() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        email: '',
        password: ''
    });

    const { id, name, age, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const apiUrl = process.env.REACT_APP_API_URL;


    const onSubmit = async e => {
        e.preventDefault();
        if (!id || !name || !age || !email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
            });
            return;
        }
        if (!email.includes('@')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El correo debe ser válido',
            });
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                id,
                name,
                age,
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Inicio de sesión exitoso',
                });
                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al conectar con el servidor',
                });
            }
        }
    };

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={loginImage}
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form onSubmit={onSubmit} className="mt-8 space-y-6">
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="id" className="sr-only">
                                ID
                            </label>
                            <input
                                id="id"
                                name="id"
                                value={id}
                                onChange={onChange}
                                type="number"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="ID"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="sr-only">
                                Age
                            </label>
                            <input
                                id="age"
                                name="age"
                                value={age}
                                onChange={onChange}
                                type="number"
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Age"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                value={email}
                                onChange={onChange}
                                type="email"
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                type="password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;

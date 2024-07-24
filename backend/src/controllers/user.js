const path = require('path');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'paralelepipedo';

const usersData = path.resolve(__dirname, '../../src/data/users.json');

exports.login = async (req, res) => {
    try {
        const { id, name, age, email, password } = req.body;

        if (!id || !name || !age || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        if (isNaN(id) || isNaN(age)) {
            return res.status(400).json({ message: 'ID y edad deben ser números' });
        }

        const data = await fs.readJson(usersData);
        const user = data.users.find(user =>
            user.id === parseInt(id) &&
            user.name === name &&
            user.age === parseInt(age) &&
            user.email === email
        );

        if (!user) {
            return res.status(401).json({ message: 'Datos de ingreso incorrectos.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }

        const token = jwt.sign({ user: user }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

exports.listUsers = async (req, res) => {
    try {
        const data = await fs.readJson(usersData);
        res.status(200).json(data.users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error listando los usuarios', error });
    }
};

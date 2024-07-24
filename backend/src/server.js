require('dotenv').config();
const express = require('express')
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'DELETE'], 
}));


app.use(express.json());

app.use('/api', userRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
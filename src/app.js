require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const gymRoutes = require('./routes/gymRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/gyms', gymRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});

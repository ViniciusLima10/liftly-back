require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const gymRoutes = require('./routes/gymRoutes');
const classRoutes = require('./routes/classRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const gymOccupancyRoutes = require('./routes/gymOccupancyRoutes');
const gymWorkoutPlanRoutes = require('./routes/gymWorkoutPlanRoutes');
const dietPlanRoutes = require('./routes/dietPlanRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/gyms', gymRoutes);
app.use('/classes', classRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/gymOccupancy', gymOccupancyRoutes);
app.use('/gymWorkoutPlan', gymWorkoutPlanRoutes);
app.use('/dietPlan', dietPlanRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});

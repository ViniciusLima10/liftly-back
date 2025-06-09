require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/mongo'); 



const userRoutes = require('./routes/userRoutes');
const gymRoutes = require('./routes/gymRoutes');
const classRoutes = require('./routes/classRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const dietPlanRoutes = require('./routes/dietPlanRoutes');
const gymWorkoutPlanRoutes = require('./routes/gymWorkoutPlanRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const personalServiceRoutes = require('./routes/personalServiceRoutes');



const cors = require('cors');

const app = express();

app.use(cors({origin: "http://localhost:3000"}))

connectMongo();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/users', userRoutes);
app.use('/gyms', gymRoutes);
app.use('/classes', classRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/gymOccupancy', dietPlanRoutes);
app.use('/dietPlan', dietPlanRoutes);
app.use("/gymWorkoutPlan", gymWorkoutPlanRoutes)
app.use("/marketplace", marketplaceRoutes)
app.use("/personal", personalServiceRoutes)


// Inicializar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});

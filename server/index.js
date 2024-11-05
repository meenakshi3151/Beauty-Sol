const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const displayParloursRoutes= require('./routes/displayParloursRoutes');

app.use(cors());
app.use(express.json());

app.listen(8081, () => {
    console.log('server started');
    }
);

app.use('/api/display',displayParloursRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);



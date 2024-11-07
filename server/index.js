const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
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

const server= http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', 
    },
});
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join', (userEmail) => {
        socket.join(userEmail);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
const sendNotificationUser = (userEmail, message) => {
    io.to(userEmail).emit('notification', message);
};



module.exports = { sendNotificationUser };

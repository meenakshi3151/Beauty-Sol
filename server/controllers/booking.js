const db = require('../db');
const { sendNotificationUser } = require('../index');
const bookingUser = async (req, res) => {
    const { user_email, service_id, total_price, service_type } = req.body;
    console.log(user_email);
    console.log(service_id);
    console.log(total_price);
    console.log(service_type);
    const booking_date = new Date();
    const booking_time = new Date();
    const status = "pending";
    if (user_email && service_id && total_price && service_type) {
        const query = 'INSERT INTO booking (user_email, service_id, booking_date, booking_time, total_price, service_type, status) VALUES (?,?,?,?,?,?,?)';
        const values = [user_email, service_id, booking_date, booking_time, total_price, service_type, status];
        db.query(query, values)
            .then(() => {
                res.send('Booking added successfully');
                sendNotificationUser(user_email, 'Your booking has been added successfully and is pending confirmation with #${service_type} and #${total_price}');
                const query = 'SELECT email FROM service WHERE service_id = ?';
                const values = [service_id];
                db.query(query, values)
                    .then(rows => {
                        const email = rows[0].email;
                        sendNotificationUser(email, 'You have a new booking request from #${user_email} with #${service_type} and #${total_price}');
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('server error');
                    });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error adding booking');
                sendNotificationUser(user_email, 'Error adding booking with #${service_type}');
            });
    }
    else {
        res.status(400).send('Please fill all the fields');
    }
};

const bookingBeauty = async (req, res) => {
    const { status, booking_id } = req.body;
    console.log(req.body);
    if(status && status === "Confirmed" && booking_id){
        console.log("geure")
        const query = 'UPDATE booking SET status = "Completed" WHERE booking_id = ? AND status = "confirmed"'
        const values = [ booking_id];
        db.query(query, values)
            
            .then(() => {
                res.send('Booking updated successfully');
                const query = 'SELECT user_email FROM booking WHERE booking_id = ?';
                const values = [booking_id];
                db.query(query, values)
                    .then(rows => {
                        const user_email = rows[0].user_email;
                        sendNotificationUser(user_email, 'Your booking has been completed successfully');
                        res.send('Booking updated successfully');
                    }
                    )
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('server error');
                    });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error updating booking');
                
            });
        return;
    }

    if (status && booking_id) {
        const query = 'UPDATE booking SET status = ? WHERE booking_id = ? AND status = "pending"';
        const values = [status, booking_id];
        db.query(query, values)
            .then(() => {
                res.send('Booking updated successfully');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error updating booking');
            });
        return;


    }
    else {
        res.status(400).send('Please fill all the fields');
    }
}

const getBookings = async (req, res) => {
    const { email } = req.body;
    if (email) {
        const query = 'SELECT * FROM booking WHERE user_email = ?';
        const values = [email];
        db.query(query, values)
            .then(rows => {
                res.send(rows);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error fetching bookings');
            });
    }
    else {
        res.status(400).send('Please fill all the fields');
    }
}

const cancelBooking = async (req, res) => {
    const { booking_id } = req.body;
    if (booking_id) {
        const query = 'DELETE FROM booking WHERE booking_id = ?';
        const values = [booking_id];
        db.query(query, values)
            .then(() => {
                const query = 'SELECT user_email FROM booking WHERE booking_id = ?';
                const values = [booking_id];
                db.query(query, values)
                    .then(rows => {
                        const user_email = rows[0].user_email;
                        res.send('Booking cancelled successfully');
                        sendNotificationUser(user_email, 'Your booking has been cancelled successfully');
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('server error');
                    });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error cancelling booking');
                const query = 'SELECT user_email FROM booking WHERE booking_id = ?';
                const values = [booking_id];
                db.query(query, values)
                    .then(rows => {
                        const user_email = rows[0].user_email;
                        sendNotificationUser(user_email, 'Error cancelling booking');
                        res.status(500).send('Error cancelling booking');
                    }
                    )
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('server error');
                    });
            });
    }
    else {
        res.status(400).send('Please fill all the fields');
    }
}

const allbookings = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    if (email) {
        const query = 'SELECT b.* FROM booking AS b JOIN service AS s ON b.service_id = s.service_id WHERE s.email = ?';
        const values = [email];
        db.query(query, values)
            .then(rows => {
             
                res.send(rows);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error fetching bookings');
            });
    }
    else {
        res.status(400).send('Please fill all the fields');
    }
}
module.exports = { bookingUser, bookingBeauty, cancelBooking, getBookings, allbookings };
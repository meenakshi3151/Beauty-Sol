const db = require('../db');
const service = async (req, res) => {
    console.log(req.body);
    const { service_name, service_description, price, email,  in_home, on_spot, price_inhome } = req.body; 
    if (service_name && service_description && price && email  && in_home && on_spot && price_inhome ) {
             return res.status(400).send('Please fill all the fields');
    }
        if(price < 0 || price_inhome < 0){
            return res.status(400).send('Price must be a positive number');
        }
        
        const query = 'INSERT INTO service ( service_name, service_description, price, email, in_home, on_spot, price_inhome) VALUES (?, ?, ?, ?, ? ,? , ?)';
        const values = [service_name, service_description, price, email, in_home, on_spot, price_inhome];
        db.query(query, values)
            .then(() => {
                res.send('Service added successfully');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error adding service');
            });
}

const getServices = async (req, res) => {
    const query = 'SELECT * FROM service WHERE email = ?';
    const values = [req.body.email];
    db.query(query, values)
        .then(([rows]) => {
            res.json(rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching services');
        });
}

const deleteService = async (req, res) => {
    const {service_id} = req.body;
    if(service_id){
        const query = 'DELETE FROM service WHERE service_id = ?';
        const values = [service_id];
        db.query(query, values)
            .then(() => {
                res.send('Service deleted successfully');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error deleting service');
            });
    }
    else{
        res.status(400).send('Please fill all the fields');
    }
}

module.exports = { service, deleteService , getServices};
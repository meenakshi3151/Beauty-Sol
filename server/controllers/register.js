const db = require('../db');
const register = async (req, res) => {
    console.log(req.body);
    const { name, email, password, phone, age, gender,street, pincode, city, state } = req.body;
    if (name && email && password && phone && gender && age) {
        if (password.length < 8) {
            return res.status(400).send('Password must be at least 8 characters long');
        }
        if (phone.length !== 10) {
            return res.status(400).send('Phone number must be 10 digits long');
        }
        if (age < 0) {
            return res.status(400).send('Age must be a positive number');
        }
        if (
            (db.user && db.user.find(user1 => user1.email === email)) || 
            (db.beauty_parlour && db.beauty_parlour.find(beauty => beauty.email === email))
        ) {
            return res.status(400).send('User already exists');
        }
        if (email.indexOf('@') === -1) {
            return res.status(400).send('Invalid email');
        }
        const query = 'INSERT INTO user (name, email, password, gender, phone, age,Street, Pincode, City, State) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?)';
        const values = [name, email, password, gender, phone, age, street, pincode, city, state];
        
        db.query(query, values)
            .then(() => {
                res.send('User registered successfully');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error registering user');
            });
    } else {
        res.status(400).send('Please fill all the fields');
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
        const values = [email, password];
        db.query(query, values)
            .then(([rows]) => {
                if (rows.length === 1) {
                    console.log(rows);
                    res.send(rows);
                } else {
                    res.status(401).send('Invalid email or password');
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error logging in');
            });
    } else {
        res.status(400).send('Please fill all the fields');
    }
}

const beautyRegister= async (req, res) => {
    console.log(req.body);
    const { name, email, password, category, phone,  street, pincode, city, state} = req.body;
    if (name && email && password && phone && street && pincode && city && state   ) {
        if(password.length < 8 ){
            return res.status(400).send('Password must be at least 8 characters long');
        }
        if(phone.length !== 10){
            return res.status(400).send('Phone number must be 10 digits long');
        }
        if(db.beauty_parlour && db.beauty_parlour.find(beauty => beauty.email === email) ||  db.user && db.user.find(user => user.email === email)){
            return res.status(400).send('Beauty already exists');
        }
        if(email.indexOf('@') === -1){
            return res.status(400).send('Invalid email');
        }
        const query = `INSERT INTO beauty_parlour (name, email, password, category, phone,  Street, Pincode, City, State) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)` ;
    
    const values = [name, email, password, category, phone,  street, pincode, city, state];
        
        db.query(query, values)
            .then(() => {
                res.send('Beauty registered successfully');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error registering beauty');
            });
    } else {
        res.status(400).send('Please fill all the fields');
    }
}

const beautyLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const query = 'SELECT * FROM beauty_parlour WHERE email = ? AND password = ?';
        const values = [email, password];
        db.query(query, values)
            .then(([rows]) => {
                if (rows.length === 1) {
                    res.send(rows);
                } else {
                    res.status(401).send('Invalid email or password');
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error logging in');
            });
    } else {
        res.status(400).send('Please fill all the fields');
    }
}

module.exports = { register, login, beautyRegister, beautyLogin };

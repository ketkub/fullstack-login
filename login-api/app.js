const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();
const saltRounds = 10;
const secret = 'fullstack';

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
};

const connection = mysql.createPool(connectionConfig);

connection.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        process.exit(1);
    }
    console.log('Connected to database.');
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', message: 'Authorization header is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Invalid token', error: err.message });
    }
};

const verifyAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({ status: 'error', message: 'Permission denied' });
    }
    next();
};

// Routes
app.post('/register', async (req, res) => {
    const { email, password, fname, lname } = req.body;
    if (!email || !password || !fname || !lname) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ status: 'error', message: 'Invalid email format' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        connection.execute(
            'INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, fname, lname],
            (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ status: 'error', message: 'Email already exists' });
                    }
                    return res.status(500).json({ status: 'error', message: 'Database error', error: err });
                }
                res.status(201).json({ status: 'ok', message: 'Registration successful' });
            }
        );
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Error hashing password', error: err.message });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    connection.execute('SELECT * FROM users WHERE email = ?', [email], async (err, users) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error', error: err });
        }
        if (users.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No user found with that email' });
        }

        const user = users[0];
        try {
            const isLogin = await bcrypt.compare(password, user.password);
            if (isLogin) {
                const token = jwt.sign({ email: user.email, role: user.role }, secret, { expiresIn: '2h' });
                return res.json({ status: 'ok', message: 'Login successful', token, role: user.role });
            } else {
                return res.status(401).json({ status: 'error', message: 'Invalid password' });
            }
        } catch (compareErr) {
            return res.status(500).json({ status: 'error', message: 'Error comparing password', error: compareErr.message });
        }
    });
});

app.get('/profile', verifyToken, (req, res) => {
    const { email } = req.user;

    connection.query('SELECT email, fname, lname FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.json({ status: 'ok', user: results[0] });
    });
});

app.post('/promotions', verifyToken, verifyAdmin, upload.single('image'), (req, res) => {
    const image = req.file ? req.file.path : null;
    if (!image) {
        return res.status(400).json({ status: 'error', message: 'Image field is required' });
    }

    connection.query('INSERT INTO promotions (image) VALUES (?)', [image], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error', error: err.message });
        }
        res.status(201).json({ status: 'ok', message: 'Promotion added successfully', id: results.insertId });
    });
});

app.get('/promotions', (req, res) => {
    connection.query('SELECT id, image FROM promotions', (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error', error: err.message });
        }
        const promotions = results.map((promo) => ({
            ...promo,
            image: `http://localhost:3000/${promo.image}`,
        }));
        res.json({ status: 'ok', promotions });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}`);
});

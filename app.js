const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sidhu@07',
    database: 'food_explorer'
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// API endpoint for searching restaurants
app.get('/search', (req, res) => {
    const searchQuery = req.query.search;
    const query = `SELECT * FROM restaurants WHERE location LIKE ? OR type_of_food LIKE ?`;

    db.query(query, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Food Explorer API! Use the /search endpoint to find restaurants.');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mysql = require('mysql2/promise');
const fs = require('fs');
const poolconfig = JSON.parse(fs.readFileSync("poolconfig.txt"));


const pool = mysql.createPool(poolconfig);

async function checkDB() {
    const [rows] = await pool.query('SELECT * FROM film LIMIT 20');

    const properties = Object.keys(rows[0]);

    console.log(rows[0]);
    console.log(rows[1]);
}

//checkDB();

//process.exit(0);
app.use(cors({
    origin: "http://localhost:3000"
    }));
app.use((req, res, next) => {
    console.log(`Client connection attempt from IP: ${req.ip}`);
    console.log(`Request url: ${req.url}`);
    console.log(`request method: ${req.method}`);
    //res.send("hi from the server");
    next();
});

app.get('/api/data/film', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM film LIMIT 20'); // Replace with your query
        res.set('Content-Type', 'application/json');
        res.json(rows); // Send data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/data/customer', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM customer LIMIT 20'); // Replace with your query
        res.json(rows); // Send data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


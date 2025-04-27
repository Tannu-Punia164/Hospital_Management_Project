const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,          // Host from .env
    user: process.env.DB_USER,          // User from .env
    password: process.env.DB_PASSWORD,  // Password from .env
    database: process.env.DB_NAME,      // Database from .env
    port: process.env.DB_PORT           // Port from .env
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database!');
    }
});

// Export the database connection
module.exports = db;

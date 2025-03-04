const { Client } = require("pg");

const Conect = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin123",
    database: "mydata"
});

// Connect to PostgreSQL with error handling
conect.connect()
    .then(() => console.log(" Connected successfully to PostgreSQL"))
    .catch(err => console.error(" Database connection error:", err.stack));

module.exports = Conect;  

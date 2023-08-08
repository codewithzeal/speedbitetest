const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.hostlink,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool
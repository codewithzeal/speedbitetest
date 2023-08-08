const pool = new Pool({
    connectionString: process.env.hostlink,
    ssl: {
        rejectUnauthorized: false
    }
});
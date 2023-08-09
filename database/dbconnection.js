const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.hostlink,
    ssl: {
        rejectUnauthorized: false
    }
});

// pool.query("select * from contacts",(err,res)=>{
//     console.log(res.rows)
// })

pool.query("delete from contacts",(err,res)=>{
    console.log(res.rows)
})

module.exports = pool
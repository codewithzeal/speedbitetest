const pool = require('./dbconnection')

const executeQuery = (query)=>{
    
  return new Promise((s,r)=>{
      pool.query(query, (err, res) => {
        if (err) {
          console.error("error occured during query execution: ",err);
          r(null)
        }
        else
        {
          s(res.rows)
        }
    });
  })
  
}

module.exports = executeQuery
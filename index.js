require('dotenv').config();
const express = require('express');
const router = require('./Routes/identify');
const cors = require('cors');


const app = express();


app.use(express.json());
app.use(cors())


app.use(router)

app.listen(process.env.PORT, () => {

    setInterval(()=>{
        console.log("keeping alive")
    },50000)
    console.log(`Server is running on port ${process.env.PORT}`);
});


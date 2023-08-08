const dotenv = require('dotenv');
const express = require('express');

const app = express();
app.use(express.json());
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


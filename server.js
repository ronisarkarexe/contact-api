const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection')

connectDb();
const app = express();

const port = 5000;

app.use(express.json());


app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);


app.listen(port,() => {
   console.log('listening on port')
});
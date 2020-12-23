const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connected");
})

const todoRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

app.use('/todos', todoRouter);
app.use('/users', usersRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

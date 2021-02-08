const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

const { PORT } = require('./config/config');

mongoose.connect('mongodb://localhost:27017/form', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.use(cors());
app.use(morgan('dev'));

app.use(express.static('/public'));
app.set(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/login", require("./routes/login"));
app.use("/registration", require("./routes/regisration"));






app.listen(PORT);
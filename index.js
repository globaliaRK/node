const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

const { PORT } = require('./config/config');
const users = require('./models/users');
const ifLogin = require('./middleware/ifLogin');

mongoose.connect('mongodb://localhost:27017/form', {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true
});
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    secret: "KEY",
    login: false,
    cookie: { secure: true }
}));
app.use(express.static('/public'));
app.set(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/users', ifLogin, async (req, res) => {
    console.log(req.session);
    const usrs = await users.find({})
    res.status(200).json(usrs);
});


app.delete('/delete', async (req, res) => {
    let _id = req.body._id;
    const user = await users.findByIdAndDelete(_id,);
    if (user) {
        res.status(200).json({
            status: 1,
            users: await users.find(),
            data: "User Deleted..."
        });
    } else {
        res.status(200).json({
            status: 0,
            user,
            data: "User Not Found..."
        });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
});

app.use("/login", require("./routes/login"));
app.use("/registration", require("./routes/regisration"));
app.use("/update", require("./routes/update"));


app.listen(PORT);
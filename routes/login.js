const express = require('express');
const bcrypt = require('bcrypt');

const Routes = express.Router();
const users = require('./../models/users');



Routes.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email != "" && password != "") {

        const user = await users.find({ email });

        if (user.length > 0) {
            if (await bcrypt.compare(password, user[0].password)) {
                console.log(req.session);
                req.session.login = true
                console.log(req.session);
                res.status(200).json({
                    status: 1,
                    data: "Login",
                    user: user[0]
                });
            } else {
                res.status(200).json({
                    status: 0,
                    error: "Password Incorrect..."
                });
            }
        } else {
            res.status(200).json({
                status: 0,
                error: "User Not Avalable..."
            });
        }
    } else {
        res.status(200).json({
            status: 0,
            error: "We Need Values(Email,Password)!"
        });
    }

})


module.exports = Routes;
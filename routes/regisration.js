const express = require('express');
const bcrypt = require('bcrypt');

const Routes = express.Router();
const users = require('./../models/users');



Routes.get('/', async (req, res) => {
    const { name, email, password } = req.body;
    if (await (await users.find({ email })).length < 1) {

        if ((name != "" && email != "" && password != "")) {

            bcrypt.hash(password, 8)
                .then((epassword) => {

                    const user = new users({
                        name, email, password: epassword
                    });
                    user.save().then((user) => {
                        res.status(200).json({
                            status: 1,
                            data: "account created.",
                            user,
                        });
                    }).catch((err) => {
                        res.status(400).json({
                            status: 0,
                            error: err.message
                        });
                    });

                })
                .catch((err) => {
                    res.status(400).json({
                        status: 0,
                        error: err.message
                    });
                });
        } else {
            res.status(400).json({
                status: 0,
                error: "All Field Required...."
            });
        }


    } else {
        res.status(400).json({
            status: 0,
            error: "Account Already Created..."
        });
    }

})


module.exports = Routes;
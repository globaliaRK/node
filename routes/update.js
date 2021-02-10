const express = require('express');
const users = require('../models/users');

const Routes = express.Router();

Routes.get('/:id', async (req, res) => {
    let { id } = req.params;
    const user = await users.findById(id);
    if (user) {
        res
            .status(200)
            .json({
                status: 1,
                user
            });
    } else {
        res.status(200).json({
            status: 0,
            error: "User Not Found"
        });
    }
});

Routes.post("/", (req, res) => {
    let { id, name, email } = req.body;

    users.findByIdAndUpdate(id, { name })
        .then((user) => {
            res.status(200).json({
                status: 1,
            });
        })
        .catch((err) => {
            res.status(200).json({
                status: 0
            });
        })
});

module.exports = Routes;
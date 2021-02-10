
const ifLogin = (req, res, next) => {
    console.log(req.session);
    if (req.session.login) {
        next();
    } else {
        next();
        // res.status(200).json({
        //     status: 0,
        //     error: "Login Or Registraion Frist..."
        // });
    }
}



module.exports = ifLogin;
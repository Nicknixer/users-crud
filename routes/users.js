let User = require('../models/User');

module.exports = function(app) {
    // Получение всех
    app.get('/users', async (req, res) => {
        let users = await User.find((error, users) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            return users;
        });

        res.json({
            success: true,
            users: users
        });
    });

        // Добавление
    app.post('/users', async (req, res) => {
        let login = req.body.login,
            password = req.body.password,
            name = req.body.name;

        if (!login || !name || !password 
            || name.length === 0 || password.length === 0 || login.length === 0
            ) {
            res.json({
                msg: "Required fields is empty",
                success: false
            });
        }

        let userRecord = new User({
            login: login,
            password: password,
            name: name
        });

        userRecord.save(function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            res.json({
                msg: "User has been saved",
                success: true
            });
        });
    });

    // Получение одного
    app.get('/users/:login', async (req, res) => {
        let user = await User.find({login: req.params.login}, 'login name', (error, user) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            return user;
        });

        if (Object.keys(user).length == 0) {
            res.json({
                success: false,
                msg: "Not found"
            });
        }

        res.json({
            success: true,
            user: user
        });
    });

    // УДаление
    app.delete('/users/:login', async (req, res) => {
        let user = await User.remove({login: req.params.login}, (error, user) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            res.json({
                success: true,
                msg: "User has been deleted"
            });
        });
    });

    // Изменение юзера
    app.put('/users/:login', async (req, res) => {
        let login = req.body.login,
            password = req.body.password,
            name = req.body.name;

            console.log(login);

        if (!login || !name || !password 
            || name.length === 0 || password.length === 0 || login.length === 0
            ) {
            res.json({
                msg: "Required fields is empty",
                success: false
            });
        }

        let user = await User.findOne({login: req.params.login}, (error, user) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            return user;

        });

        if (user == null) {
            res.json({
                success: false,
                msg: "Not found"
            });
        }

        user.login = login;
        user.name = name;
        user.password = password;

        user.save(error=>{
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            res.json({
                msg: "User has been updated",
                success: true
            });
        });
    });
    
};

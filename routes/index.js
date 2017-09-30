module.exports = function(app) {
    app.get('/', function (req, res) {
        res.end("Use API /users");
    });
};

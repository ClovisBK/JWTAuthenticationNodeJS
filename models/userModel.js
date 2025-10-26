const app = require("../config/app");

exports.getAllUsers = (callback) => {
    app.query('SELECT * FROM user', callback);
};
exports.createUser = (data, callback) => {
    app.query('INSERT INTO user SET ?' [data], callback);
};
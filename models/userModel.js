const app = require("../config/app");

exports.getAllUsers = (callback) => {
    app.query('SELECT * FROM user', callback);
};
exports.createUser = (data, callback) => {
    app.query('INSERT INTO user SET ?', data, callback);
};

exports.findByEmail = (email, callback) => {
    app.query('SELECT * FROM user WHERE email = ?', [email], callback);
}

exports.updateUserRole = (email, role, callback) => {
    app.query('UPDATE user SET role = ? WHERE email = ?', [role, email], callback);
};

exports.setResetToken = (email, hashedToken, expiry, callback) => {
    app.query(
        'UPDATE user SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?',
        [hashedToken, expiry, email],
        callback
    );
};

exports.findByResetToken = (hashedToken, callback) =>{
    app.query(
        'SELECT * FROM user WHERE reset_password_token = ? AND reset_password_expires  > NOW()',
        [hashedToken],
        callback
    );
};


exports.updatePassword = (email, hashedPassword, callback) => {
    app.query(
        'UPDATE user SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE email = ?',
        [hashedPassword, email],
        callback
    );
};
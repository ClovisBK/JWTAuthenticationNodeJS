
const app = require("../config/app");

exports.getAllUsers = (callback) => {
    app.query('SELECT * FROM users', callback);
};
exports.createUser = (data, callback) => {
    app.query('INSERT INTO users SET ?', data, callback);
};

exports.findByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    app.query(sql, [email], callback);
}

exports.updateUserRole = (email, role, callback) => {
    app.query('UPDATE users SET role = ? WHERE email = ?', [role, email], callback);
};

exports.linkPharmacyToUser = (userId, pharmacyId, callback) =>{
    app.query("UPDATE users SET pharmacy_id = ? WHERE id = ?", [pharmacyId, userId], callback);
}
exports.getUserPharmacy = (userId, callback) =>{
    app.query("SELECT pharmacy_id FROM users WHERE id = ?", [userId], callback);
    
};

exports.setResetToken = (email, hashedToken, expiry, callback) => {
    app.query(
        'UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?',
        [hashedToken, expiry, email],
        callback
    );
};

exports.findByResetToken = (hashedToken, callback) =>{
    app.query(
        'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires  > NOW()',
        [hashedToken],
        callback
    );
};


exports.updatePassword = (email, hashedPassword, callback) => {
    app.query(
        'UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE email = ?',
        [hashedPassword, email],
        callback
    );
};
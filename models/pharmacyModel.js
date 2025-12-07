const app = require("../config/app");

exports.createPharmacy = (data, callback) => {
    app.query(
        "INSERT INTO pharmacies (name, licence_number, address_street, address_city, phone_number) VALUES (?,?,?,?,?)",
        [data.name, data.licence_number, data.address_street,data.address_city, data.phone_number],
        callback
    );
};
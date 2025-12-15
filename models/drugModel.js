const app = require("../config/app");

exports.getAllDrugs =(PharmacyId, callback) =>{
    app.query('SELECT * FROM drugs WHERE pharmacy_id = ?',[PharmacyId], callback);
}

exports.addDrug = (data, callback) => {
    app.query("INSERT INTO drugs (name, pharmacy_id, generic_name, dosage_form, unit_price, quantity_available, description)VALUES (?,?,?,?,?,?,?)",
    [data.name, data.pharmacy_id, data.generic_name, data.dosage_form, data.unit_price, data.quantity_available, data.description],
    callback
    );
};
const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
module.exports = Pharmacy;

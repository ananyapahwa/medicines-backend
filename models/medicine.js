const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;

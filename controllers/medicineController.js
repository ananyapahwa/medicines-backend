const Medicine = require('../models/medicine');
const Pharmacy = require('../models/pharmacy');

// Create Medicine (already provided)
const createMedicine = async (req, res) => {
    const { name, description, price, discount } = req.body;
    const pharmacyId = req.params.pharmacyId;

    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) {
        return res.status(404).json({ message: 'Pharmacy not found' });
    }

    const medicine = await Medicine.create({
        name,
        description,
        price,
        discount,
        pharmacyId,
    });

    res.status(201).json(medicine);
};

// Get All Medicines for a Pharmacy (already provided)
const listMedicines = async (req, res) => {
    const pharmacyId = req.params.pharmacyId;

    const medicines = await Medicine.find({ pharmacyId });
    res.json(medicines);
};

// Update Medicine
const updateMedicine = async (req, res) => {
    const { name, description, price, discount } = req.body;
    const { pharmacyId, medicineId } = req.params;

    const medicine = await Medicine.findOne({ _id: medicineId, pharmacyId });

    if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }

    medicine.name = name || medicine.name;
    medicine.description = description || medicine.description;
    medicine.price = price || medicine.price;
    medicine.discount = discount || medicine.discount;

    const updatedMedicine = await medicine.save();
    res.json(updatedMedicine);
};

// Delete Medicine
const deleteMedicine = async (req, res) => {
    const { pharmacyId, medicineId } = req.params;

    const medicine = await Medicine.findOne({ _id: medicineId, pharmacyId });

    if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }

    await medicine.remove();
    res.json({ message: 'Medicine removed' });
};

// Get a Single Medicine
const getMedicine = async (req, res) => {
    const { pharmacyId, medicineId } = req.params;

    const medicine = await Medicine.findOne({ _id: medicineId, pharmacyId });

    if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(medicine);
};

module.exports = {
    createMedicine,
    listMedicines,
    updateMedicine,
    deleteMedicine,
    getMedicine,
};

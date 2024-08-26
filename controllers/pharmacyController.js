const Pharmacy = require('../models/pharmacy');
const generateToken = require('../utils/generateToken');

const registerPharmacy = async (req, res) => {
    const { name, address, contact } = req.body;
    const userId = req.user._id;

    const pharmacy = await Pharmacy.create({
        name,
        address,
        contact,
        userId,
    });

    if (pharmacy) {
        res.status(201).json({
            _id: pharmacy._id,
            name: pharmacy.name,
            address: pharmacy.address,
            contact: pharmacy.contact,
            token: generateToken(pharmacy._id, process.env.JWT_PHARMACY_SECRET),
        });
    } else {
        res.status(400).json({ message: 'Invalid pharmacy data' });
    }
};

const listPharmacies = async (req, res) => {
    const pharmacies = await Pharmacy.find({}).populate('userId', 'username email');
    res.json(pharmacies);
};

module.exports = { registerPharmacy, listPharmacies };

const express = require('express');
const {
    createMedicine,
    listMedicines,
    updateMedicine,
    deleteMedicine,
    getMedicine,
} = require('../controllers/medicineController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:pharmacyId/medicines', protect(process.env.JWT_PHARMACY_SECRET), createMedicine);
router.get('/:pharmacyId/medicines', listMedicines);
router.put('/:pharmacyId/medicines/:medicineId', protect(process.env.JWT_PHARMACY_SECRET), updateMedicine);
router.delete('/:pharmacyId/medicines/:medicineId', protect(process.env.JWT_PHARMACY_SECRET), deleteMedicine);
router.get('/:pharmacyId/medicines/:medicineId', getMedicine);

module.exports = router;

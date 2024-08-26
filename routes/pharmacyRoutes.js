const express = require('express');
const { registerPharmacy, listPharmacies } = require('../controllers/pharmacyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect(process.env.JWT_SECRET), registerPharmacy);
router.get('/', listPharmacies);

module.exports = router;

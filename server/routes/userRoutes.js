const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserProfile, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin, isProjectLead } = require('../middleware/roleMiddleware');

router.route('/').get(protect, isProjectLead, getAllUsers);
router.route('/profile').put(protect, updateUserProfile);
router.route('/:id').delete(protect, isAdmin, deleteUser);

module.exports = router;
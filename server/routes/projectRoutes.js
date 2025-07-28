const express = require('express');
const router = express.Router();
const { addProject, getProjects, getProjectById, assignDeveloperToProject, uploadDocument, markProjectAsCompleted, assignProjectLead, deleteProject, deleteDocument, unassignDeveloper, unassignProjectLead } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin, isProjectLead } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').post(protect, isAdmin, addProject).get(protect, getProjects);

router.route('/:id')
    .get(protect, getProjectById)
    .delete(protect, isAdmin, deleteProject);

router.route('/:id/assign').put(protect, isProjectLead, assignDeveloperToProject);
router.route('/:id/upload').post(protect, isProjectLead, upload.single('document'), uploadDocument);
router.route('/:id/complete').put(protect, isAdmin, markProjectAsCompleted);
router.route('/:id/assign-lead').put(protect, isAdmin, assignProjectLead);
router.route('/:projectId/documents/:docId').delete(protect, isProjectLead, deleteDocument);
router.route('/:projectId/team/:userId').delete(protect, isProjectLead, unassignDeveloper);
router.route('/:projectId/lead').delete(protect, isAdmin, unassignProjectLead);

module.exports = router;
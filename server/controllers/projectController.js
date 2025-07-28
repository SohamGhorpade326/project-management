const Project = require('../models/Project');
const User = require('../models/User');

exports.addProject = async (req, res) => {
    const { name, description, deadline } = req.body;
    try {
        const project = new Project({ name, description, deadline, projectLead: req.user._id });
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        let projects;
        if (req.user.role === 'Admin') {
            projects = await Project.find({}).populate('team', 'username').populate('projectLead', 'username');
        } else if (req.user.role === 'Project Lead') {
            projects = await Project.find({ projectLead: req.user._id }).populate('team', 'username').populate('projectLead', 'username');
        } else {
            projects = await Project.find({ team: req.user._id }).populate('team', 'username').populate('projectLead', 'username');
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('team', 'username').populate('projectLead', 'username').populate('documents.uploadedBy', 'username');
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignDeveloperToProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        if (project && user) {
            if (project.team.includes(user._id)) {
                return res.status(400).json({ message: 'User already assigned to this project' });
            }
            project.team.push(user._id);
            await project.save();
            res.json({ message: 'Developer assigned' });
        } else {
            res.status(404).json({ message: 'Project or User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadDocument = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            const newDocument = {
                fileName: req.file.originalname,
                filePath: req.file.path.replace(/\\/g, "/"),
                uploadedBy: req.user._id,
            };
            project.documents.push(newDocument);
            await project.save();
            res.status(201).json({ message: 'Document uploaded' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'File upload failed' });
    }
};

exports.markProjectAsCompleted = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.status = 'Completed';
            await project.save();
            res.json({ message: 'Project marked as completed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignProjectLead = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        const newLead = await User.findById(req.body.userId);
        if (project && newLead && newLead.role === 'Project Lead') {
            project.projectLead = newLead._id;
            await project.save();
            res.json({ message: 'Project Lead assigned successfully.' });
        } else {
            res.status(404).json({ message: 'Project or Project Lead not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (project) {
            project.documents.pull({ _id: req.params.docId });
            await project.save();
            res.json({ message: 'Document removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.unassignDeveloper = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (project) {
            // Pull the developer's ID from the team array
            project.team.pull(req.params.userId);
            await project.save();
            res.json({ message: 'Developer unassigned' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.unassignProjectLead = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (project) {
            // Set the projectLead to null
            project.projectLead = null;
            await project.save();
            res.json({ message: 'Project Lead unassigned' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
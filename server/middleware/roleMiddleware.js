const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an Admin' });
    }
};

const isProjectLead = (req, res, next) => {
    // Admins have all privileges, so they also pass the Project Lead check.
    if (req.user && (req.user.role === 'Project Lead' || req.user.role === 'Admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a Project Lead' });
    }
};

module.exports = { isAdmin, isProjectLead };
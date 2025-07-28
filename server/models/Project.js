const mongoose = require('mongoose');

// This schema defines the structure for uploaded documents.
const DocumentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });


// This schema defines the structure for a project.
const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true }, //
    description: { type: String, required: true }, //
    deadline: { type: Date, required: true }, //
    status: { type: String, enum: ['Active', 'Completed'], default: 'Active' }, //
    projectLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //
    documents: [DocumentSchema], //
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
// index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Port number for the application

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

let patients = {}; // In-memory store for patient data

// Endpoint to add a new patient
app.post('/patients', (req, res) => {
    const { id, name, age, condition } = req.body;

    // Check if patient with the same ID already exists
    if (patients[id]) {
        return res.status(400).json({ message: 'Patient with this ID already exists.' });
    }

    // Add patient data to the dictionary
    patients[id] = { name, age, condition };
    return res.status(201).json({ message: 'Patient added successfully.', patient: patients[id] });
});

// Endpoint to retrieve patient data by ID
app.get('/patients/:id', (req, res) => {
    const { id } = req.params;

    // Check if the patient exists
    if (!patients[id]) {
        return res.status(404).json({ message: 'Patient not found.' });
    }

    return res.status(200).json(patients[id]);
});

// Endpoint to retrieve all patients
app.get('/patients', (req, res) => {
    return res.status(200).json(patients);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; 

app.use(bodyParser.json());

let patients = {}; 

app.post('/patients', (req, res) => {
    const { id, name, age, condition } = req.body;
    if (patients[id]) {
        return res.status(400).json({ message: 'Patient with this ID already exists.' });
    }

    
    patients[id] = { name, age, condition };
    return res.status(201).json({ message: 'Patient added successfully.', patient: patients[id] });
});


app.get('/patients/:id', (req, res) => {
    const { id } = req.params;

    
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

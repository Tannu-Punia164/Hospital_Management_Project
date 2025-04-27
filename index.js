const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import MySQL connection
const db = require('./config/db');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());  // For parsing JSON bodies
app.use(cors());             // To handle cross-origin requests

// Simple Test Route
app.get('/', (req, res) => {
    res.send('Hospital Management System Backend is Running!');
});

// 1. Add a Doctor
app.post('/doctors', (req, res) => {
    const { first_name, last_name, specialization, phone_number, email } = req.body;

    const query = `INSERT INTO doctors (first_name, last_name, specialization, phone_number, email) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [first_name, last_name, specialization, phone_number, email], (err, result) => {
        if (err) {
            console.error('Error inserting doctor:', err);
            res.status(500).json({ message: 'Error adding doctor' });
        } else {
            res.status(201).json({ message: 'Doctor added successfully' });
        }
    });
});

// 2. Add a Patient
app.post('/patients', (req, res) => {
    const { first_name, last_name, dob, gender, phone_number, email } = req.body;

    const query = `INSERT INTO patients (first_name, last_name, dob, gender, phone_number, email) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [first_name, last_name, dob, gender, phone_number, email], (err, result) => {
        if (err) {
            console.error('Error inserting patient:', err);
            res.status(500).json({ message: 'Error adding patient' });
        } else {
            res.status(201).json({ message: 'Patient added successfully' });
        }
    });
});

// 3. Add an Appointment
app.post('/appointments', (req, res) => {
    const { patient_id, doctor_id, appointment_date, status } = req.body;

    const query = `INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)`;
    db.query(query, [patient_id, doctor_id, appointment_date, status], (err, result) => {
        if (err) {
            console.error('Error inserting appointment:', err);
            res.status(500).json({ message: 'Error adding appointment' });
        } else {
            res.status(201).json({ message: 'Appointment added successfully' });
        }
    });
});

// 4. Get all Doctors
app.get('/doctors', (req, res) => {
    const query = `SELECT * FROM doctors`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            res.status(500).json({ message: 'Error fetching doctors' });
        } else {
            res.status(200).json(result);
        }
    });
});


// Get a specific doctor
app.get('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    const query = 'SELECT * FROM doctors WHERE doctor_id = ?';
    db.query(query, [doctorId], (err, result) => {
        if (err) {
            console.error('Error retrieving doctor:', err);
            res.status(500).json({ message: 'Error retrieving doctor' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Update a doctor's details
app.put('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    const { first_name, last_name, specialty, phone_number, email } = req.body;
    const query = `UPDATE doctors 
                   SET first_name = ?, last_name = ?, specialty = ?, phone_number = ?, email = ? 
                   WHERE doctor_id = ?`;
    db.query(query, [first_name, last_name, specialty, phone_number, email, doctorId], (err, result) => {
        if (err) {
            console.error('Error updating doctor:', err);
            res.status(500).json({ message: 'Error updating doctor' });
        } else {
            res.status(200).json({ message: 'Doctor updated successfully' });
        }
    });
});

// Delete a doctor
app.delete('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    const query = 'DELETE FROM doctors WHERE doctor_id = ?';
    db.query(query, [doctorId], (err, result) => {
        if (err) {
            console.error('Error deleting doctor:', err);
            res.status(500).json({ message: 'Error deleting doctor' });
        } else {
            res.status(200).json({ message: 'Doctor deleted successfully' });
        }
    });
});


// 5. Get all Patients
app.get('/patients', (req, res) => {
    const query = `SELECT * FROM patients`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching patients:', err);
            res.status(500).json({ message: 'Error fetching patients' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Get a specific patient
app.get('/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const query = 'SELECT * FROM patients WHERE patient_id = ?';
    db.query(query, [patientId], (err, result) => {
        if (err) {
            console.error('Error retrieving patient:', err);
            res.status(500).json({ message: 'Error retrieving patient' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Update a patient's details
app.put('/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const { first_name, last_name, dob, gender, phone_number, email } = req.body;
    const query = `UPDATE patients 
                   SET first_name = ?, last_name = ?, dob = ?, gender = ?, phone_number = ?, email = ? 
                   WHERE patient_id = ?`;
    db.query(query, [first_name, last_name, dob, gender, phone_number, email, patientId], (err, result) => {
        if (err) {
            console.error('Error updating patient:', err);
            res.status(500).json({ message: 'Error updating patient' });
        } else {
            res.status(200).json({ message: 'Patient updated successfully' });
        }
    });
});

// Delete a patient
app.delete('/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const query = 'DELETE FROM patients WHERE patient_id = ?';
    db.query(query, [patientId], (err, result) => {
        if (err) {
            console.error('Error deleting patient:', err);
            res.status(500).json({ message: 'Error deleting patient' });
        } else {
            res.status(200).json({ message: 'Patient deleted successfully' });
        }
    });
});


// 6. Get all Appointments
app.get('/appointments', (req, res) => {
    const query = `SELECT * FROM appointments`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            res.status(500).json({ message: 'Error fetching appointments' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Get a specific appointment
app.get('/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    const query = 'SELECT * FROM appointments WHERE appointment_id = ?';
    db.query(query, [appointmentId], (err, result) => {
        if (err) {
            console.error('Error retrieving appointment:', err);
            res.status(500).json({ message: 'Error retrieving appointment' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Update an appointment's details
app.put('/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    const { patient_id, doctor_id, appointment_date, status } = req.body;
    const query = `UPDATE appointments 
                   SET patient_id = ?, doctor_id = ?, appointment_date = ?, status = ? 
                   WHERE appointment_id = ?`;
    db.query(query, [patient_id, doctor_id, appointment_date, status, appointmentId], (err, result) => {
        if (err) {
            console.error('Error updating appointment:', err);
            res.status(500).json({ message: 'Error updating appointment' });
        } else {
            res.status(200).json({ message: 'Appointment updated successfully' });
        }
    });
});

// Delete an appointment
app.delete('/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    const query = 'DELETE FROM appointments WHERE appointment_id = ?';
    db.query(query, [appointmentId], (err, result) => {
        if (err) {
            console.error('Error deleting appointment:', err);
            res.status(500).json({ message: 'Error deleting appointment' });
        } else {
            res.status(200).json({ message: 'Appointment deleted successfully' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


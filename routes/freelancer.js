const express = require('express');
const db = require('../db'); // Cambia a require

const router = express.Router();

// Obtener todos los freelancers
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Freelancers');
        res.json(result);
    } catch (error) {
        res.status(500).send('Error al obtener los freelancers');
    }
});

// Obtener un freelancer por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`SELECT * FROM Freelancers WHERE FreelancerID = ${id}`);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Freelancer no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el freelancer');
    }
});

// Agregar un nuevo freelancer
router.post('/', async (req, res) => {
    const { Nombre, Email, Telefono, Especialidad } = req.body;
    const query = `INSERT INTO Freelancers (Nombre, Email, Telefono, Especialidad) VALUES ('${Nombre}', '${Email}', '${Telefono}', '${Especialidad}')`;
    try {
        await db.query(query);
        res.status(201).send('Freelancer agregado');
    } catch (error) {
        res.status(500).send('Error al agregar el freelancer');
    }
});

// Actualizar un freelancer
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Telefono, Especialidad } = req.body;
    const query = `UPDATE Freelancers SET Nombre = '${Nombre}', Email = '${Email}', Telefono = '${Telefono}', Especialidad = '${Especialidad}' WHERE FreelancerID = ${id}`;
    try {
        await db.query(query);
        res.send('Freelancer actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el freelancer');
    }
});

// Eliminar un freelancer
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Freelancers WHERE FreelancerID = ${id}`;
    try {
        await db.query(query);
        res.send('Freelancer eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el freelancer');
    }
});

module.exports = router;

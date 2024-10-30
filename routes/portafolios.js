const express = require('express');
const db = require('../db'); // Cambia a require

const router = express.Router();

// Obtener todos los portafolios
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Portafolios');
        res.json(result);
    } catch (error) {
        res.status(500).send('Error al obtener los portafolios');
    }
});

// Obtener un portafolio por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`SELECT * FROM Portafolios WHERE PortafolioID = ${id}`);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Portafolio no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el portafolio');
    }
});

// Agregar un nuevo portafolio
router.post('/', async (req, res) => {
    const { FreelancerID, Descripcion, FechaCreacion } = req.body;
    const query = `INSERT INTO Portafolios (FreelancerID, Descripcion, FechaCreacion) VALUES (${FreelancerID}, '${Descripcion}', '${FechaCreacion}')`;
    try {
        await db.query(query);
        res.status(201).send('Portafolio agregado');
    } catch (error) {
        res.status(500).send('Error al agregar el portafolio');
    }
});

// Actualizar un portafolio
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { FreelancerID, Descripcion, FechaCreacion } = req.body;
    const query = `UPDATE Portafolios SET FreelancerID = ${FreelancerID}, Descripcion = '${Descripcion}', FechaCreacion = '${FechaCreacion}' WHERE PortafolioID = ${id}`;
    try {
        await db.query(query);
        res.send('Portafolio actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el portafolio');
    }
});

// Eliminar un portafolio
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Portafolios WHERE PortafolioID = ${id}`;
    try {
        await db.query(query);
        res.send('Portafolio eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el portafolio');
    }
});

module.exports = router;

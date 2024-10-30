const express = require('express');
const db = require('../db'); // Importar el módulo de base de datos actualizado

const router = express.Router();

// Obtener todos los contratos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Contratos');
        res.json(result);
    } catch (error) {
        console.error('Error al obtener los contratos:', error);
        res.status(500).send('Error al obtener los contratos');
    }
});

// Obtener un contrato por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`SELECT * FROM Contratos WHERE ContratoID = ${id}`);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Contrato no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el contrato:', error);
        res.status(500).send('Error al obtener el contrato');
    }
});

// Agregar un nuevo contrato
router.post('/', async (req, res) => {
    const { FreelancerID, ProyectoID, FechaInicio, FechaFin, Estado } = req.body;
    const query = `
        INSERT INTO Contratos (FreelancerID, ProyectoID, FechaInicio, FechaFin, Estado) 
        VALUES (${FreelancerID}, ${ProyectoID}, '${FechaInicio}', '${FechaFin}', '${Estado}')
    `;
    try {
        await db.query(query);
        res.status(201).send('Contrato agregado');
    } catch (error) {
        console.error('Error al agregar el contrato:', error);
        res.status(500).send('Error al agregar el contrato');
    }
});

// Actualizar un contrato
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { FreelancerID, ProyectoID, FechaInicio, FechaFin, Estado } = req.body;
    const query = `
        UPDATE Contratos 
        SET FreelancerID = ${FreelancerID}, ProyectoID = ${ProyectoID}, 
            FechaInicio = '${FechaInicio}', FechaFin = '${FechaFin}', Estado = '${Estado}' 
        WHERE ContratoID = ${id}
    `;
    try {
        await db.query(query);
        res.send('Contrato actualizado');
    } catch (error) {
        console.error('Error al actualizar el contrato:', error);
        res.status(500).send('Error al actualizar el contrato');
    }
});

// Eliminar un contrato
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Contratos WHERE ContratoID = ${id}`;
    try {
        await db.query(query);
        res.send('Contrato eliminado');
    } catch (error) {
        console.error('Error al eliminar el contrato:', error);
        res.status(500).send('Error al eliminar el contrato');
    }
});

module.exports = router;

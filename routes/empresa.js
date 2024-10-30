const express = require('express');
const db = require('../db'); // Importar el módulo de base de datos

const router = express.Router();

// Obtener todas las empresas
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Empresas');
        res.json(result);
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        res.status(500).send('Error al obtener las empresas');
    }
});

// Obtener una empresa por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`SELECT * FROM Empresas WHERE EmpresaID = ${id}`);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Empresa no encontrada');
        }
    } catch (error) {
        console.error('Error al obtener la empresa:', error);
        res.status(500).send('Error al obtener la empresa');
    }
});

// Agregar una nueva empresa
router.post('/', async (req, res) => {
    const { Nombre, Direccion, Telefono, Email } = req.body;
    const query = `
        INSERT INTO Empresas (Nombre, Direccion, Telefono, Email) 
        VALUES ('${Nombre}', '${Direccion}', '${Telefono}', '${Email}')
    `;
    try {
        await db.query(query);
        res.status(201).send('Empresa agregada');
    } catch (error) {
        console.error('Error al agregar la empresa:', error);
        res.status(500).send('Error al agregar la empresa');
    }
});

// Actualizar una empresa
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Direccion, Telefono, Email } = req.body;
    const query = `
        UPDATE Empresas 
        SET Nombre = '${Nombre}', Direccion = '${Direccion}', 
            Telefono = '${Telefono}', Email = '${Email}' 
        WHERE EmpresaID = ${id}
    `;
    try {
        await db.query(query);
        res.send('Empresa actualizada');
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        res.status(500).send('Error al actualizar la empresa');
    }
});

// Eliminar una empresa
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Empresas WHERE EmpresaID = ${id}`;
    try {
        await db.query(query);
        res.send('Empresa eliminada');
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        res.status(500).send('Error al eliminar la empresa');
    }
});

module.exports = router;

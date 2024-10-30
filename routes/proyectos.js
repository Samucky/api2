const express = require('express');
const db = require('../db'); // Cambia a require

const router = express.Router();

// Obtener todos los proyectos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Proyectos');
        res.json(result);
    } catch (error) {
        res.status(500).send('Error al obtener los proyectos');
    }
});

// Obtener un proyecto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`SELECT * FROM Proyectos WHERE ProyectoID = ${id}`);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Proyecto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el proyecto');
    }
});

// Agregar un nuevo proyecto
router.post('/', async (req, res) => {
    const { EmpresaID, NombreProyecto, Descripcion, FechaInicio, FechaFin, Estado } = req.body;
    const query = `INSERT INTO Proyectos (EmpresaID, NombreProyecto, Descripcion, FechaInicio, FechaFin, Estado) VALUES (${EmpresaID}, '${NombreProyecto}', '${Descripcion}', '${FechaInicio}', '${FechaFin}', '${Estado}')`;
    try {
        await db.query(query);
        res.status(201).send('Proyecto agregado');
    } catch (error) {
        res.status(500).send('Error al agregar el proyecto');
    }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { EmpresaID, NombreProyecto, Descripcion, FechaInicio, FechaFin, Estado } = req.body;
    const query = `UPDATE Proyectos SET EmpresaID = ${EmpresaID}, NombreProyecto = '${NombreProyecto}', Descripcion = '${Descripcion}', FechaInicio = '${FechaInicio}', FechaFin = '${FechaFin}', Estado = '${Estado}' WHERE ProyectoID = ${id}`;
    try {
        await db.query(query);
        res.send('Proyecto actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el proyecto');
    }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Proyectos WHERE ProyectoID = ${id}`;
    try {
        await db.query(query);
        res.send('Proyecto eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el proyecto');
    }
});

module.exports = router;

const sql = require('mssql');

// Configuración de la conexión
const config = {
    user: 'sqlserver',                // Tu nombre de usuario
    password: 'Freework1',            // Tu contraseña
    server: '34.123.132.46',          // La IP de tu servidor
    database: 'freework',             // Nombre de tu base de datos
    options: {
        encrypt: true,                // Usa `true` si estás en Azure
        trustServerCertificate: true  // Cambia según tu entorno (dev/producción)
    }
};

// Crear un pool de conexiones y manejar errores de conexión
let poolPromise = null;

const initializePool = async () => {
    if (!poolPromise) {
        try {
            poolPromise = new sql.ConnectionPool(config)
                .connect()
                .then(pool => {
                    console.log('Conexión a la base de datos establecida.');
                    return pool;
                });
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            throw error;
        }
    }
    return poolPromise;
};

// Función para realizar consultas
const query = async (queryText) => {
    try {
        const pool = await initializePool();
        const result = await pool.request().query(queryText);
        return result.recordset; // Devuelve el conjunto de registros
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        throw error;
    }
};

// Función para cerrar la conexión si se necesita
const closeConnection = async () => {
    if (poolPromise) {
        try {
            await poolPromise.close();
            poolPromise = null;
            console.log('Conexión a la base de datos cerrada.');
        } catch (error) {
            console.error('Error al cerrar la conexión:', error);
        }
    }
};

// Exportar las funciones y la instancia de sql
module.exports = {
    initializePool,
    closeConnection,
    query, // Exporta la función de consulta
    sql,
};

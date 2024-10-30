// index.js
const express = require('express');
const cors = require('cors');
const empresasRoutes = require('./routes/empresa.js');
const freelancersRoutes = require('./routes/freelancer.js');
const proyectosRoutes = require('./routes/proyectos.js');
const contratosRoutes = require('./routes/contratos.js');
const portafoliosRoutes = require('./routes/portafolios.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/empresas', empresasRoutes);
app.use('/api/freelancers', freelancersRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/contratos', contratosRoutes);
app.use('/api/portafolios', portafoliosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

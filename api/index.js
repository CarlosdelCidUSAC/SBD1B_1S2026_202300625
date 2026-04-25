require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`
};

// Prueba de conexión al iniciar
async function testConnection() {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    console.log('✅ Conexión exitosa a Oracle XE');
    await conn.close();
  } catch (err) {
    console.error('❌ Error al conectar a Oracle:', err.message);
  }
}

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'Oracle XE', timestamp: new Date().toISOString() });
});

// ============================================================
// MONTAJE DE RUTAS CRUD - 13 tablas
// ============================================================
app.use('/api/centros', require('./routes/centros'));
app.use('/api/escuelas', require('./routes/escuelasRoute'));
app.use('/api/licencias', require('./routes/licenciasRoute'));
app.use('/api/departamentos', require('./routes/departamentosRoute'));
app.use('/api/municipios', require('./routes/municipiosRoute'));
app.use('/api/ubicaciones', require('./routes/ubicacionesRoute'));
app.use('/api/registros', require('./routes/registrosRoute'));
app.use('/api/correlativos', require('./routes/correlativosRoute'));
app.use('/api/examenes', require('./routes/examenesRoute'));
app.use('/api/preguntas', require('./routes/preguntasRoute'));
app.use('/api/preguntas-practico', require('./routes/preguntasPracticoRoute'));
app.use('/api/respuestas-usuario', require('./routes/respuestasUsuarioRoute'));
app.use('/api/respuestas-practico', require('./routes/respuestasPracticoRoute'));

// ============================================================
// RUTAS DE CONSULTAS ESTADÍSTICAS
// ============================================================
app.use('/api/estadisticas', require('./routes/estadisticasRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  testConnection();
});

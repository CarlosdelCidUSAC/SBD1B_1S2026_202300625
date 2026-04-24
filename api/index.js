require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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

// Aquí montarás tus rutas más adelante
// app.use('/api/centros', require('./routes/centros'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  testConnection();
});
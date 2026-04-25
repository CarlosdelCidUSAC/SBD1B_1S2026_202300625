const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT m.id_municipio, m.departamento_id_departamento, m.nombre, m.codigo, d.nombre AS depto_nombre
       FROM MUNICIPIO m
       JOIN DEPARTAMENTO d ON m.departamento_id_departamento = d.id_departamento
       ORDER BY m.id_municipio`
    );
    res.json(result.rows.map(row => ({
      id_municipio: row[0],
      departamento_id_departamento: row[1],
      nombre: row[2],
      codigo: row[3],
      departamento_nombre: row[4]
    })));
  } catch (err) {
    console.error('Error al listar municipios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.getById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT m.id_municipio, m.departamento_id_departamento, m.nombre, m.codigo, d.nombre AS depto_nombre
       FROM MUNICIPIO m
       JOIN DEPARTAMENTO d ON m.departamento_id_departamento = d.id_departamento
       WHERE m.id_municipio = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }
    const row = result.rows[0];
    res.json({
      id_municipio: row[0],
      departamento_id_departamento: row[1],
      nombre: row[2],
      codigo: row[3],
      departamento_nombre: row[4]
    });
  } catch (err) {
    console.error('Error al obtener municipio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { departamento_id_departamento, nombre, codigo } = req.body;
    if (!departamento_id_departamento || !nombre || !codigo) {
      return res.status(400).json({ error: 'Los campos "departamento_id_departamento", "nombre" y "codigo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO MUNICIPIO (departamento_id_departamento, nombre, codigo)
       VALUES (:departamento_id_departamento, :nombre, :codigo)
       RETURNING id_municipio INTO :id`,
      {
        departamento_id_departamento,
        nombre,
        codigo,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_municipio: newId, departamento_id_departamento, nombre, codigo });
  } catch (err) {
    console.error('Error al crear municipio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { departamento_id_departamento, nombre, codigo } = req.body;
    if (!departamento_id_departamento || !nombre || !codigo) {
      return res.status(400).json({ error: 'Los campos "departamento_id_departamento", "nombre" y "codigo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE MUNICIPIO
       SET departamento_id_departamento = :departamento_id_departamento, nombre = :nombre, codigo = :codigo
       WHERE id_municipio = :id`,
      { departamento_id_departamento, nombre, codigo, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }
    res.json({ id_municipio: parseInt(id), departamento_id_departamento, nombre, codigo });
  } catch (err) {
    console.error('Error al actualizar municipio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.remove = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await getConnection();
    const result = await conn.execute(
      'DELETE FROM MUNICIPIO WHERE id_municipio = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }
    res.json({ mensaje: 'Municipio eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar municipio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

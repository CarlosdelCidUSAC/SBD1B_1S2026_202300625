const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      'SELECT id_departamento, nombre, codigo FROM DEPARTAMENTO ORDER BY id_departamento'
    );
    res.json(result.rows.map(row => ({
      id_departamento: row[0],
      nombre: row[1],
      codigo: row[2]
    })));
  } catch (err) {
    console.error('Error al listar departamentos:', err);
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
      'SELECT id_departamento, nombre, codigo FROM DEPARTAMENTO WHERE id_departamento = :id',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    const row = result.rows[0];
    res.json({ id_departamento: row[0], nombre: row[1], codigo: row[2] });
  } catch (err) {
    console.error('Error al obtener departamento:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { nombre, codigo } = req.body;
    if (!nombre || !codigo) {
      return res.status(400).json({ error: 'Los campos "nombre" y "codigo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'INSERT INTO DEPARTAMENTO (nombre, codigo) VALUES (:nombre, :codigo) RETURNING id_departamento INTO :id',
      { nombre, codigo, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_departamento: newId, nombre, codigo });
  } catch (err) {
    console.error('Error al crear departamento:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nombre, codigo } = req.body;
    if (!nombre || !codigo) {
      return res.status(400).json({ error: 'Los campos "nombre" y "codigo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'UPDATE DEPARTAMENTO SET nombre = :nombre, codigo = :codigo WHERE id_departamento = :id',
      { nombre, codigo, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json({ id_departamento: parseInt(id), nombre, codigo });
  } catch (err) {
    console.error('Error al actualizar departamento:', err);
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
      'DELETE FROM DEPARTAMENTO WHERE id_departamento = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json({ mensaje: 'Departamento eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar departamento:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      'SELECT no_aut, nombre, direccion, acuerdo FROM ESCUELA_AUTOMOV ORDER BY no_aut'
    );
    res.json(result.rows.map(row => ({
      no_aut: row[0],
      nombre: row[1],
      direccion: row[2],
      acuerdo: row[3]
    })));
  } catch (err) {
    console.error('Error al listar escuelas:', err);
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
      'SELECT no_aut, nombre, direccion, acuerdo FROM ESCUELA_AUTOMOV WHERE no_aut = :id',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    const row = result.rows[0];
    res.json({ no_aut: row[0], nombre: row[1], direccion: row[2], acuerdo: row[3] });
  } catch (err) {
    console.error('Error al obtener escuela:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { nombre, direccion, acuerdo } = req.body;
    if (!nombre || !direccion || !acuerdo) {
      return res.status(400).json({ error: 'Los campos "nombre", "direccion" y "acuerdo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'INSERT INTO ESCUELA_AUTOMOV (nombre, direccion, acuerdo) VALUES (:nombre, :direccion, :acuerdo) RETURNING no_aut INTO :id',
      { nombre, direccion, acuerdo, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ no_aut: newId, nombre, direccion, acuerdo });
  } catch (err) {
    console.error('Error al crear escuela:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nombre, direccion, acuerdo } = req.body;
    if (!nombre || !direccion || !acuerdo) {
      return res.status(400).json({ error: 'Los campos "nombre", "direccion" y "acuerdo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'UPDATE ESCUELA_AUTOMOV SET nombre = :nombre, direccion = :direccion, acuerdo = :acuerdo WHERE no_aut = :id',
      { nombre, direccion, acuerdo, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.json({ no_aut: parseInt(id), nombre, direccion, acuerdo });
  } catch (err) {
    console.error('Error al actualizar escuela:', err);
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
      'DELETE FROM ESCUELA_AUTOMOV WHERE no_aut = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.json({ mensaje: 'Escuela eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar escuela:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

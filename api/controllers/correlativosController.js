const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      'SELECT id_correlativo, fecha, no_examen FROM CORRELATIVO ORDER BY id_correlativo'
    );
    res.json(result.rows.map(row => ({
      id_correlativo: row[0],
      fecha: row[1],
      no_examen: row[2]
    })));
  } catch (err) {
    console.error('Error al listar correlativos:', err);
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
      'SELECT id_correlativo, fecha, no_examen FROM CORRELATIVO WHERE id_correlativo = :id',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Correlativo no encontrado' });
    }
    const row = result.rows[0];
    res.json({ id_correlativo: row[0], fecha: row[1], no_examen: row[2] });
  } catch (err) {
    console.error('Error al obtener correlativo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { fecha, no_examen } = req.body;
    if (!fecha || !no_examen) {
      return res.status(400).json({ error: 'Los campos "fecha" y "no_examen" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'INSERT INTO CORRELATIVO (fecha, no_examen) VALUES (TO_DATE(:fecha, \'YYYY-MM-DD\'), :no_examen) RETURNING id_correlativo INTO :id',
      { fecha, no_examen, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_correlativo: newId, fecha, no_examen });
  } catch (err) {
    console.error('Error al crear correlativo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { fecha, no_examen } = req.body;
    if (!fecha || !no_examen) {
      return res.status(400).json({ error: 'Los campos "fecha" y "no_examen" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'UPDATE CORRELATIVO SET fecha = TO_DATE(:fecha, \'YYYY-MM-DD\'), no_examen = :no_examen WHERE id_correlativo = :id',
      { fecha, no_examen, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Correlativo no encontrado' });
    }
    res.json({ id_correlativo: parseInt(id), fecha, no_examen });
  } catch (err) {
    console.error('Error al actualizar correlativo:', err);
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
      'DELETE FROM CORRELATIVO WHERE id_correlativo = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Correlativo no encontrado' });
    }
    res.json({ mensaje: 'Correlativo eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar correlativo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

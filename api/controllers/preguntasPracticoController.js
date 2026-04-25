const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      'SELECT id_pregunta_practico, pregunta_texto, punteo FROM PREGUNTA_PRACTICO ORDER BY id_pregunta_practico'
    );
    res.json(result.rows.map(row => ({
      id_pregunta_practico: row[0],
      pregunta_texto: row[1],
      punteo: row[2]
    })));
  } catch (err) {
    console.error('Error al listar preguntas prácticas:', err);
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
      'SELECT id_pregunta_practico, pregunta_texto, punteo FROM PREGUNTA_PRACTICO WHERE id_pregunta_practico = :id',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pregunta práctica no encontrada' });
    }
    const row = result.rows[0];
    res.json({ id_pregunta_practico: row[0], pregunta_texto: row[1], punteo: row[2] });
  } catch (err) {
    console.error('Error al obtener pregunta práctica:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { pregunta_texto, punteo } = req.body;
    if (!pregunta_texto || punteo === undefined) {
      return res.status(400).json({ error: 'Los campos "pregunta_texto" y "punteo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'INSERT INTO PREGUNTA_PRACTICO (pregunta_texto, punteo) VALUES (:pregunta_texto, :punteo) RETURNING id_pregunta_practico INTO :id',
      { pregunta_texto, punteo, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_pregunta_practico: newId, pregunta_texto, punteo });
  } catch (err) {
    console.error('Error al crear pregunta práctica:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { pregunta_texto, punteo } = req.body;
    if (!pregunta_texto || punteo === undefined) {
      return res.status(400).json({ error: 'Los campos "pregunta_texto" y "punteo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'UPDATE PREGUNTA_PRACTICO SET pregunta_texto = :pregunta_texto, punteo = :punteo WHERE id_pregunta_practico = :id',
      { pregunta_texto, punteo, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Pregunta práctica no encontrada' });
    }
    res.json({ id_pregunta_practico: parseInt(id), pregunta_texto, punteo });
  } catch (err) {
    console.error('Error al actualizar pregunta práctica:', err);
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
      'DELETE FROM PREGUNTA_PRACTICO WHERE id_pregunta_practico = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Pregunta práctica no encontrada' });
    }
    res.json({ mensaje: 'Pregunta práctica eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar pregunta práctica:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

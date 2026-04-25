const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT id_pregunta, pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta
       FROM PREGUNTA ORDER BY id_pregunta`
    );
    res.json(result.rows.map(row => ({
      id_pregunta: row[0],
      pregunta_texto: row[1],
      respuesta_a: row[2],
      respuesta_b: row[3],
      respuesta_c: row[4],
      respuesta_d: row[5],
      respuesta_correcta: row[6]
    })));
  } catch (err) {
    console.error('Error al listar preguntas:', err);
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
      `SELECT id_pregunta, pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta
       FROM PREGUNTA WHERE id_pregunta = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }
    const row = result.rows[0];
    res.json({
      id_pregunta: row[0],
      pregunta_texto: row[1],
      respuesta_a: row[2],
      respuesta_b: row[3],
      respuesta_c: row[4],
      respuesta_d: row[5],
      respuesta_correcta: row[6]
    });
  } catch (err) {
    console.error('Error al obtener pregunta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta } = req.body;
    if (!pregunta_texto || !respuesta_a || !respuesta_b || !respuesta_c || !respuesta_correcta) {
      return res.status(400).json({ error: 'Los campos "pregunta_texto", "respuesta_a", "respuesta_b", "respuesta_c" y "respuesta_correcta" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO PREGUNTA (pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta)
       VALUES (:pregunta_texto, :respuesta_a, :respuesta_b, :respuesta_c, :respuesta_d, :respuesta_correcta)
       RETURNING id_pregunta INTO :id`,
      { pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_pregunta: newId, pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta });
  } catch (err) {
    console.error('Error al crear pregunta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta } = req.body;
    if (!pregunta_texto || !respuesta_a || !respuesta_b || !respuesta_c || !respuesta_correcta) {
      return res.status(400).json({ error: 'Los campos "pregunta_texto", "respuesta_a", "respuesta_b", "respuesta_c" y "respuesta_correcta" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE PREGUNTA SET pregunta_texto = :pregunta_texto, respuesta_a = :respuesta_a,
        respuesta_b = :respuesta_b, respuesta_c = :respuesta_c, respuesta_d = :respuesta_d,
        respuesta_correcta = :respuesta_correcta
       WHERE id_pregunta = :id`,
      { pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }
    res.json({ id_pregunta: parseInt(id), pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta });
  } catch (err) {
    console.error('Error al actualizar pregunta:', err);
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
      'DELETE FROM PREGUNTA WHERE id_pregunta = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }
    res.json({ mensaje: 'Pregunta eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar pregunta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

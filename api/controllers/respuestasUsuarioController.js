const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT ru.id_respuesta_usuario, ru.pregunta_id_pregunta, ru.examen_id_examen, ru.respuesta,
              p.pregunta_texto
       FROM RESPUESTA_USUARIO ru
       JOIN PREGUNTA p ON ru.pregunta_id_pregunta = p.id_pregunta
       ORDER BY ru.id_respuesta_usuario`
    );
    res.json(result.rows.map(row => ({
      id_respuesta_usuario: row[0],
      pregunta_id_pregunta: row[1],
      examen_id_examen: row[2],
      respuesta: row[3],
      pregunta_texto: row[4]
    })));
  } catch (err) {
    console.error('Error al listar respuestas:', err);
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
      `SELECT ru.id_respuesta_usuario, ru.pregunta_id_pregunta, ru.examen_id_examen, ru.respuesta,
              p.pregunta_texto
       FROM RESPUESTA_USUARIO ru
       JOIN PREGUNTA p ON ru.pregunta_id_pregunta = p.id_pregunta
       WHERE ru.id_respuesta_usuario = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    const row = result.rows[0];
    res.json({
      id_respuesta_usuario: row[0],
      pregunta_id_pregunta: row[1],
      examen_id_examen: row[2],
      respuesta: row[3],
      pregunta_texto: row[4]
    });
  } catch (err) {
    console.error('Error al obtener respuesta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { pregunta_id_pregunta, examen_id_examen, respuesta } = req.body;
    if (!pregunta_id_pregunta || !examen_id_examen || !respuesta) {
      return res.status(400).json({ error: 'Los campos "pregunta_id_pregunta", "examen_id_examen" y "respuesta" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta)
       VALUES (:pregunta_id_pregunta, :examen_id_examen, :respuesta)
       RETURNING id_respuesta_usuario INTO :id`,
      {
        pregunta_id_pregunta, examen_id_examen, respuesta,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_respuesta_usuario: newId, pregunta_id_pregunta, examen_id_examen, respuesta });
  } catch (err) {
    console.error('Error al crear respuesta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { pregunta_id_pregunta, examen_id_examen, respuesta } = req.body;
    if (!pregunta_id_pregunta || !examen_id_examen || !respuesta) {
      return res.status(400).json({ error: 'Los campos "pregunta_id_pregunta", "examen_id_examen" y "respuesta" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE RESPUESTA_USUARIO
       SET pregunta_id_pregunta = :pregunta_id_pregunta,
           examen_id_examen = :examen_id_examen,
           respuesta = :respuesta
       WHERE id_respuesta_usuario = :id`,
      { pregunta_id_pregunta, examen_id_examen, respuesta, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    res.json({ id_respuesta_usuario: parseInt(id), pregunta_id_pregunta, examen_id_examen, respuesta });
  } catch (err) {
    console.error('Error al actualizar respuesta:', err);
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
      'DELETE FROM RESPUESTA_USUARIO WHERE id_respuesta_usuario = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    res.json({ mensaje: 'Respuesta eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar respuesta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT rp.id_respuesta_practico, rp.pregunta_practico_id_pregunta_practico,
              rp.examen_id_examen, rp.nota, pp.pregunta_texto
       FROM RESPUESTA_PRACTICO_USUARIO rp
       JOIN PREGUNTA_PRACTICO pp ON rp.pregunta_practico_id_pregunta_practico = pp.id_pregunta_practico
       ORDER BY rp.id_respuesta_practico`
    );
    res.json(result.rows.map(row => ({
      id_respuesta_practico: row[0],
      pregunta_practico_id_pregunta_practico: row[1],
      examen_id_examen: row[2],
      nota: row[3],
      pregunta_texto: row[4]
    })));
  } catch (err) {
    console.error('Error al listar respuestas prácticas:', err);
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
      `SELECT rp.id_respuesta_practico, rp.pregunta_practico_id_pregunta_practico,
              rp.examen_id_examen, rp.nota, pp.pregunta_texto
       FROM RESPUESTA_PRACTICO_USUARIO rp
       JOIN PREGUNTA_PRACTICO pp ON rp.pregunta_practico_id_pregunta_practico = pp.id_pregunta_practico
       WHERE rp.id_respuesta_practico = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Respuesta práctica no encontrada' });
    }
    const row = result.rows[0];
    res.json({
      id_respuesta_practico: row[0],
      pregunta_practico_id_pregunta_practico: row[1],
      examen_id_examen: row[2],
      nota: row[3],
      pregunta_texto: row[4]
    });
  } catch (err) {
    console.error('Error al obtener respuesta práctica:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { pregunta_practico_id_pregunta_practico, examen_id_examen, nota } = req.body;
    if (!pregunta_practico_id_pregunta_practico || !examen_id_examen || nota === undefined) {
      return res.status(400).json({ error: 'Los campos "pregunta_practico_id_pregunta_practico", "examen_id_examen" y "nota" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO RESPUESTA_PRACTICO_USUARIO (pregunta_practico_id_pregunta_practico, examen_id_examen, nota)
       VALUES (:pregunta_practico_id_pregunta_practico, :examen_id_examen, :nota)
       RETURNING id_respuesta_practico INTO :id`,
      {
        pregunta_practico_id_pregunta_practico,
        examen_id_examen,
        nota,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({ id_respuesta_practico: newId, pregunta_practico_id_pregunta_practico, examen_id_examen, nota });
  } catch (err) {
    console.error('Error al crear respuesta práctica:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { pregunta_practico_id_pregunta_practico, examen_id_examen, nota } = req.body;
    if (!pregunta_practico_id_pregunta_practico || !examen_id_examen || nota === undefined) {
      return res.status(400).json({ error: 'Los campos "pregunta_practico_id_pregunta_practico", "examen_id_examen" y "nota" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE RESPUESTA_PRACTICO_USUARIO
       SET pregunta_practico_id_pregunta_practico = :pregunta_practico_id_pregunta_practico,
           examen_id_examen = :examen_id_examen,
           nota = :nota
       WHERE id_respuesta_practico = :id`,
      { pregunta_practico_id_pregunta_practico, examen_id_examen, nota, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Respuesta práctica no encontrada' });
    }
    res.json({ id_respuesta_practico: parseInt(id), pregunta_practico_id_pregunta_practico, examen_id_examen, nota });
  } catch (err) {
    console.error('Error al actualizar respuesta práctica:', err);
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
      'DELETE FROM RESPUESTA_PRACTICO_USUARIO WHERE id_respuesta_practico = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Respuesta práctica no encontrada' });
    }
    res.json({ mensaje: 'Respuesta práctica eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar respuesta práctica:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

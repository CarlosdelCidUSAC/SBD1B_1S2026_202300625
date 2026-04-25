const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT id_examen, registro_id_registro, correlativo_id_correlativo,
              registro_id_escuela, registro_id_centro,
              registro_municipio_id_municipio, registro_municipio_departamento_id_departamento
       FROM EXAMEN ORDER BY id_examen`
    );
    res.json(result.rows.map(row => ({
      id_examen: row[0],
      registro_id_registro: row[1],
      correlativo_id_correlativo: row[2],
      registro_id_escuela: row[3],
      registro_id_centro: row[4],
      registro_municipio_id_municipio: row[5],
      registro_municipio_departamento_id_departamento: row[6]
    })));
  } catch (err) {
    console.error('Error al listar exámenes:', err);
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
      `SELECT id_examen, registro_id_registro, correlativo_id_correlativo,
              registro_id_escuela, registro_id_centro,
              registro_municipio_id_municipio, registro_municipio_departamento_id_departamento
       FROM EXAMEN WHERE id_examen = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Examen no encontrado' });
    }
    const row = result.rows[0];
    res.json({
      id_examen: row[0],
      registro_id_registro: row[1],
      correlativo_id_correlativo: row[2],
      registro_id_escuela: row[3],
      registro_id_centro: row[4],
      registro_municipio_id_municipio: row[5],
      registro_municipio_departamento_id_departamento: row[6]
    });
  } catch (err) {
    console.error('Error al obtener examen:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const {
      registro_id_registro, correlativo_id_correlativo,
      registro_id_escuela, registro_id_centro,
      registro_municipio_id_municipio, registro_municipio_departamento_id_departamento
    } = req.body;
    if (!registro_id_registro || !correlativo_id_correlativo) {
      return res.status(400).json({ error: 'Los campos "registro_id_registro" y "correlativo_id_correlativo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO EXAMEN (registro_id_registro, correlativo_id_correlativo,
        registro_id_escuela, registro_id_centro,
        registro_municipio_id_municipio, registro_municipio_departamento_id_departamento)
       VALUES (:registro_id_registro, :correlativo_id_correlativo,
        :registro_id_escuela, :registro_id_centro,
        :registro_municipio_id_municipio, :registro_municipio_departamento_id_departamento)
       RETURNING id_examen INTO :id`,
      {
        registro_id_registro, correlativo_id_correlativo,
        registro_id_escuela, registro_id_centro,
        registro_municipio_id_municipio, registro_municipio_departamento_id_departamento,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({
      id_examen: newId,
      registro_id_registro, correlativo_id_correlativo,
      registro_id_escuela, registro_id_centro,
      registro_municipio_id_municipio, registro_municipio_departamento_id_departamento
    });
  } catch (err) {
    console.error('Error al crear examen:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const {
      registro_id_registro, correlativo_id_correlativo,
      registro_id_escuela, registro_id_centro,
      registro_municipio_id_municipio, registro_municipio_departamento_id_departamento
    } = req.body;
    if (!registro_id_registro || !correlativo_id_correlativo) {
      return res.status(400).json({ error: 'Los campos "registro_id_registro" y "correlativo_id_correlativo" son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE EXAMEN SET
        registro_id_registro = :registro_id_registro,
        correlativo_id_correlativo = :correlativo_id_correlativo,
        registro_id_escuela = :registro_id_escuela,
        registro_id_centro = :registro_id_centro,
        registro_municipio_id_municipio = :registro_municipio_id_municipio,
        registro_municipio_departamento_id_departamento = :registro_municipio_departamento_id_departamento
       WHERE id_examen = :id`,
      {
        registro_id_registro, correlativo_id_correlativo,
        registro_id_escuela, registro_id_centro,
        registro_municipio_id_municipio, registro_municipio_departamento_id_departamento,
        id
      },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Examen no encontrado' });
    }
    res.json({
      id_examen: parseInt(id),
      registro_id_registro, correlativo_id_correlativo,
      registro_id_escuela, registro_id_centro,
      registro_municipio_id_municipio, registro_municipio_departamento_id_departamento
    });
  } catch (err) {
    console.error('Error al actualizar examen:', err);
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
      'DELETE FROM EXAMEN WHERE id_examen = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Examen no encontrado' });
    }
    res.json({ mensaje: 'Examen eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar examen:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

const oracledb = require('oracledb');
const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT r.id_registro, r.ubicacion_escuela_id_escuela, r.ubicacion_centro_id_centro,
              r.municipio_id_municipio, r.municipio_departamento_id_departamento,
              r.fecha, r.tipo_tramite, r.tipo_licencia, r.nombre_completo, r.genero
       FROM REGISTRO r
       ORDER BY r.id_registro`
    );
    res.json(result.rows.map(row => ({
      id_registro: row[0],
      ubicacion_escuela_id_escuela: row[1],
      ubicacion_centro_id_centro: row[2],
      municipio_id_municipio: row[3],
      municipio_departamento_id_departamento: row[4],
      fecha: row[5],
      tipo_tramite: row[6],
      tipo_licencia: row[7],
      nombre_completo: row[8],
      genero: row[9]
    })));
  } catch (err) {
    console.error('Error al listar registros:', err);
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
      `SELECT r.id_registro, r.ubicacion_escuela_id_escuela, r.ubicacion_centro_id_centro,
              r.municipio_id_municipio, r.municipio_departamento_id_departamento,
              r.fecha, r.tipo_tramite, r.tipo_licencia, r.nombre_completo, r.genero
       FROM REGISTRO r
       WHERE r.id_registro = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    const row = result.rows[0];
    res.json({
      id_registro: row[0],
      ubicacion_escuela_id_escuela: row[1],
      ubicacion_centro_id_centro: row[2],
      municipio_id_municipio: row[3],
      municipio_departamento_id_departamento: row[4],
      fecha: row[5],
      tipo_tramite: row[6],
      tipo_licencia: row[7],
      nombre_completo: row[8],
      genero: row[9]
    });
  } catch (err) {
    console.error('Error al obtener registro:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const {
      ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
      municipio_id_municipio, municipio_departamento_id_departamento,
      fecha, tipo_tramite, tipo_licencia, nombre_completo, genero
    } = req.body;
    if (!ubicacion_escuela_id_escuela || !ubicacion_centro_id_centro ||
        !municipio_id_municipio || !municipio_departamento_id_departamento ||
        !fecha || !tipo_tramite || !tipo_licencia || !nombre_completo || !genero) {
      return res.status(400).json({ error: 'Todos los campos del registro son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO REGISTRO (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
        municipio_id_municipio, municipio_departamento_id_departamento,
        fecha, tipo_tramite, tipo_licencia, nombre_completo, genero)
       VALUES (:ubicacion_escuela_id_escuela, :ubicacion_centro_id_centro,
        :municipio_id_municipio, :municipio_departamento_id_departamento,
        TO_DATE(:fecha, 'YYYY-MM-DD'), :tipo_tramite, :tipo_licencia, :nombre_completo, :genero)
       RETURNING id_registro INTO :id`,
      {
        ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
        municipio_id_municipio, municipio_departamento_id_departamento,
        fecha, tipo_tramite, tipo_licencia, nombre_completo, genero,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );
    const newId = result.outBinds.id[0];
    res.status(201).json({
      id_registro: newId,
      ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
      municipio_id_municipio, municipio_departamento_id_departamento,
      fecha, tipo_tramite, tipo_licencia, nombre_completo, genero
    });
  } catch (err) {
    console.error('Error al crear registro:', err);
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
      ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
      municipio_id_municipio, municipio_departamento_id_departamento,
      fecha, tipo_tramite, tipo_licencia, nombre_completo, genero
    } = req.body;
    if (!ubicacion_escuela_id_escuela || !ubicacion_centro_id_centro ||
        !municipio_id_municipio || !municipio_departamento_id_departamento ||
        !fecha || !tipo_tramite || !tipo_licencia || !nombre_completo || !genero) {
      return res.status(400).json({ error: 'Todos los campos del registro son obligatorios' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE REGISTRO SET
        ubicacion_escuela_id_escuela = :ubicacion_escuela_id_escuela,
        ubicacion_centro_id_centro = :ubicacion_centro_id_centro,
        municipio_id_municipio = :municipio_id_municipio,
        municipio_departamento_id_departamento = :municipio_departamento_id_departamento,
        fecha = TO_DATE(:fecha, 'YYYY-MM-DD'),
        tipo_tramite = :tipo_tramite,
        tipo_licencia = :tipo_licencia,
        nombre_completo = :nombre_completo,
        genero = :genero
       WHERE id_registro = :id`,
      {
        ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
        municipio_id_municipio, municipio_departamento_id_departamento,
        fecha, tipo_tramite, tipo_licencia, nombre_completo, genero,
        id
      },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json({
      id_registro: parseInt(id),
      ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
      municipio_id_municipio, municipio_departamento_id_departamento,
      fecha, tipo_tramite, tipo_licencia, nombre_completo, genero
    });
  } catch (err) {
    console.error('Error al actualizar registro:', err);
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
      'DELETE FROM REGISTRO WHERE id_registro = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar registro:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

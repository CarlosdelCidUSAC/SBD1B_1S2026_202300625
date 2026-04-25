const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT u.escuela_id_escuela, u.centro_id_centro,
              e.nombre AS escuela_nombre, c.nombre AS centro_nombre
       FROM UBICACION u
       JOIN ESCUELA_AUTOMOV e ON u.escuela_id_escuela = e.no_aut
       JOIN CENTRO_EVAL c ON u.centro_id_centro = c.no_centro
       ORDER BY u.escuela_id_escuela, u.centro_id_centro`
    );
    res.json(result.rows.map(row => ({
      escuela_id_escuela: row[0],
      centro_id_centro: row[1],
      escuela_nombre: row[2],
      centro_nombre: row[3]
    })));
  } catch (err) {
    console.error('Error al listar ubicaciones:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.getById = async (req, res) => {
  let conn;
  try {
    const { escuelaId, centroId } = req.params;
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT u.escuela_id_escuela, u.centro_id_centro,
              e.nombre AS escuela_nombre, c.nombre AS centro_nombre
       FROM UBICACION u
       JOIN ESCUELA_AUTOMOV e ON u.escuela_id_escuela = e.no_aut
       JOIN CENTRO_EVAL c ON u.centro_id_centro = c.no_centro
       WHERE u.escuela_id_escuela = :escuelaId AND u.centro_id_centro = :centroId`,
      { escuelaId, centroId }
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    const row = result.rows[0];
    res.json({
      escuela_id_escuela: row[0],
      centro_id_centro: row[1],
      escuela_nombre: row[2],
      centro_nombre: row[3]
    });
  } catch (err) {
    console.error('Error al obtener ubicación:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { escuela_id_escuela, centro_id_centro } = req.body;
    if (!escuela_id_escuela || !centro_id_centro) {
      return res.status(400).json({ error: 'Los campos "escuela_id_escuela" y "centro_id_centro" son obligatorios' });
    }
    conn = await getConnection();
    await conn.execute(
      'INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (:escuela_id_escuela, :centro_id_centro)',
      { escuela_id_escuela, centro_id_centro },
      { autoCommit: true }
    );
    res.status(201).json({ escuela_id_escuela, centro_id_centro });
  } catch (err) {
    console.error('Error al crear ubicación:', err);
    if (err.errorNum === 1) {
      return res.status(409).json({ error: 'La ubicación ya existe o viola una restricción de PK' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { escuelaId, centroId } = req.params;
    const { escuela_id_escuela, centro_id_centro } = req.body;
    if (!escuela_id_escuela || !centro_id_centro) {
      return res.status(400).json({ error: 'Los campos "escuela_id_escuela" y "centro_id_centro" son obligatorios' });
    }
    conn = await getConnection();
    // Eliminar la ubicación antigua e insertar la nueva
    const delResult = await conn.execute(
      'DELETE FROM UBICACION WHERE escuela_id_escuela = :escuelaId AND centro_id_centro = :centroId',
      { escuelaId, centroId },
      { autoCommit: false }
    );
    if (delResult.rowsAffected === 0) {
      await conn.rollback();
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    await conn.execute(
      'INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (:escuela_id_escuela, :centro_id_centro)',
      { escuela_id_escuela, centro_id_centro },
      { autoCommit: true }
    );
    res.json({ escuela_id_escuela, centro_id_centro });
  } catch (err) {
    console.error('Error al actualizar ubicación:', err);
    if (conn) await conn.rollback();
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.remove = async (req, res) => {
  let conn;
  try {
    const { escuelaId, centroId } = req.params;
    conn = await getConnection();
    const result = await conn.execute(
      'DELETE FROM UBICACION WHERE escuela_id_escuela = :escuelaId AND centro_id_centro = :centroId',
      { escuelaId, centroId },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.json({ mensaje: 'Ubicación eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar ubicación:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

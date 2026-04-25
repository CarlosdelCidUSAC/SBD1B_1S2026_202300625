const { getConnection } = require('../db');

exports.getAll = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      'SELECT codigo, descripcion FROM LICENCIA ORDER BY codigo'
    );
    res.json(result.rows.map(row => ({ codigo: row[0], descripcion: row[1] })));
  } catch (err) {
    console.error('Error al listar licencias:', err);
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
      'SELECT codigo, descripcion FROM LICENCIA WHERE codigo = :id',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Licencia no encontrada' });
    }
    const row = result.rows[0];
    res.json({ codigo: row[0], descripcion: row[1] });
  } catch (err) {
    console.error('Error al obtener licencia:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.create = async (req, res) => {
  let conn;
  try {
    const { codigo, descripcion } = req.body;
    if (!codigo || !descripcion) {
      return res.status(400).json({ error: 'Los campos "codigo" y "descripcion" son obligatorios' });
    }
    if (codigo.length !== 1) {
      return res.status(400).json({ error: 'El campo "codigo" debe ser un solo carácter' });
    }
    conn = await getConnection();
    await conn.execute(
      'INSERT INTO LICENCIA (codigo, descripcion) VALUES (:codigo, :descripcion)',
      { codigo, descripcion },
      { autoCommit: true }
    );
    res.status(201).json({ codigo, descripcion });
  } catch (err) {
    console.error('Error al crear licencia:', err);
    if (err.errorNum === 1) {
      return res.status(409).json({ error: 'Ya existe una licencia con ese código' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

exports.update = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    if (!descripcion) {
      return res.status(400).json({ error: 'El campo "descripcion" es obligatorio' });
    }
    conn = await getConnection();
    const result = await conn.execute(
      'UPDATE LICENCIA SET descripcion = :descripcion WHERE codigo = :id',
      { descripcion, id },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Licencia no encontrada' });
    }
    res.json({ codigo: id, descripcion });
  } catch (err) {
    console.error('Error al actualizar licencia:', err);
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
      'DELETE FROM LICENCIA WHERE codigo = :id',
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Licencia no encontrada' });
    }
    res.json({ mensaje: 'Licencia eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar licencia:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) await conn.close();
  }
};

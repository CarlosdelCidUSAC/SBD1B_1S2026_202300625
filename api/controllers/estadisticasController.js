const { getConnection } = require('../db');

// ================================================================
// Consulta 1 — Estadísticas de evaluaciones por centro y escuela
// Salida: nombre_centro, nombre_escuela, total_examenes,
//         promedio_teorico, promedio_practico, aprobados
// ================================================================
exports.estadisticasPorCentroYEscuela = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(`
      WITH exam_stats AS (
        SELECT
          ex.id_examen,
          ex.registro_id_centro,
          ex.registro_id_escuela,
          ROUND(
            COALESCE(
              SUM(CASE WHEN ru.respuesta = p.respuesta_correcta THEN 1 ELSE 0 END) * 100.0 /
              NULLIF(COUNT(ru.id_respuesta_usuario), 0),
              0
            ), 2
          ) AS teorico_pct,
          ROUND(AVG(rp.nota), 2) AS practico_prom
        FROM EXAMEN ex
        LEFT JOIN RESPUESTA_USUARIO ru ON ru.examen_id_examen = ex.id_examen
        LEFT JOIN PREGUNTA p ON ru.pregunta_id_pregunta = p.id_pregunta
        LEFT JOIN RESPUESTA_PRACTICO_USUARIO rp ON rp.examen_id_examen = ex.id_examen
        GROUP BY ex.id_examen, ex.registro_id_centro, ex.registro_id_escuela
      )
      SELECT
        c.nombre AS nombre_centro,
        e.nombre AS nombre_escuela,
        COUNT(es.id_examen) AS total_examenes,
        ROUND(AVG(es.teorico_pct), 2) AS promedio_teorico,
        COALESCE(ROUND(AVG(es.practico_prom), 2), 0) AS promedio_practico,
        COUNT(CASE WHEN es.teorico_pct >= 70 AND es.practico_prom IS NOT NULL THEN 1 ELSE NULL END) AS aprobados
      FROM CENTRO_EVAL c
      JOIN UBICACION u ON c.no_centro = u.centro_id_centro
      JOIN ESCUELA_AUTOMOV e ON u.escuela_id_escuela = e.no_aut
      LEFT JOIN exam_stats es ON es.registro_id_centro = c.no_centro
                             AND es.registro_id_escuela = e.no_aut
      GROUP BY c.nombre, e.nombre
      ORDER BY c.nombre, e.nombre
    `);
    res.json(result.rows.map(row => ({
      nombre_centro: row[0],
      nombre_escuela: row[1],
      total_examenes: row[2],
      promedio_teorico: row[3],
      promedio_practico: row[4],
      aprobados: row[5]
    })));
  } catch (err) {
    console.error('Error en consulta 1:', err);
    res.status(500).json({ error: 'Error al obtener estadísticas por centro y escuela' });
  } finally {
    if (conn) await conn.close();
  }
};

// ================================================================
// Consulta 2 — Ranking de evaluados por resultado final
// Salida: ranking, nombre_completo, punteo_total, resultado
// ================================================================
exports.rankingEvaluados = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(`
      SELECT
        ROW_NUMBER() OVER (ORDER BY (
          COALESCE(SUM(CASE WHEN ru.respuesta = p.respuesta_correcta THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT ru.pregunta_id_pregunta), 0), 0) +
          COALESCE(SUM(rp.nota), 0)
        ) DESC) AS ranking,
        reg.nombre_completo,
        ROUND(
          COALESCE(SUM(CASE WHEN ru.respuesta = p.respuesta_correcta THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT ru.pregunta_id_pregunta), 0), 0) +
          COALESCE(SUM(rp.nota), 0),
        2) AS punteo_total,
        CASE
          WHEN (COALESCE(SUM(CASE WHEN ru.respuesta = p.respuesta_correcta THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT ru.pregunta_id_pregunta), 0), 0) +
                COALESCE(SUM(rp.nota), 0)) >= 70 THEN 'APROBADO'
          ELSE 'REPROBADO'
        END AS resultado
      FROM REGISTRO reg
      JOIN EXAMEN ex ON ex.registro_id_registro = reg.id_registro
      LEFT JOIN RESPUESTA_USUARIO ru ON ru.examen_id_examen = ex.id_examen
      LEFT JOIN PREGUNTA p ON ru.pregunta_id_pregunta = p.id_pregunta
      LEFT JOIN RESPUESTA_PRACTICO_USUARIO rp ON rp.examen_id_examen = ex.id_examen
      GROUP BY reg.id_registro, reg.nombre_completo
      ORDER BY ranking
    `);
    res.json(result.rows.map(row => ({
      ranking: row[0],
      nombre_completo: row[1],
      punteo_total: row[2],
      resultado: row[3]
    })));
  } catch (err) {
    console.error('Error en consulta 2:', err);
    res.status(500).json({ error: 'Error al obtener ranking de evaluados' });
  } finally {
    if (conn) await conn.close();
  }
};

// ================================================================
// Consulta 3 — Pregunta del examen teórico con menor aciertos
// Salida: id_pregunta, pregunta_texto, total_respuestas,
//         respuestas_correctas, porcentaje_aciertos
// ================================================================
exports.preguntaMenorAciertos = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(`
      WITH pregunta_stats AS (
        SELECT
          p.id_pregunta,
          p.pregunta_texto,
          COUNT(ru.id_respuesta_usuario) AS total_respuestas,
          SUM(CASE WHEN ru.respuesta = p.respuesta_correcta THEN 1 ELSE 0 END) AS respuestas_correctas,
          ROUND(
            SUM(CASE WHEN ru.respuesta = p.respuesta_correcta THEN 1 ELSE 0 END) * 100.0 /
            NULLIF(COUNT(ru.id_respuesta_usuario), 0),
          2) AS porcentaje_aciertos
        FROM PREGUNTA p
        LEFT JOIN RESPUESTA_USUARIO ru ON ru.pregunta_id_pregunta = p.id_pregunta
        GROUP BY p.id_pregunta, p.pregunta_texto
        HAVING COUNT(ru.id_respuesta_usuario) > 0
      )
      SELECT id_pregunta, pregunta_texto, total_respuestas, respuestas_correctas, porcentaje_aciertos
      FROM pregunta_stats
      WHERE porcentaje_aciertos = (SELECT MIN(porcentaje_aciertos) FROM pregunta_stats)
      ORDER BY id_pregunta
    `);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No hay preguntas con respuestas registradas' });
    }
    res.json(result.rows.map(row => ({
      id_pregunta: row[0],
      pregunta_texto: row[1],
      total_respuestas: row[2],
      respuestas_correctas: row[3],
      porcentaje_aciertos: row[4]
    })));
  } catch (err) {
    console.error('Error en consulta 3:', err);
    res.status(500).json({ error: 'Error al obtener pregunta con menor aciertos' });
  } finally {
    if (conn) await conn.close();
  }
};

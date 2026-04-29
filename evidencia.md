==========================================
  Pruebas de API con cURL
  Proyecto SBD1 - Centros de Evaluación
==========================================

------------------------------------------
 1. HEALTH CHECK
------------------------------------------

>>> GET /health - Verificar estado de la API
{
    "status": "OK",
    "database": "Oracle XE",
    "timestamp": "2026-04-29T23:03:52.918Z"
}


==========================================
 2. CRUD - CENTROS DE EVALUACIÓN
==========================================

>>> GET /api/centros - Listar todos los centros
[
    {
        "no_centro": 1,
        "nombre": "Centro Actualizado"
    },
    {
        "no_centro": 2,
        "nombre": "Centro de Evaluaci\u00f3n Antigua Guatemala"
    },
    {
        "no_centro": 3,
        "nombre": "Centro de Evaluaci\u00f3n Escuintla"
    },
    {
        "no_centro": 21,
        "nombre": "Centro de Prueba Norte"
    },
    {
        "no_centro": 22,
        "nombre": "Centro de Prueba Norte"
    }
]


>>> GET /api/centros/1 - Obtener centro por ID
{
    "no_centro": 1,
    "nombre": "Centro Actualizado"
}


>>> POST /api/centros - Crear un nuevo centro
{
    "no_centro": 41,
    "nombre": "Centro de Prueba Norte"
}


>>> PUT /api/centros/1 - Actualizar un centro
{
    "no_centro": 1,
    "nombre": "Centro Actualizado"
}


>>> DELETE /api/centros/99 - Eliminar un centro (ejemplo con ID 99)
{
    "error": "Centro de evaluaci\u00f3n no encontrado"
}


==========================================
 3. CRUD - ESCUELAS DE MANEJO
==========================================

>>> GET /api/escuelas - Listar todas las escuelas
[
    {
        "no_aut": 1,
        "nombre": "Escuela Actualizada",
        "direccion": "Direcci\u00f3n actualizada",
        "acuerdo": "Acuerdo 2026-002"
    },
    {
        "no_aut": 2,
        "nombre": "Academia Vial GuateDrive",
        "direccion": "Boulevard Los Pr\u00f3ceres 18-20, Zona 10",
        "acuerdo": "ESC-GD-002"
    },
    {
        "no_aut": 3,
        "nombre": "Instituto de Conducci\u00f3n Segura",
        "direccion": "Calzada Roosevelt 25-30, Zona 11",
        "acuerdo": "ESC-ICS-003"
    },
    {
        "no_aut": 21,
        "nombre": "Escuela de Prueba",
        "direccion": "6a Avenida 1-80 Zona 1, Guatemala",
        "acuerdo": "Acuerdo 2026-001"
    },
    {
        "no_aut": 22,
        "nombre": "Escuela de Prueba",
        "direccion": "6a Avenida 1-80 Zona 1, Guatemala",
        "acuerdo": "Acuerdo 2026-001"
    }
]


>>> GET /api/escuelas/1 - Obtener escuela por ID
{
    "no_aut": 1,
    "nombre": "Escuela Actualizada",
    "direccion": "Direcci\u00f3n actualizada",
    "acuerdo": "Acuerdo 2026-002"
}


>>> POST /api/escuelas - Crear una nueva escuela
{
    "no_aut": 41,
    "nombre": "Escuela de Prueba",
    "direccion": "6a Avenida 1-80 Zona 1, Guatemala",
    "acuerdo": "Acuerdo 2026-001"
}


>>> PUT /api/escuelas/1 - Actualizar una escuela
{
    "no_aut": 1,
    "nombre": "Escuela Actualizada",
    "direccion": "Direcci\u00f3n actualizada",
    "acuerdo": "Acuerdo 2026-002"
}


>>> DELETE /api/escuelas/99 - Eliminar una escuela (ejemplo con ID 99)
{
    "error": "Escuela no encontrada"
}


==========================================
 4. CRUD - LICENCIAS
==========================================

>>> GET /api/licencias - Listar todas las licencias
[
    {
        "codigo": "A",
        "descripcion": "Motocicleta"
    },
    {
        "codigo": "B",
        "descripcion": "Autom\u00f3vil particular"
    },
    {
        "codigo": "C",
        "descripcion": "Cami\u00f3n/Veh\u00edculo pesado"
    }
]


>>> GET /api/licencias/A - Obtener licencia por código
{
    "codigo": "A",
    "descripcion": "Motocicleta"
}


>>> POST /api/licencias - Crear una nueva licencia
{
    "codigo": "Z",
    "descripcion": "Licencia de Prueba Z"
}


>>> PUT /api/licencias/Z - Actualizar una licencia
{
    "codigo": "Z",
    "descripcion": "Licencia de Prueba Z Actualizada"
}


>>> DELETE /api/licencias/Z - Eliminar una licencia
{
    "mensaje": "Licencia eliminada exitosamente"
}


==========================================
 5. CRUD - DEPARTAMENTOS
==========================================

>>> GET /api/departamentos - Listar todos los departamentos
[
    {
        "id_departamento": 1,
        "nombre": "Departamento Actualizado",
        "codigo": "DA"
    },
    {
        "id_departamento": 2,
        "nombre": "Sacatep\u00e9quez",
        "codigo": "03"
    },
    {
        "id_departamento": 3,
        "nombre": "Escuintla",
        "codigo": "05"
    },
    {
        "id_departamento": 21,
        "nombre": "Departamento de Prueba",
        "codigo": "DP"
    },
    {
        "id_departamento": 22,
        "nombre": "Departamento de Prueba",
        "codigo": "DP"
    }
]


>>> GET /api/departamentos/1 - Obtener departamento por ID
{
    "id_departamento": 1,
    "nombre": "Departamento Actualizado",
    "codigo": "DA"
}


>>> POST /api/departamentos - Crear un nuevo departamento
{
    "id_departamento": 41,
    "nombre": "Departamento de Prueba",
    "codigo": "DP"
}


>>> PUT /api/departamentos/1 - Actualizar un departamento
{
    "id_departamento": 1,
    "nombre": "Departamento Actualizado",
    "codigo": "DA"
}


>>> DELETE /api/departamentos/99 - Eliminar un departamento (ejemplo con ID 99)
{
    "error": "Departamento no encontrado"
}


==========================================
 6. CRUD - MUNICIPIOS
==========================================

>>> GET /api/municipios - Listar todos los municipios
[
    {
        "id_municipio": 1,
        "departamento_id_departamento": 1,
        "nombre": "Municipio Actualizado",
        "codigo": "MA",
        "departamento_nombre": "Departamento Actualizado"
    },
    {
        "id_municipio": 2,
        "departamento_id_departamento": 1,
        "nombre": "Mixco",
        "codigo": "02",
        "departamento_nombre": "Departamento Actualizado"
    },
    {
        "id_municipio": 3,
        "departamento_id_departamento": 1,
        "nombre": "Villa Nueva",
        "codigo": "03",
        "departamento_nombre": "Departamento Actualizado"
    },
    {
        "id_municipio": 4,
        "departamento_id_departamento": 3,
        "nombre": "Escuintla",
        "codigo": "01",
        "departamento_nombre": "Escuintla"
    },
    {
        "id_municipio": 5,
        "departamento_id_departamento": 2,
        "nombre": "Antigua Guatemala",
        "codigo": "01",
        "departamento_nombre": "Sacatep\u00e9quez"
    },
    {
        "id_municipio": 21,
        "departamento_id_departamento": 1,
        "nombre": "Municipio de Prueba",
        "codigo": "MP",
        "departamento_nombre": "Departamento Actualizado"
    },
    {
        "id_municipio": 22,
        "departamento_id_departamento": 1,
        "nombre": "Municipio de Prueba",
        "codigo": "MP",
        "departamento_nombre": "Departamento Actualizado"
    }
]


>>> GET /api/municipios/1 - Obtener municipio por ID
{
    "id_municipio": 1,
    "departamento_id_departamento": 1,
    "nombre": "Municipio Actualizado",
    "codigo": "MA",
    "departamento_nombre": "Departamento Actualizado"
}


>>> POST /api/municipios - Crear un nuevo municipio
{
    "id_municipio": 41,
    "departamento_id_departamento": 1,
    "nombre": "Municipio de Prueba",
    "codigo": "MP"
}


>>> PUT /api/municipios/1 - Actualizar un municipio
{
    "id_municipio": 1,
    "departamento_id_departamento": 1,
    "nombre": "Municipio Actualizado",
    "codigo": "MA"
}


>>> DELETE /api/municipios/99 - Eliminar un municipio (ejemplo con ID 99)
{
    "error": "Municipio no encontrado"
}


==========================================
 7. CRUD - UBICACIONES (clave compuesta)
==========================================

>>> GET /api/ubicaciones - Listar todas las ubicaciones
[
    {
        "escuela_id_escuela": 1,
        "centro_id_centro": 1,
        "escuela_nombre": "Escuela Actualizada",
        "centro_nombre": "Centro Actualizado"
    },
    {
        "escuela_id_escuela": 1,
        "centro_id_centro": 2,
        "escuela_nombre": "Escuela Actualizada",
        "centro_nombre": "Centro de Evaluaci\u00f3n Antigua Guatemala"
    },
    {
        "escuela_id_escuela": 2,
        "centro_id_centro": 1,
        "escuela_nombre": "Academia Vial GuateDrive",
        "centro_nombre": "Centro Actualizado"
    },
    {
        "escuela_id_escuela": 3,
        "centro_id_centro": 2,
        "escuela_nombre": "Instituto de Conducci\u00f3n Segura",
        "centro_nombre": "Centro de Evaluaci\u00f3n Antigua Guatemala"
    },
    {
        "escuela_id_escuela": 3,
        "centro_id_centro": 3,
        "escuela_nombre": "Instituto de Conducci\u00f3n Segura",
        "centro_nombre": "Centro de Evaluaci\u00f3n Escuintla"
    }
]


>>> GET /api/ubicaciones/1/1 - Obtener ubicación por escuela y centro
{
    "escuela_id_escuela": 1,
    "centro_id_centro": 1,
    "escuela_nombre": "Escuela Actualizada",
    "centro_nombre": "Centro Actualizado"
}


>>> POST /api/ubicaciones - Crear una nueva ubicación
{
    "error": "La ubicaci\u00f3n ya existe o viola una restricci\u00f3n de PK"
}


>>> PUT /api/ubicaciones/1/1 - Actualizar una ubicación
{
    "error": "Error interno del servidor"
}


>>> DELETE /api/ubicaciones/99/99 - Eliminar una ubicación (ejemplo)
{
    "error": "Ubicaci\u00f3n no encontrada"
}


==========================================
 8. CRUD - REGISTROS
==========================================

>>> GET /api/registros - Listar todos los registros
[
    {
        "id_registro": 1,
        "ubicacion_escuela_id_escuela": 1,
        "ubicacion_centro_id_centro": 1,
        "municipio_id_municipio": 1,
        "municipio_departamento_id_departamento": 1,
        "fecha": "2026-04-28T00:00:00.000Z",
        "tipo_tramite": "RENOVACION",
        "tipo_licencia": "B",
        "nombre_completo": "Juan P\u00e9rez Actualizado",
        "genero": "M"
    },
    {
        "id_registro": 2,
        "ubicacion_escuela_id_escuela": 1,
        "ubicacion_centro_id_centro": 2,
        "municipio_id_municipio": 2,
        "municipio_departamento_id_departamento": 1,
        "fecha": "2025-01-15T00:00:00.000Z",
        "tipo_tramite": "Licencia de Conducir",
        "tipo_licencia": "B",
        "nombre_completo": "Mar\u00eda Elena Rodr\u00edguez Morales",
        "genero": "F"
    },
    {
        "id_registro": 3,
        "ubicacion_escuela_id_escuela": 2,
        "ubicacion_centro_id_centro": 1,
        "municipio_id_municipio": 3,
        "municipio_departamento_id_departamento": 1,
        "fecha": "2025-01-16T00:00:00.000Z",
        "tipo_tramite": "Licencia de Conducir",
        "tipo_licencia": "A",
        "nombre_completo": "Carlos Alberto M\u00e9ndez Castillo",
        "genero": "M"
    },
    {
        "id_registro": 4,
        "ubicacion_escuela_id_escuela": 3,
        "ubicacion_centro_id_centro": 3,
        "municipio_id_municipio": 4,
        "municipio_departamento_id_departamento": 3,
        "fecha": "2025-01-17T00:00:00.000Z",
        "tipo_tramite": "Licencia de Conducir",
        "tipo_licencia": "A",
        "nombre_completo": "Ana Sof\u00eda Guerrero D\u00edaz",
        "genero": "F"
    },
    {
        "id_registro": 21,
        "ubicacion_escuela_id_escuela": 1,
        "ubicacion_centro_id_centro": 1,
        "municipio_id_municipio": 1,
        "municipio_departamento_id_departamento": 1,
        "fecha": "2026-04-28T00:00:00.000Z",
        "tipo_tramite": "NUEVA",
        "tipo_licencia": "A",
        "nombre_completo": "Juan P\u00e9rez Prueba",
        "genero": "M"
    },
    {
        "id_registro": 22,
        "ubicacion_escuela_id_escuela": 1,
        "ubicacion_centro_id_centro": 1,
        "municipio_id_municipio": 1,
        "municipio_departamento_id_departamento": 1,
        "fecha": "2026-04-28T00:00:00.000Z",
        "tipo_tramite": "NUEVA",
        "tipo_licencia": "A",
        "nombre_completo": "Juan P\u00e9rez Prueba",
        "genero": "M"
    }
]


>>> GET /api/registros/1 - Obtener registro por ID
{
    "id_registro": 1,
    "ubicacion_escuela_id_escuela": 1,
    "ubicacion_centro_id_centro": 1,
    "municipio_id_municipio": 1,
    "municipio_departamento_id_departamento": 1,
    "fecha": "2026-04-28T00:00:00.000Z",
    "tipo_tramite": "RENOVACION",
    "tipo_licencia": "B",
    "nombre_completo": "Juan P\u00e9rez Actualizado",
    "genero": "M"
}


>>> POST /api/registros - Crear un nuevo registro
{
    "id_registro": 41,
    "ubicacion_escuela_id_escuela": 1,
    "ubicacion_centro_id_centro": 1,
    "municipio_id_municipio": 1,
    "municipio_departamento_id_departamento": 1,
    "fecha": "2026-04-28",
    "tipo_tramite": "NUEVA",
    "tipo_licencia": "A",
    "nombre_completo": "Juan P\u00e9rez Prueba",
    "genero": "M"
}


>>> PUT /api/registros/1 - Actualizar un registro
{
    "id_registro": 1,
    "ubicacion_escuela_id_escuela": 1,
    "ubicacion_centro_id_centro": 1,
    "municipio_id_municipio": 1,
    "municipio_departamento_id_departamento": 1,
    "fecha": "2026-04-28",
    "tipo_tramite": "RENOVACION",
    "tipo_licencia": "B",
    "nombre_completo": "Juan P\u00e9rez Actualizado",
    "genero": "M"
}


>>> DELETE /api/registros/99 - Eliminar un registro (ejemplo con ID 99)
{
    "error": "Registro no encontrado"
}


==========================================
 9. CRUD - CORRELATIVOS
==========================================

>>> GET /api/correlativos - Listar todos los correlativos
[
    {
        "id_correlativo": 1,
        "fecha": "2026-04-28T00:00:00.000Z",
        "no_examen": 1002
    },
    {
        "id_correlativo": 2,
        "fecha": "2025-01-15T00:00:00.000Z",
        "no_examen": 2
    },
    {
        "id_correlativo": 3,
        "fecha": "2025-01-16T00:00:00.000Z",
        "no_examen": 3
    },
    {
        "id_correlativo": 4,
        "fecha": "2025-01-17T00:00:00.000Z",
        "no_examen": 4
    },
    {
        "id_correlativo": 5,
        "fecha": "2025-01-18T00:00:00.000Z",
        "no_examen": 5
    },
    {
        "id_correlativo": 21,
        "fecha": "2026-04-28T00:00:00.000Z",
        "no_examen": 1001
    },
    {
        "id_correlativo": 22,
        "fecha": "2026-04-28T00:00:00.000Z",
        "no_examen": 1001
    }
]


>>> GET /api/correlativos/1 - Obtener correlativo por ID
{
    "id_correlativo": 1,
    "fecha": "2026-04-28T00:00:00.000Z",
    "no_examen": 1002
}


>>> POST /api/correlativos - Crear un nuevo correlativo
{
    "id_correlativo": 41,
    "fecha": "2026-04-28",
    "no_examen": 1001
}


>>> PUT /api/correlativos/1 - Actualizar un correlativo
{
    "id_correlativo": 1,
    "fecha": "2026-04-28",
    "no_examen": 1002
}


>>> DELETE /api/correlativos/99 - Eliminar un correlativo (ejemplo con ID 99)
{
    "error": "Correlativo no encontrado"
}


==========================================
 10. CRUD - EXÁMENES
==========================================

>>> GET /api/examenes - Listar todos los exámenes
[
    {
        "id_examen": 1,
        "registro_id_registro": 1,
        "correlativo_id_correlativo": 2,
        "registro_id_escuela": 1,
        "registro_id_centro": 1,
        "registro_municipio_id_municipio": 1,
        "registro_municipio_departamento_id_departamento": 1
    },
    {
        "id_examen": 2,
        "registro_id_registro": 2,
        "correlativo_id_correlativo": 2,
        "registro_id_escuela": 1,
        "registro_id_centro": 2,
        "registro_municipio_id_municipio": 2,
        "registro_municipio_departamento_id_departamento": 1
    },
    {
        "id_examen": 3,
        "registro_id_registro": 3,
        "correlativo_id_correlativo": 3,
        "registro_id_escuela": 2,
        "registro_id_centro": 1,
        "registro_municipio_id_municipio": 3,
        "registro_municipio_departamento_id_departamento": 1
    },
    {
        "id_examen": 4,
        "registro_id_registro": 4,
        "correlativo_id_correlativo": 4,
        "registro_id_escuela": 3,
        "registro_id_centro": 3,
        "registro_municipio_id_municipio": 4,
        "registro_municipio_departamento_id_departamento": 3
    },
    {
        "id_examen": 21,
        "registro_id_registro": 1,
        "correlativo_id_correlativo": 1,
        "registro_id_escuela": 1,
        "registro_id_centro": 1,
        "registro_municipio_id_municipio": 1,
        "registro_municipio_departamento_id_departamento": 1
    },
    {
        "id_examen": 22,
        "registro_id_registro": 1,
        "correlativo_id_correlativo": 1,
        "registro_id_escuela": 1,
        "registro_id_centro": 1,
        "registro_municipio_id_municipio": 1,
        "registro_municipio_departamento_id_departamento": 1
    }
]


>>> GET /api/examenes/1 - Obtener examen por ID
{
    "id_examen": 1,
    "registro_id_registro": 1,
    "correlativo_id_correlativo": 2,
    "registro_id_escuela": 1,
    "registro_id_centro": 1,
    "registro_municipio_id_municipio": 1,
    "registro_municipio_departamento_id_departamento": 1
}


>>> POST /api/examenes - Crear un nuevo examen
{
    "id_examen": 41,
    "registro_id_registro": 1,
    "correlativo_id_correlativo": 1,
    "registro_id_escuela": 1,
    "registro_id_centro": 1,
    "registro_municipio_id_municipio": 1,
    "registro_municipio_departamento_id_departamento": 1
}


>>> PUT /api/examenes/1 - Actualizar un examen
{
    "id_examen": 1,
    "registro_id_registro": 1,
    "correlativo_id_correlativo": 2,
    "registro_id_escuela": 1,
    "registro_id_centro": 1,
    "registro_municipio_id_municipio": 1,
    "registro_municipio_departamento_id_departamento": 1
}


>>> DELETE /api/examenes/99 - Eliminar un examen (ejemplo con ID 99)
{
    "error": "Examen no encontrado"
}


==========================================
 11. CRUD - PREGUNTAS TEÓRICAS
==========================================

>>> GET /api/preguntas - Listar todas las preguntas
[
    {
        "id_pregunta": 1,
        "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?",
        "respuesta_a": "30 km/h",
        "respuesta_b": "40 km/h",
        "respuesta_c": "50 km/h",
        "respuesta_d": "60 km/h",
        "respuesta_correcta": "A"
    },
    {
        "id_pregunta": 2,
        "pregunta_texto": "\u00bfQu\u00e9 significa una se\u00f1al de alto?",
        "respuesta_a": "Reducir velocidad",
        "respuesta_b": "Detenerse completamente",
        "respuesta_c": "Ceder el paso",
        "respuesta_d": "Continuar con precauci\u00f3n",
        "respuesta_correcta": "B"
    },
    {
        "id_pregunta": 3,
        "pregunta_texto": "\u00bfCu\u00e1l es el l\u00edmite de velocidad en zona escolar?",
        "respuesta_a": "20 km/h",
        "respuesta_b": "30 km/h",
        "respuesta_c": "40 km/h",
        "respuesta_d": "50 km/h",
        "respuesta_correcta": "A"
    },
    {
        "id_pregunta": 4,
        "pregunta_texto": "\u00bfQu\u00e9 debe hacer al ver una ambulancia con sirena activada?",
        "respuesta_a": "Mantener velocidad",
        "respuesta_b": "Acelerar para salir del camino",
        "respuesta_c": "Orillarse y detenerse",
        "respuesta_d": "Ignorar la sirena",
        "respuesta_correcta": "C"
    },
    {
        "id_pregunta": 21,
        "pregunta_texto": "\u00bfCu\u00e1l es la velocidad m\u00e1xima en una zona escolar?",
        "respuesta_a": "30 km/h",
        "respuesta_b": "40 km/h",
        "respuesta_c": "50 km/h",
        "respuesta_d": "60 km/h",
        "respuesta_correcta": "A"
    },
    {
        "id_pregunta": 22,
        "pregunta_texto": "\u00bfCu\u00e1l es la velocidad m\u00e1xima en una zona escolar?",
        "respuesta_a": "30 km/h",
        "respuesta_b": "40 km/h",
        "respuesta_c": "50 km/h",
        "respuesta_d": "60 km/h",
        "respuesta_correcta": "A"
    }
]


>>> GET /api/preguntas/1 - Obtener pregunta por ID
{
    "id_pregunta": 1,
    "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?",
    "respuesta_a": "30 km/h",
    "respuesta_b": "40 km/h",
    "respuesta_c": "50 km/h",
    "respuesta_d": "60 km/h",
    "respuesta_correcta": "A"
}


>>> POST /api/preguntas - Crear una nueva pregunta
{
    "id_pregunta": 41,
    "pregunta_texto": "\u00bfCu\u00e1l es la velocidad m\u00e1xima en una zona escolar?",
    "respuesta_a": "30 km/h",
    "respuesta_b": "40 km/h",
    "respuesta_c": "50 km/h",
    "respuesta_d": "60 km/h",
    "respuesta_correcta": "A"
}


>>> PUT /api/preguntas/1 - Actualizar una pregunta
{
    "id_pregunta": 1,
    "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?",
    "respuesta_a": "30 km/h",
    "respuesta_b": "40 km/h",
    "respuesta_c": "50 km/h",
    "respuesta_d": "60 km/h",
    "respuesta_correcta": "A"
}


>>> DELETE /api/preguntas/99 - Eliminar una pregunta (ejemplo con ID 99)
{
    "error": "Pregunta no encontrada"
}


==========================================
 12. CRUD - PREGUNTAS PRÁCTICAS
==========================================

>>> GET /api/preguntas-practico - Listar todas las preguntas prácticas
[
    {
        "id_pregunta_practico": 1,
        "pregunta_texto": "Estacionamiento en paralelo actualizado",
        "punteo": 20
    },
    {
        "id_pregunta_practico": 2,
        "pregunta_texto": "Conducir en reversa por 50 metros manteniendo trayectoria recta",
        "punteo": 15
    },
    {
        "id_pregunta_practico": 3,
        "pregunta_texto": "Maniobra de tres puntos en espacio reducido",
        "punteo": 25
    },
    {
        "id_pregunta_practico": 4,
        "pregunta_texto": "Conducci\u00f3n en zona urbana respetando se\u00f1ales de tr\u00e1nsito",
        "punteo": 30
    },
    {
        "id_pregunta_practico": 21,
        "pregunta_texto": "Estacionamiento en paralelo",
        "punteo": 15
    },
    {
        "id_pregunta_practico": 22,
        "pregunta_texto": "Estacionamiento en paralelo",
        "punteo": 15
    }
]


>>> GET /api/preguntas-practico/1 - Obtener pregunta práctica por ID
{
    "id_pregunta_practico": 1,
    "pregunta_texto": "Estacionamiento en paralelo actualizado",
    "punteo": 20
}


>>> POST /api/preguntas-practico - Crear una nueva pregunta práctica
{
    "id_pregunta_practico": 41,
    "pregunta_texto": "Estacionamiento en paralelo",
    "punteo": 15
}


>>> PUT /api/preguntas-practico/1 - Actualizar una pregunta práctica
{
    "id_pregunta_practico": 1,
    "pregunta_texto": "Estacionamiento en paralelo actualizado",
    "punteo": 20
}


>>> DELETE /api/preguntas-practico/99 - Eliminar una pregunta práctica (ejemplo con ID 99)
{
    "error": "Pregunta pr\u00e1ctica no encontrada"
}


==========================================
 13. CRUD - RESPUESTAS DE USUARIO
==========================================

>>> GET /api/respuestas-usuario - Listar todas las respuestas
[
    {
        "id_respuesta_usuario": 1,
        "pregunta_id_pregunta": 1,
        "examen_id_examen": 1,
        "respuesta": "B",
        "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?"
    },
    {
        "id_respuesta_usuario": 2,
        "pregunta_id_pregunta": 2,
        "examen_id_examen": 1,
        "respuesta": "B",
        "pregunta_texto": "\u00bfQu\u00e9 significa una se\u00f1al de alto?"
    },
    {
        "id_respuesta_usuario": 3,
        "pregunta_id_pregunta": 3,
        "examen_id_examen": 2,
        "respuesta": "A",
        "pregunta_texto": "\u00bfCu\u00e1l es el l\u00edmite de velocidad en zona escolar?"
    },
    {
        "id_respuesta_usuario": 4,
        "pregunta_id_pregunta": 4,
        "examen_id_examen": 2,
        "respuesta": "C",
        "pregunta_texto": "\u00bfQu\u00e9 debe hacer al ver una ambulancia con sirena activada?"
    },
    {
        "id_respuesta_usuario": 5,
        "pregunta_id_pregunta": 1,
        "examen_id_examen": 3,
        "respuesta": "B",
        "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?"
    },
    {
        "id_respuesta_usuario": 6,
        "pregunta_id_pregunta": 2,
        "examen_id_examen": 3,
        "respuesta": "A",
        "pregunta_texto": "\u00bfQu\u00e9 significa una se\u00f1al de alto?"
    },
    {
        "id_respuesta_usuario": 21,
        "pregunta_id_pregunta": 1,
        "examen_id_examen": 1,
        "respuesta": "A",
        "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?"
    },
    {
        "id_respuesta_usuario": 22,
        "pregunta_id_pregunta": 1,
        "examen_id_examen": 1,
        "respuesta": "A",
        "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?"
    }
]


>>> GET /api/respuestas-usuario/1 - Obtener respuesta por ID
{
    "id_respuesta_usuario": 1,
    "pregunta_id_pregunta": 1,
    "examen_id_examen": 1,
    "respuesta": "B",
    "pregunta_texto": "\u00bfVelocidad m\u00e1xima en zona escolar?"
}


>>> POST /api/respuestas-usuario - Crear una nueva respuesta
{
    "id_respuesta_usuario": 41,
    "pregunta_id_pregunta": 1,
    "examen_id_examen": 1,
    "respuesta": "A"
}


>>> PUT /api/respuestas-usuario/1 - Actualizar una respuesta
{
    "id_respuesta_usuario": 1,
    "pregunta_id_pregunta": 1,
    "examen_id_examen": 1,
    "respuesta": "B"
}


>>> DELETE /api/respuestas-usuario/99 - Eliminar una respuesta (ejemplo con ID 99)
{
    "error": "Respuesta no encontrada"
}


==========================================
 14. CRUD - RESPUESTAS PRÁCTICAS
==========================================

>>> GET /api/respuestas-practico - Listar todas las respuestas prácticas
[
    {
        "id_respuesta_practico": 1,
        "pregunta_practico_id_pregunta_practico": 1,
        "examen_id_examen": 1,
        "nota": 90,
        "pregunta_texto": "Estacionamiento en paralelo actualizado"
    },
    {
        "id_respuesta_practico": 2,
        "pregunta_practico_id_pregunta_practico": 2,
        "examen_id_examen": 1,
        "nota": 13,
        "pregunta_texto": "Conducir en reversa por 50 metros manteniendo trayectoria recta"
    },
    {
        "id_respuesta_practico": 3,
        "pregunta_practico_id_pregunta_practico": 3,
        "examen_id_examen": 2,
        "nota": 22,
        "pregunta_texto": "Maniobra de tres puntos en espacio reducido"
    },
    {
        "id_respuesta_practico": 4,
        "pregunta_practico_id_pregunta_practico": 4,
        "examen_id_examen": 2,
        "nota": 28,
        "pregunta_texto": "Conducci\u00f3n en zona urbana respetando se\u00f1ales de tr\u00e1nsito"
    },
    {
        "id_respuesta_practico": 5,
        "pregunta_practico_id_pregunta_practico": 1,
        "examen_id_examen": 3,
        "nota": 15,
        "pregunta_texto": "Estacionamiento en paralelo actualizado"
    },
    {
        "id_respuesta_practico": 21,
        "pregunta_practico_id_pregunta_practico": 1,
        "examen_id_examen": 1,
        "nota": 85,
        "pregunta_texto": "Estacionamiento en paralelo actualizado"
    },
    {
        "id_respuesta_practico": 22,
        "pregunta_practico_id_pregunta_practico": 1,
        "examen_id_examen": 1,
        "nota": 85,
        "pregunta_texto": "Estacionamiento en paralelo actualizado"
    }
]


>>> GET /api/respuestas-practico/1 - Obtener respuesta práctica por ID
{
    "id_respuesta_practico": 1,
    "pregunta_practico_id_pregunta_practico": 1,
    "examen_id_examen": 1,
    "nota": 90,
    "pregunta_texto": "Estacionamiento en paralelo actualizado"
}


>>> POST /api/respuestas-practico - Crear una nueva respuesta práctica
{
    "id_respuesta_practico": 41,
    "pregunta_practico_id_pregunta_practico": 1,
    "examen_id_examen": 1,
    "nota": 85
}


>>> PUT /api/respuestas-practico/1 - Actualizar una respuesta práctica
{
    "id_respuesta_practico": 1,
    "pregunta_practico_id_pregunta_practico": 1,
    "examen_id_examen": 1,
    "nota": 90
}


>>> DELETE /api/respuestas-practico/99 - Eliminar una respuesta práctica (ejemplo con ID 99)
{
    "error": "Respuesta pr\u00e1ctica no encontrada"
}


==========================================
 15. CONSULTAS ESTADÍSTICAS
==========================================

>>> GET /api/estadisticas/consulta1 - Estadísticas por centro y escuela
    Salida: nombre_centro, nombre_escuela, total_examenes, promedio_teorico, promedio_practico, aprobados
[
    {
        "nombre_centro": "Centro Actualizado",
        "nombre_escuela": "Academia Vial GuateDrive",
        "total_examenes": 1,
        "promedio_teorico": 0,
        "promedio_practico": 15,
        "aprobados": 0
    },
    {
        "nombre_centro": "Centro Actualizado",
        "nombre_escuela": "Escuela Actualizada",
        "total_examenes": 4,
        "promedio_teorico": 20,
        "promedio_practico": 71.6,
        "aprobados": 1
    },
    {
        "nombre_centro": "Centro de Evaluaci\u00f3n Antigua Guatemala",
        "nombre_escuela": "Escuela Actualizada",
        "total_examenes": 1,
        "promedio_teorico": 100,
        "promedio_practico": 25,
        "aprobados": 1
    },
    {
        "nombre_centro": "Centro de Evaluaci\u00f3n Antigua Guatemala",
        "nombre_escuela": "Instituto de Conducci\u00f3n Segura",
        "total_examenes": 0,
        "promedio_teorico": null,
        "promedio_practico": null,
        "aprobados": 0
    },
    {
        "nombre_centro": "Centro de Evaluaci\u00f3n Escuintla",
        "nombre_escuela": "Instituto de Conducci\u00f3n Segura",
        "total_examenes": 1,
        "promedio_teorico": 0,
        "promedio_practico": null,
        "aprobados": 0
    }
]


>>> GET /api/estadisticas/consulta2 - Ranking de evaluados por resultado final
    Salida: ranking, nombre_completo, punteo_total, resultado
[
    {
        "ranking": 1,
        "nombre_completo": "Juan P\u00e9rez Actualizado",
        "punteo_total": 2790,
        "resultado": "APROBADO"
    },
    {
        "ranking": 2,
        "nombre_completo": "Mar\u00eda Elena Rodr\u00edguez Morales",
        "punteo_total": 300,
        "resultado": "APROBADO"
    },
    {
        "ranking": 3,
        "nombre_completo": "Carlos Alberto M\u00e9ndez Castillo",
        "punteo_total": 30,
        "resultado": "REPROBADO"
    },
    {
        "ranking": 4,
        "nombre_completo": "Ana Sof\u00eda Guerrero D\u00edaz",
        "punteo_total": 0,
        "resultado": "REPROBADO"
    }
]


>>> GET /api/estadisticas/consulta3 - Pregunta(s) con menor porcentaje de aciertos
    Salida: id_pregunta, pregunta_texto, total_respuestas, respuestas_correctas, porcentaje_aciertos
[
    {
        "id_pregunta": 2,
        "pregunta_texto": "\u00bfQu\u00e9 significa una se\u00f1al de alto?",
        "total_respuestas": 2,
        "respuestas_correctas": 1,
        "porcentaje_aciertos": 50
    }
]


==========================================
 16. PRUEBAS DE ERROR (HTTP 400, 404, 500)
==========================================

>>> GET /api/centros/9999 - Centro no encontrado (404)
{
    "error": "Centro de evaluaci\u00f3n no encontrado"
}


>>> POST /api/centros - Body incompleto (400)
{
    "error": "El campo \"nombre\" es obligatorio"
}


>>> DELETE /api/centros/9999 - Centro no encontrado (404)
{
    "error": "Centro de evaluaci\u00f3n no encontrado"
}


>>> GET /api/ruta-inexistente - Ruta no encontrada (404)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/ruta-inexistente</pre>
</body>
</html>


==========================================
  PRUEBAS COMPLETADAS
==========================================

Revisa las respuestas arriba para verificar
que todos los endpoints funcionan correctamente.


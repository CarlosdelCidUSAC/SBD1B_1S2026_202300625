#!/bin/bash
# =============================================================================
# Documentación de Pruebas con cURL
# Proyecto: Centros de Evaluación de Manejo - SBD1
# Curso: Sistemas de Bases de Datos 1
# Universidad San Carlos de Guatemala
# Carnet: 202300625
# =============================================================================
# Uso: Asegúrate de que la API esté corriendo en http://localhost:3000
#   chmod +x curl_documentation.sh
#   ./curl_documentation.sh
# =============================================================================

BASE_URL="http://localhost:3000"
echo "=========================================="
echo "  Pruebas de API con cURL"
echo "  Proyecto SBD1 - Centros de Evaluación"
echo "=========================================="
echo ""

# =============================================================================
# 1. HEALTH CHECK
# =============================================================================
echo "------------------------------------------"
echo " 1. HEALTH CHECK"
echo "------------------------------------------"
echo ""
echo ">>> GET /health - Verificar estado de la API"
curl -s -X GET "$BASE_URL/health" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/health"
echo -e "\n"

# =============================================================================
# 2. CRUD - CENTROS DE EVALUACIÓN (/api/centros)
# =============================================================================
echo "=========================================="
echo " 2. CRUD - CENTROS DE EVALUACIÓN"
echo "=========================================="
echo ""

echo ">>> GET /api/centros - Listar todos los centros"
curl -s -X GET "$BASE_URL/api/centros" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/centros"
echo -e "\n"

echo ">>> GET /api/centros/1 - Obtener centro por ID"
curl -s -X GET "$BASE_URL/api/centros/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/centros/1"
echo -e "\n"

echo ">>> POST /api/centros - Crear un nuevo centro"
curl -s -X POST "$BASE_URL/api/centros" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Centro de Prueba Norte"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/centros" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Centro de Prueba Norte"}'
echo -e "\n"

echo ">>> PUT /api/centros/1 - Actualizar un centro"
curl -s -X PUT "$BASE_URL/api/centros/1" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Centro Actualizado"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/centros/1" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Centro Actualizado"}'
echo -e "\n"

echo ">>> DELETE /api/centros/99 - Eliminar un centro (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/centros/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/centros/99"
echo -e "\n"

# =============================================================================
# 3. CRUD - ESCUELAS DE MANEJO (/api/escuelas)
# =============================================================================
echo "=========================================="
echo " 3. CRUD - ESCUELAS DE MANEJO"
echo "=========================================="
echo ""

echo ">>> GET /api/escuelas - Listar todas las escuelas"
curl -s -X GET "$BASE_URL/api/escuelas" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/escuelas"
echo -e "\n"

echo ">>> GET /api/escuelas/1 - Obtener escuela por ID"
curl -s -X GET "$BASE_URL/api/escuelas/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/escuelas/1"
echo -e "\n"

echo ">>> POST /api/escuelas - Crear una nueva escuela"
curl -s -X POST "$BASE_URL/api/escuelas" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Escuela de Prueba", "direccion": "6a Avenida 1-80 Zona 1, Guatemala", "acuerdo": "Acuerdo 2026-001"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/escuelas" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Escuela de Prueba", "direccion": "6a Avenida 1-80 Zona 1, Guatemala", "acuerdo": "Acuerdo 2026-001"}'
echo -e "\n"

echo ">>> PUT /api/escuelas/1 - Actualizar una escuela"
curl -s -X PUT "$BASE_URL/api/escuelas/1" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Escuela Actualizada", "direccion": "Dirección actualizada", "acuerdo": "Acuerdo 2026-002"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/escuelas/1" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Escuela Actualizada", "direccion": "Dirección actualizada", "acuerdo": "Acuerdo 2026-002"}'
echo -e "\n"

echo ">>> DELETE /api/escuelas/99 - Eliminar una escuela (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/escuelas/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/escuelas/99"
echo -e "\n"

# =============================================================================
# 4. CRUD - LICENCIAS (/api/licencias)
# =============================================================================
echo "=========================================="
echo " 4. CRUD - LICENCIAS"
echo "=========================================="
echo ""

echo ">>> GET /api/licencias - Listar todas las licencias"
curl -s -X GET "$BASE_URL/api/licencias" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/licencias"
echo -e "\n"

echo ">>> GET /api/licencias/A - Obtener licencia por código"
curl -s -X GET "$BASE_URL/api/licencias/A" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/licencias/A"
echo -e "\n"

echo ">>> POST /api/licencias - Crear una nueva licencia"
curl -s -X POST "$BASE_URL/api/licencias" \
  -H "Content-Type: application/json" \
  -d '{"codigo": "Z", "descripcion": "Licencia de Prueba Z"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/licencias" \
  -H "Content-Type: application/json" \
  -d '{"codigo": "Z", "descripcion": "Licencia de Prueba Z"}'
echo -e "\n"

echo ">>> PUT /api/licencias/Z - Actualizar una licencia"
curl -s -X PUT "$BASE_URL/api/licencias/Z" \
  -H "Content-Type: application/json" \
  -d '{"descripcion": "Licencia de Prueba Z Actualizada"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/licencias/Z" \
  -H "Content-Type: application/json" \
  -d '{"descripcion": "Licencia de Prueba Z Actualizada"}'
echo -e "\n"

echo ">>> DELETE /api/licencias/Z - Eliminar una licencia"
curl -s -X DELETE "$BASE_URL/api/licencias/Z" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/licencias/Z"
echo -e "\n"

# =============================================================================
# 5. CRUD - DEPARTAMENTOS (/api/departamentos)
# =============================================================================
echo "=========================================="
echo " 5. CRUD - DEPARTAMENTOS"
echo "=========================================="
echo ""

echo ">>> GET /api/departamentos - Listar todos los departamentos"
curl -s -X GET "$BASE_URL/api/departamentos" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/departamentos"
echo -e "\n"

echo ">>> GET /api/departamentos/1 - Obtener departamento por ID"
curl -s -X GET "$BASE_URL/api/departamentos/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/departamentos/1"
echo -e "\n"

echo ">>> POST /api/departamentos - Crear un nuevo departamento"
curl -s -X POST "$BASE_URL/api/departamentos" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Departamento de Prueba", "codigo": "DP"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/departamentos" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Departamento de Prueba", "codigo": "DP"}'
echo -e "\n"

echo ">>> PUT /api/departamentos/1 - Actualizar un departamento"
curl -s -X PUT "$BASE_URL/api/departamentos/1" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Departamento Actualizado", "codigo": "DA"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/departamentos/1" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Departamento Actualizado", "codigo": "DA"}'
echo -e "\n"

echo ">>> DELETE /api/departamentos/99 - Eliminar un departamento (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/departamentos/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/departamentos/99"
echo -e "\n"

# =============================================================================
# 6. CRUD - MUNICIPIOS (/api/municipios)
# =============================================================================
echo "=========================================="
echo " 6. CRUD - MUNICIPIOS"
echo "=========================================="
echo ""

echo ">>> GET /api/municipios - Listar todos los municipios"
curl -s -X GET "$BASE_URL/api/municipios" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/municipios"
echo -e "\n"

echo ">>> GET /api/municipios/1 - Obtener municipio por ID"
curl -s -X GET "$BASE_URL/api/municipios/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/municipios/1"
echo -e "\n"

echo ">>> POST /api/municipios - Crear un nuevo municipio"
curl -s -X POST "$BASE_URL/api/municipios" \
  -H "Content-Type: application/json" \
  -d '{"departamento_id_departamento": 1, "nombre": "Municipio de Prueba", "codigo": "MP"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/municipios" \
  -H "Content-Type: application/json" \
  -d '{"departamento_id_departamento": 1, "nombre": "Municipio de Prueba", "codigo": "MP"}'
echo -e "\n"

echo ">>> PUT /api/municipios/1 - Actualizar un municipio"
curl -s -X PUT "$BASE_URL/api/municipios/1" \
  -H "Content-Type: application/json" \
  -d '{"departamento_id_departamento": 1, "nombre": "Municipio Actualizado", "codigo": "MA"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/municipios/1" \
  -H "Content-Type: application/json" \
  -d '{"departamento_id_departamento": 1, "nombre": "Municipio Actualizado", "codigo": "MA"}'
echo -e "\n"

echo ">>> DELETE /api/municipios/99 - Eliminar un municipio (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/municipios/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/municipios/99"
echo -e "\n"

# =============================================================================
# 7. CRUD - UBICACIONES (/api/ubicaciones) - Clave compuesta
# =============================================================================
echo "=========================================="
echo " 7. CRUD - UBICACIONES (clave compuesta)"
echo "=========================================="
echo ""

echo ">>> GET /api/ubicaciones - Listar todas las ubicaciones"
curl -s -X GET "$BASE_URL/api/ubicaciones" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/ubicaciones"
echo -e "\n"

echo ">>> GET /api/ubicaciones/1/1 - Obtener ubicación por escuela y centro"
curl -s -X GET "$BASE_URL/api/ubicaciones/1/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/ubicaciones/1/1"
echo -e "\n"

echo ">>> POST /api/ubicaciones - Crear una nueva ubicación"
curl -s -X POST "$BASE_URL/api/ubicaciones" \
  -H "Content-Type: application/json" \
  -d '{"escuela_id_escuela": 1, "centro_id_centro": 1}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/ubicaciones" \
  -H "Content-Type: application/json" \
  -d '{"escuela_id_escuela": 1, "centro_id_centro": 1}'
echo -e "\n"

echo ">>> PUT /api/ubicaciones/1/1 - Actualizar una ubicación"
curl -s -X PUT "$BASE_URL/api/ubicaciones/1/1" \
  -H "Content-Type: application/json" \
  -d '{"escuela_id_escuela": 2, "centro_id_centro": 2}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/ubicaciones/1/1" \
  -H "Content-Type: application/json" \
  -d '{"escuela_id_escuela": 2, "centro_id_centro": 2}'
echo -e "\n"

echo ">>> DELETE /api/ubicaciones/99/99 - Eliminar una ubicación (ejemplo)"
curl -s -X DELETE "$BASE_URL/api/ubicaciones/99/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/ubicaciones/99/99"
echo -e "\n"

# =============================================================================
# 8. CRUD - REGISTROS (/api/registros)
# =============================================================================
echo "=========================================="
echo " 8. CRUD - REGISTROS"
echo "=========================================="
echo ""

echo ">>> GET /api/registros - Listar todos los registros"
curl -s -X GET "$BASE_URL/api/registros" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/registros"
echo -e "\n"

echo ">>> GET /api/registros/1 - Obtener registro por ID"
curl -s -X GET "$BASE_URL/api/registros/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/registros/1"
echo -e "\n"

echo ">>> POST /api/registros - Crear un nuevo registro"
curl -s -X POST "$BASE_URL/api/registros" \
  -H "Content-Type: application/json" \
  -d '{
    "ubicacion_escuela_id_escuela": 1,
    "ubicacion_centro_id_centro": 1,
    "municipio_id_municipio": 1,
    "municipio_departamento_id_departamento": 1,
    "fecha": "2026-04-28",
    "tipo_tramite": "NUEVA",
    "tipo_licencia": "A",
    "nombre_completo": "Juan Pérez Prueba",
    "genero": "M"
  }' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/registros" \
  -H "Content-Type: application/json" \
  -d '{"ubicacion_escuela_id_escuela": 1, "ubicacion_centro_id_centro": 1, "municipio_id_municipio": 1, "municipio_departamento_id_departamento": 1, "fecha": "2026-04-28", "tipo_tramite": "NUEVA", "tipo_licencia": "A", "nombre_completo": "Juan Pérez Prueba", "genero": "M"}'
echo -e "\n"

echo ">>> PUT /api/registros/1 - Actualizar un registro"
curl -s -X PUT "$BASE_URL/api/registros/1" \
  -H "Content-Type: application/json" \
  -d '{
    "ubicacion_escuela_id_escuela": 1,
    "ubicacion_centro_id_centro": 1,
    "municipio_id_municipio": 1,
    "municipio_departamento_id_departamento": 1,
    "fecha": "2026-04-28",
    "tipo_tramite": "RENOVACION",
    "tipo_licencia": "B",
    "nombre_completo": "Juan Pérez Actualizado",
    "genero": "M"
  }' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/registros/1" \
  -H "Content-Type: application/json" \
  -d '{"ubicacion_escuela_id_escuela": 1, "ubicacion_centro_id_centro": 1, "municipio_id_municipio": 1, "municipio_departamento_id_departamento": 1, "fecha": "2026-04-28", "tipo_tramite": "RENOVACION", "tipo_licencia": "B", "nombre_completo": "Juan Pérez Actualizado", "genero": "M"}'
echo -e "\n"

echo ">>> DELETE /api/registros/99 - Eliminar un registro (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/registros/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/registros/99"
echo -e "\n"

# =============================================================================
# 9. CRUD - CORRELATIVOS (/api/correlativos)
# =============================================================================
echo "=========================================="
echo " 9. CRUD - CORRELATIVOS"
echo "=========================================="
echo ""

echo ">>> GET /api/correlativos - Listar todos los correlativos"
curl -s -X GET "$BASE_URL/api/correlativos" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/correlativos"
echo -e "\n"

echo ">>> GET /api/correlativos/1 - Obtener correlativo por ID"
curl -s -X GET "$BASE_URL/api/correlativos/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/correlativos/1"
echo -e "\n"

echo ">>> POST /api/correlativos - Crear un nuevo correlativo"
curl -s -X POST "$BASE_URL/api/correlativos" \
  -H "Content-Type: application/json" \
  -d '{"fecha": "2026-04-28", "no_examen": 1001}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/correlativos" \
  -H "Content-Type: application/json" \
  -d '{"fecha": "2026-04-28", "no_examen": 1001}'
echo -e "\n"

echo ">>> PUT /api/correlativos/1 - Actualizar un correlativo"
curl -s -X PUT "$BASE_URL/api/correlativos/1" \
  -H "Content-Type: application/json" \
  -d '{"fecha": "2026-04-28", "no_examen": 1002}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/correlativos/1" \
  -H "Content-Type: application/json" \
  -d '{"fecha": "2026-04-28", "no_examen": 1002}'
echo -e "\n"

echo ">>> DELETE /api/correlativos/99 - Eliminar un correlativo (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/correlativos/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/correlativos/99"
echo -e "\n"

# =============================================================================
# 10. CRUD - EXÁMENES (/api/examenes)
# =============================================================================
echo "=========================================="
echo " 10. CRUD - EXÁMENES"
echo "=========================================="
echo ""

echo ">>> GET /api/examenes - Listar todos los exámenes"
curl -s -X GET "$BASE_URL/api/examenes" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/examenes"
echo -e "\n"

echo ">>> GET /api/examenes/1 - Obtener examen por ID"
curl -s -X GET "$BASE_URL/api/examenes/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/examenes/1"
echo -e "\n"

echo ">>> POST /api/examenes - Crear un nuevo examen"
curl -s -X POST "$BASE_URL/api/examenes" \
  -H "Content-Type: application/json" \
  -d '{
    "registro_id_registro": 1,
    "correlativo_id_correlativo": 1,
    "registro_id_escuela": 1,
    "registro_id_centro": 1,
    "registro_municipio_id_municipio": 1,
    "registro_municipio_departamento_id_departamento": 1
  }' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/examenes" \
  -H "Content-Type: application/json" \
  -d '{"registro_id_registro": 1, "correlativo_id_correlativo": 1, "registro_id_escuela": 1, "registro_id_centro": 1, "registro_municipio_id_municipio": 1, "registro_municipio_departamento_id_departamento": 1}'
echo -e "\n"

echo ">>> PUT /api/examenes/1 - Actualizar un examen"
curl -s -X PUT "$BASE_URL/api/examenes/1" \
  -H "Content-Type: application/json" \
  -d '{
    "registro_id_registro": 1,
    "correlativo_id_correlativo": 2,
    "registro_id_escuela": 1,
    "registro_id_centro": 1,
    "registro_municipio_id_municipio": 1,
    "registro_municipio_departamento_id_departamento": 1
  }' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/examenes/1" \
  -H "Content-Type: application/json" \
  -d '{"registro_id_registro": 1, "correlativo_id_correlativo": 2, "registro_id_escuela": 1, "registro_id_centro": 1, "registro_municipio_id_municipio": 1, "registro_municipio_departamento_id_departamento": 1}'
echo -e "\n"

echo ">>> DELETE /api/examenes/99 - Eliminar un examen (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/examenes/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/examenes/99"
echo -e "\n"

# =============================================================================
# 11. CRUD - PREGUNTAS TEÓRICAS (/api/preguntas)
# =============================================================================
echo "=========================================="
echo " 11. CRUD - PREGUNTAS TEÓRICAS"
echo "=========================================="
echo ""

echo ">>> GET /api/preguntas - Listar todas las preguntas"
curl -s -X GET "$BASE_URL/api/preguntas" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/preguntas"
echo -e "\n"

echo ">>> GET /api/preguntas/1 - Obtener pregunta por ID"
curl -s -X GET "$BASE_URL/api/preguntas/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/preguntas/1"
echo -e "\n"

echo ">>> POST /api/preguntas - Crear una nueva pregunta"
curl -s -X POST "$BASE_URL/api/preguntas" \
  -H "Content-Type: application/json" \
  -d '{
    "pregunta_texto": "¿Cuál es la velocidad máxima en una zona escolar?",
    "respuesta_a": "30 km/h",
    "respuesta_b": "40 km/h",
    "respuesta_c": "50 km/h",
    "respuesta_d": "60 km/h",
    "respuesta_correcta": "A"
  }' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/preguntas" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "¿Cuál es la velocidad máxima en una zona escolar?", "respuesta_a": "30 km/h", "respuesta_b": "40 km/h", "respuesta_c": "50 km/h", "respuesta_d": "60 km/h", "respuesta_correcta": "A"}'
echo -e "\n"

echo ">>> PUT /api/preguntas/1 - Actualizar una pregunta"
curl -s -X PUT "$BASE_URL/api/preguntas/1" \
  -H "Content-Type: application/json" \
  -d '{
    "pregunta_texto": "¿Velocidad máxima en zona escolar?",
    "respuesta_a": "30 km/h",
    "respuesta_b": "40 km/h",
    "respuesta_c": "50 km/h",
    "respuesta_d": "60 km/h",
    "respuesta_correcta": "A"
  }' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/preguntas/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "¿Velocidad máxima en zona escolar?", "respuesta_a": "30 km/h", "respuesta_b": "40 km/h", "respuesta_c": "50 km/h", "respuesta_d": "60 km/h", "respuesta_correcta": "A"}'
echo -e "\n"

echo ">>> DELETE /api/preguntas/99 - Eliminar una pregunta (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/preguntas/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/preguntas/99"
echo -e "\n"

# =============================================================================
# 12. CRUD - PREGUNTAS PRÁCTICAS (/api/preguntas-practico)
# =============================================================================
echo "=========================================="
echo " 12. CRUD - PREGUNTAS PRÁCTICAS"
echo "=========================================="
echo ""

echo ">>> GET /api/preguntas-practico - Listar todas las preguntas prácticas"
curl -s -X GET "$BASE_URL/api/preguntas-practico" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/preguntas-practico"
echo -e "\n"

echo ">>> GET /api/preguntas-practico/1 - Obtener pregunta práctica por ID"
curl -s -X GET "$BASE_URL/api/preguntas-practico/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/preguntas-practico/1"
echo -e "\n"

echo ">>> POST /api/preguntas-practico - Crear una nueva pregunta práctica"
curl -s -X POST "$BASE_URL/api/preguntas-practico" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "Estacionamiento en paralelo", "punteo": 15}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/preguntas-practico" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "Estacionamiento en paralelo", "punteo": 15}'
echo -e "\n"

echo ">>> PUT /api/preguntas-practico/1 - Actualizar una pregunta práctica"
curl -s -X PUT "$BASE_URL/api/preguntas-practico/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "Estacionamiento en paralelo actualizado", "punteo": 20}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/preguntas-practico/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "Estacionamiento en paralelo actualizado", "punteo": 20}'
echo -e "\n"

echo ">>> DELETE /api/preguntas-practico/99 - Eliminar una pregunta práctica (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/preguntas-practico/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/preguntas-practico/99"
echo -e "\n"

# =============================================================================
# 13. CRUD - RESPUESTAS DE USUARIO (/api/respuestas-usuario)
# =============================================================================
echo "=========================================="
echo " 13. CRUD - RESPUESTAS DE USUARIO"
echo "=========================================="
echo ""

echo ">>> GET /api/respuestas-usuario - Listar todas las respuestas"
curl -s -X GET "$BASE_URL/api/respuestas-usuario" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/respuestas-usuario"
echo -e "\n"

echo ">>> GET /api/respuestas-usuario/1 - Obtener respuesta por ID"
curl -s -X GET "$BASE_URL/api/respuestas-usuario/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/respuestas-usuario/1"
echo -e "\n"

echo ">>> POST /api/respuestas-usuario - Crear una nueva respuesta"
curl -s -X POST "$BASE_URL/api/respuestas-usuario" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_id_pregunta": 1, "examen_id_examen": 1, "respuesta": "A"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/respuestas-usuario" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_id_pregunta": 1, "examen_id_examen": 1, "respuesta": "A"}'
echo -e "\n"

echo ">>> PUT /api/respuestas-usuario/1 - Actualizar una respuesta"
curl -s -X PUT "$BASE_URL/api/respuestas-usuario/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_id_pregunta": 1, "examen_id_examen": 1, "respuesta": "B"}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/respuestas-usuario/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_id_pregunta": 1, "examen_id_examen": 1, "respuesta": "B"}'
echo -e "\n"

echo ">>> DELETE /api/respuestas-usuario/99 - Eliminar una respuesta (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/respuestas-usuario/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/respuestas-usuario/99"
echo -e "\n"

# =============================================================================
# 14. CRUD - RESPUESTAS PRÁCTICAS (/api/respuestas-practico)
# =============================================================================
echo "=========================================="
echo " 14. CRUD - RESPUESTAS PRÁCTICAS"
echo "=========================================="
echo ""

echo ">>> GET /api/respuestas-practico - Listar todas las respuestas prácticas"
curl -s -X GET "$BASE_URL/api/respuestas-practico" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/respuestas-practico"
echo -e "\n"

echo ">>> GET /api/respuestas-practico/1 - Obtener respuesta práctica por ID"
curl -s -X GET "$BASE_URL/api/respuestas-practico/1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/respuestas-practico/1"
echo -e "\n"

echo ">>> POST /api/respuestas-practico - Crear una nueva respuesta práctica"
curl -s -X POST "$BASE_URL/api/respuestas-practico" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_practico_id_pregunta_practico": 1, "examen_id_examen": 1, "nota": 85}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/respuestas-practico" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_practico_id_pregunta_practico": 1, "examen_id_examen": 1, "nota": 85}'
echo -e "\n"

echo ">>> PUT /api/respuestas-practico/1 - Actualizar una respuesta práctica"
curl -s -X PUT "$BASE_URL/api/respuestas-practico/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_practico_id_pregunta_practico": 1, "examen_id_examen": 1, "nota": 90}' | python3 -m json.tool 2>/dev/null || \
curl -s -X PUT "$BASE_URL/api/respuestas-practico/1" \
  -H "Content-Type: application/json" \
  -d '{"pregunta_practico_id_pregunta_practico": 1, "examen_id_examen": 1, "nota": 90}'
echo -e "\n"

echo ">>> DELETE /api/respuestas-practico/99 - Eliminar una respuesta práctica (ejemplo con ID 99)"
curl -s -X DELETE "$BASE_URL/api/respuestas-practico/99" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/respuestas-practico/99"
echo -e "\n"

# =============================================================================
# 15. CONSULTAS ESTADÍSTICAS (/api/estadisticas)
# =============================================================================
echo "=========================================="
echo " 15. CONSULTAS ESTADÍSTICAS"
echo "=========================================="
echo ""

echo ">>> GET /api/estadisticas/consulta1 - Estadísticas por centro y escuela"
echo "    Salida: nombre_centro, nombre_escuela, total_examenes, promedio_teorico, promedio_practico, aprobados"
curl -s -X GET "$BASE_URL/api/estadisticas/consulta1" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/estadisticas/consulta1"
echo -e "\n"

echo ">>> GET /api/estadisticas/consulta2 - Ranking de evaluados por resultado final"
echo "    Salida: ranking, nombre_completo, punteo_total, resultado"
curl -s -X GET "$BASE_URL/api/estadisticas/consulta2" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/estadisticas/consulta2"
echo -e "\n"

echo ">>> GET /api/estadisticas/consulta3 - Pregunta(s) con menor porcentaje de aciertos"
echo "    Salida: id_pregunta, pregunta_texto, total_respuestas, respuestas_correctas, porcentaje_aciertos"
curl -s -X GET "$BASE_URL/api/estadisticas/consulta3" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/estadisticas/consulta3"
echo -e "\n"

# =============================================================================
# 16. PRUEBAS DE ERROR - Casos de error HTTP
# =============================================================================
echo "=========================================="
echo " 16. PRUEBAS DE ERROR (HTTP 400, 404, 500)"
echo "=========================================="
echo ""

echo ">>> GET /api/centros/9999 - Centro no encontrado (404)"
curl -s -X GET "$BASE_URL/api/centros/9999" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/centros/9999"
echo -e "\n"

echo ">>> POST /api/centros - Body incompleto (400)"
curl -s -X POST "$BASE_URL/api/centros" \
  -H "Content-Type: application/json" \
  -d '{}' | python3 -m json.tool 2>/dev/null || \
curl -s -X POST "$BASE_URL/api/centros" \
  -H "Content-Type: application/json" \
  -d '{}'
echo -e "\n"

echo ">>> DELETE /api/centros/9999 - Centro no encontrado (404)"
curl -s -X DELETE "$BASE_URL/api/centros/9999" | python3 -m json.tool 2>/dev/null || curl -s -X DELETE "$BASE_URL/api/centros/9999"
echo -e "\n"

echo ">>> GET /api/ruta-inexistente - Ruta no encontrada (404)"
curl -s -X GET "$BASE_URL/api/ruta-inexistente" | python3 -m json.tool 2>/dev/null || curl -s -X GET "$BASE_URL/api/ruta-inexistente"
echo -e "\n"

echo "=========================================="
echo "  PRUEBAS COMPLETADAS"
echo "=========================================="
echo ""
echo "Revisa las respuestas arriba para verificar"
echo "que todos los endpoints funcionan correctamente."
echo ""

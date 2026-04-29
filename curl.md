# Guía Rápida de Consultas Manuales con cURL

API REST — Centros de Evaluación de Manejo (SBD1)
`http://localhost:3000`

---

## 📖 Sintaxis básica

```bash
# GET  - Obtener/listar datos
curl http://localhost:3000/api/centros

# POST   - Crear un nuevo registro
curl -X POST http://localhost:3000/api/centros \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Mi Centro"}'

# PUT    - Actualizar un registro existente
curl -X PUT http://localhost:3000/api/centros/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Actualizado"}'

# DELETE - Eliminar un registro
curl -X DELETE http://localhost:3000/api/centros/99
```

> 💡 **Tips:** Agrega `| python3 -m json.tool` al final para ver el JSON formateado.
> Usa `-s` (silent) para ocultar barras de progreso: `curl -s http://...`

---

## 📋 Tablas y sus endpoints

| # | Tabla | Ruta | ID |
|---|-------|------|----|
| 1 | Centros | `/api/centros` | numérico |
| 2 | Escuelas | `/api/escuelas` | numérico |
| 3 | Licencias | `/api/licencias` | texto (A, B, C) |
| 4 | Departamentos | `/api/departamentos` | numérico |
| 5 | Municipios | `/api/municipios` | numérico |
| 6 | Ubicaciones | `/api/ubicaciones` | compuesto (escuela/centro) |
| 7 | Registros | `/api/registros` | numérico |
| 8 | Correlativos | `/api/correlativos` | numérico |
| 9 | Exámenes | `/api/examenes` | numérico |
| 10 | Preguntas teóricas | `/api/preguntas` | numérico |
| 11 | Preguntas prácticas | `/api/preguntas-practico` | numérico |
| 12 | Respuestas usuario | `/api/respuestas-usuario` | numérico |
| 13 | Respuestas prácticas | `/api/respuestas-practico` | numérico |

---

## 🔍 Consultas rápidas (copia y pega)

### Listar todo
```bash
curl -s http://localhost:3000/api/centros | python3 -m json.tool
curl -s http://localhost:3000/api/escuelas | python3 -m json.tool
curl -s http://localhost:3000/api/licencias | python3 -m json.tool
curl -s http://localhost:3000/api/preguntas | python3 -m json.tool
```

### Obtener por ID
```bash
curl -s http://localhost:3000/api/centros/1 | python3 -m json.tool
curl -s http://localhost:3000/api/licencias/A | python3 -m json.tool
curl -s http://localhost:3000/api/ubicaciones/1/1 | python3 -m json.tool
```

### Crear registros
```bash
# Centro
curl -s -X POST http://localhost:3000/api/centros \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Centro Zona 1"}' | python3 -m json.tool

# Escuela
curl -s -X POST http://localhost:3000/api/escuelas \
  -H "Content-Type: application/json" \
  -d '{"nombre": "AutoEscuela Central", "direccion": "5a Calle 2-30, Zona 1", "acuerdo": "AC-001"}' | python3 -m json.tool

# Pregunta teórica
curl -s -X POST http://localhost:3000/api/preguntas \
  -H "Content-Type: application/json" \
  -d '{"pregunta_texto": "¿Color del semáforo en alto?", "respuesta_a": "Verde", "respuesta_b": "Rojo", "respuesta_c": "Amarillo", "respuesta_d": "Azul", "respuesta_correcta": "B"}' | python3 -m json.tool
```

### Actualizar
```bash
curl -s -X PUT http://localhost:3000/api/centros/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Nuevo Nombre"}' | python3 -m json.tool
```

### Eliminar
```bash
curl -s -X DELETE http://localhost:3000/api/centros/99 | python3 -m json.tool
```

---

## 📊 Consultas estadísticas

```bash
# Consulta 1: Estadísticas por centro y escuela
curl -s http://localhost:3000/api/estadisticas/consulta1 | python3 -m json.tool

# Consulta 2: Ranking de evaluados
curl -s http://localhost:3000/api/estadisticas/consulta2 | python3 -m json.tool

# Consulta 3: Pregunta con menor % de aciertos
curl -s http://localhost:3000/api/estadisticas/consulta3 | python3 -m json.tool
```

---

## ✅ Health check

```bash
curl -s http://localhost:3000/health | python3 -m json.tool
```

Respuesta esperada:
```json
{
    "status": "OK",
    "database": "Oracle XE",
    "timestamp": "2026-04-29T00:17:41.560Z"
}
```

---

## ⚠️ Pruebas de error

```bash
# 404 - Recurso no encontrado
curl -s http://localhost:3000/api/centros/9999 | python3 -m json.tool

# 400 - Body incompleto (falta campo obligatorio)
curl -s -X POST http://localhost:3000/api/centros \
  -H "Content-Type: application/json" \
  -d '{}' | python3 -m json.tool
```

---

## 🚀 Script automatizado

Para probar **todos los endpoints** de una sola vez:

```bash
chmod +x curl_documentation.sh
./curl_documentation.sh
```

Esto ejecuta ~70 peticiones organizadas en 16 secciones (CRUD + estadísticas + errores).

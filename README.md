# SBD1 — Proyecto 2: Centros de Evaluación de Manejo

API REST para la gestión de Centros de Evaluación de Manejo de Guatemala, desarrollada con Node.js, Express y Oracle Database XE.

**Universidad San Carlos de Guatemala — Facultad de Ingeniería — ECYS**

## Stack Tecnológico

| Componente | Tecnología |
|---|---|
| Base de datos | Oracle Database XE 21c (Docker) |
| Backend | Node.js + Express |
| Cliente BD | DBeaver |
| Pruebas | Postman |

## Estructura del Proyecto

```
SBD1B_1S2026_202300625/
├── docker-compose.yml          # Orquestación de servicios
├── db/
│   └── init.sql                # DDL + datos semilla
├── api/
│   ├── Dockerfile              # Imagen del backend
│   ├── index.js                # Entry point Express
│   ├── db.js                   # Conexión a Oracle
│   ├── routes/                 # Rutas CRUD por tabla
│   └── controllers/            # Lógica de negocio
├── postman/
│   └── coleccion.json          # Colección Postman
└── README.md
```

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose instalados
- [DBeaver](https://dbeaver.io/) (opcional, para validar la BD)
- [Postman](https://www.postman.com/) (opcional, para probar endpoints)

## Guía de Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd SBD1B_1S2026_202300625
```

### 2. Configurar variables de entorno

Crear el archivo `.env` en la raíz del proyecto:

```env
# Oracle
ORACLE_PASSWORD=YourStrongPassword1
DB_USER=system
DB_PASSWORD=YourStrongPassword1
ORACLE_PORT=1521
DB_SERVICE=XE

# API
API_PORT=3000
```

> **Importante:** Cambiar `YourStrongPassword1` por una contraseña segura.

### 3. Levantar los servicios con Docker Compose

```bash
docker-compose up -d
```

Esto iniciará dos contenedores:
- **oracle-xe**: Oracle Database XE 21c en el puerto `1521`
- **sbd1-api**: API REST en el puerto `3000`

> **Nota:** La primera ejecución puede tardar varios minutos mientras Oracle se inicializa y ejecuta el script DDL automáticamente.

### 4. Verificar el estado

```bash
docker-compose ps
```

Ambos servicios deben mostrar estado `healthy` o `Up`.

```bash
# Verificar logs de la API
docker-compose logs api
```

```
✅ Conexión exitosa a Oracle XE
🚀 API corriendo en http://localhost:3000
```

### 5. Probar la API

```bash
curl http://localhost:3000/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "database": "Oracle XE",
  "timestamp": "2026-04-25T..."
}
```

## Conexión desde DBeaver

1. Nueva conexión → **Oracle**
2. Configurar los siguientes parámetros:

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Port | `1521` |
| Database / Service | `XE` |
| Username | `system` |
| Password | La definida en `.env` (`ORACLE_PASSWORD`) |

3. Hacer clic en **Test Connection** y luego **Finish**

Las tablas deben aparecer en el esquema `SYSTEM`:
- `LICENCIA`, `DEPARTAMENTO`, `MUNICIPIO`, `CENTRO_EVAL`, `ESCUELA_AUTOMOV`
- `UBICACION`, `REGISTRO`, `CORRELATIVO`, `EXAMEN`
- `PREGUNTA`, `PREGUNTA_PRACTICO`, `RESPUESTA_USUARIO`, `RESPUESTA_PRACTICO_USUARIO`

## Endpoints de la API

### Health Check

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado de la API |

### CRUD (13 tablas)

Cada tabla tiene endpoints listar, obtener, crear, actualizar y eliminar:

| Método | Ruta | Acción |
|---|---|---|
| GET | `/api/<tabla>` | Listar todos |
| GET | `/api/<tabla>/:id` | Obtener por ID |
| POST | `/api/<tabla>` | Crear registro |
| PUT | `/api/<tabla>/:id` | Actualizar registro |
| DELETE | `/api/<tabla>/:id` | Eliminar registro |

**Tablas disponibles:**

| Ruta | Tabla |
|---|---|
| `/api/centros` | CENTRO_EVAL |
| `/api/escuelas` | ESCUELA_AUTOMOV |
| `/api/licencias` | LICENCIA |
| `/api/departamentos` | DEPARTAMENTO |
| `/api/municipios` | MUNICIPIO |
| `/api/ubicaciones` | UBICACION |
| `/api/registros` | REGISTRO |
| `/api/correlativos` | CORRELATIVO |
| `/api/examenes` | EXAMEN |
| `/api/preguntas` | PREGUNTA |
| `/api/preguntas-practico` | PREGUNTA_PRACTICO |
| `/api/respuestas-usuario` | RESPUESTA_USUARIO |
| `/api/respuestas-practico` | RESPUESTA_PRACTICO_USUARIO |

### Consultas Estadísticas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estadisticas/consulta1` | Estadísticas de evaluaciones por centro y escuela |
| GET | `/api/estadisticas/consulta2` | Ranking de evaluados por resultado final |
| GET | `/api/estadisticas/consulta3` | Pregunta(s) del examen teórico con menor porcentaje de aciertos |

## Pruebas con Postman

1. Abrir Postman
2. Importar la colección desde `postman/coleccion.json`
3. Configurar la variable `base_url` a `http://localhost:3000`
4. Ejecutar las peticiones

## Detener los servicios

```bash
docker-compose down
```

Para eliminar también el volumen de datos:

```bash
docker-compose down -v
```

## Capturas de Pantalla

<!-- TODO: Agregar capturas de pantalla del funcionamiento -->
<!-- - docker-compose up corriendo sin errores -->
<!-- - DBeaver mostrando las tablas -->
<!-- - Postman con respuestas exitosas y de error -->

---

**Carnet:** 202300625

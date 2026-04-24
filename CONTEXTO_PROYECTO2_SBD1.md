# Contexto del Proyecto 2 — Sistemas de Bases de Datos 1 (SBD1)
**Universidad San Carlos de Guatemala — Facultad de Ingeniería — ECYS**

---

## 1. Resumen del Proyecto

El proyecto consiste en construir un **backend completo con exposición de servicios REST** para una base de datos Oracle que modela los **Centros de Evaluación de Manejo de Guatemala**. Es la continuación de las Prácticas 1 y 2 (donde ya se diseñó el modelo relacional y el DDL).

- **Ponderación:** 35.72 puntos del curso
- **Fecha límite de entrega:** 30 de abril de 2026
- **Calificación:** 2 y 3 de mayo de 2026
- **Modalidad:** Individual (plagio = 0 pts automático)

---

## 2. Stack Tecnológico Obligatorio

| Componente | Tecnología |
|---|---|
| Base de datos | Oracle Database XE (en Docker) |
| Contenerización | Docker + Docker Compose |
| Backend / API | Node.js + Express |
| Cliente BD (validación) | DBeaver |
| Pruebas de endpoints | Postman |
| Versionamiento | Git + GitHub (repositorio privado) |

> ⚠️ Usar una base de datos distinta a Oracle penaliza **-50%**.

---

## 3. Estructura del Repositorio GitHub

- **Nombre del repo:** `SBD1B_1S2026_#carnet`
- **Visibilidad:** Privado
- **Colaboradores obligatorios:**
  - Auxiliar 1: `parguet`
  - Auxiliar 2: `Tefy1317`
- **Debe incluir historial de commits** del estudiante (no solo un commit final)

### Estructura de carpetas sugerida

```
SBD1B_1S2026_#carnet/
├── docker-compose.yml
├── db/
│   └── init.sql              ← DDL completo de la Práctica 1
├── api/
│   ├── package.json
│   ├── index.js              ← Entry point Express
│   ├── routes/               ← Un archivo por tabla
│   └── controllers/          ← Lógica de cada ruta
├── postman/
│   └── coleccion.json        ← Colección exportada de Postman
└── README.md
```

---

## 4. Entregables Detallados

### 4.1 `docker-compose.yml`
- Debe levantar el contenedor de **Oracle XE**
- Configurar **variables de entorno** para credenciales y puertos
- Establecer un **volumen de persistencia** de datos
- Montar el script DDL para que se ejecute automáticamente al iniciar

### 4.2 Script SQL (`db/init.sql`)
- DDL completo de la Práctica 1 (tablas, constraints, secuencias, etc.)
- Se debe cargar **automáticamente** al iniciar el contenedor, sin intervención manual

### 4.3 API REST en Node.js/Express
- **Endpoints CRUD** para **todas** las tablas del modelo relacional
- **3 endpoints de consultas estadísticas** (ver sección 6)
- Manejo correcto de errores HTTP (400, 404, 500, etc.)
- Código limpio y bien organizado

### 4.4 `README.md`
Debe incluir:
- Descripción del proyecto
- Guía paso a paso para levantar con Docker (`docker-compose up`)
- Instrucciones para conectarse desde DBeaver
- Capturas de pantalla como evidencia de funcionamiento

### 4.5 Colección de Postman (`postman/coleccion.json`)
- Todas las peticiones CRUD de cada tabla
- Las 3 consultas estadísticas
- Ejemplos de respuesta exitosa **y** de error

---

## 5. Endpoints CRUD Requeridos

Para **cada tabla del modelo relacional**, implementar:

| Método HTTP | Ruta sugerida | Acción |
|---|---|---|
| `GET` | `/api/<tabla>` | Listar todos los registros |
| `GET` | `/api/<tabla>/:id` | Obtener uno por ID |
| `POST` | `/api/<tabla>` | Crear nuevo registro |
| `PUT` | `/api/<tabla>/:id` | Actualizar registro |
| `DELETE` | `/api/<tabla>/:id` | Eliminar registro |

---

## 6. Consultas Estadísticas (Endpoints Especiales)

### Consulta 1 — Estadísticas de evaluaciones por centro y escuela
**Salida esperada:**
- Nombre del centro de evaluación
- Nombre de la escuela de manejo (si aplica)
- Total de exámenes realizados
- Promedio del examen teórico
- Promedio del examen práctico
- Cantidad de aprobados

### Consulta 2 — Ranking de evaluados por resultado final
- Listado de evaluados ordenados por su resultado final (de mayor a menor punteo)
- Debe incluir la lógica de ordenamiento y mostrar el ranking numérico

### Consulta 3 — Identificación de la pregunta con menor aciertos
- Encontrar la(s) pregunta(s) del examen teórico con el menor porcentaje de respuestas correctas
- La salida **debe incluir el porcentaje de aciertos**

---

## 7. Modelo de Dominio (Contexto del Negocio)

Los **Centros de Evaluación de Manejo** en Guatemala gestionan el proceso de obtención de licencias de conducir. El sistema maneja:

- **Centros de evaluación** (ubicaciones físicas donde se realizan los exámenes)
- **Escuelas de manejo** (instituciones que forman a los aspirantes)
- **Aspirantes / evaluados** (personas que solicitan su licencia)
- **Exámenes teóricos** (preguntas de opción múltiple sobre reglas de tránsito)
- **Exámenes prácticos** (prueba de manejo en campo)
- **Preguntas** (banco de preguntas del examen teórico)
- **Resultados** (punteos, aprobación/reprobación)

> El DDL exacto depende del modelo diseñado en la Práctica 1. Los endpoints CRUD deben cubrir **todas** las tablas definidas ahí.

---

## 8. Configuración Docker — Guía de Referencia

```yaml
# docker-compose.yml (estructura base sugerida)
version: '3.8'
services:
  oracle-db:
    image: container-registry.oracle.com/database/express:21.3.0-xe
    environment:
      ORACLE_PWD: ${ORACLE_PASSWORD}
      ORACLE_CHARACTERSET: AL32UTF8
    ports:
      - "${ORACLE_PORT:-1521}:1521"
    volumes:
      - oracle_data:/opt/oracle/oradata
      - ./db/init.sql:/container-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "sqlplus", "-L", "sys/${ORACLE_PASSWORD}@//localhost:1521/XE as sysdba", "@/dev/null"]
      interval: 30s
      timeout: 10s
      retries: 20

  api:
    build: ./api
    environment:
      DB_HOST: oracle-db
      DB_PORT: 1521
      DB_SERVICE: XE
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      PORT: ${API_PORT:-3000}
    ports:
      - "${API_PORT:-3000}:3000"
    depends_on:
      oracle-db:
        condition: service_healthy

volumes:
  oracle_data:
```

```env
# .env (no subir a GitHub — agregar al .gitignore)
ORACLE_PASSWORD=YourStrongPassword1
DB_USER=system
DB_PASSWORD=YourStrongPassword1
ORACLE_PORT=1521
API_PORT=3000
```

---

## 9. Conexión desde Node.js a Oracle

```javascript
// Instalar: npm install oracledb express dotenv
const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`
};

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}
```

> **Nota:** `oracledb` requiere las Oracle Instant Client libraries. En Docker, esto se maneja incluyendo un Dockerfile para el servicio `api` que instale las dependencias necesarias.

---

## 10. Conexión desde DBeaver

1. Nueva conexión → Oracle
2. **Host:** `localhost`
3. **Port:** `1521`
4. **Database/Service:** `XE`
5. **User:** `system` (o el usuario creado en el DDL)
6. **Password:** la definida en `.env`

---

## 11. Rúbrica de Calificación

| Área | Puntos |
|---|---|
| Configuración Docker y Docker Compose (BD + persistencia) | 10 |
| Inicialización automática del DDL al iniciar el contenedor | 5 |
| Calidad de código en la API | 5 |
| Endpoints CRUD para todas las tablas | 10 |
| Preguntas teóricas (durante calificación oral) | 10 |
| **Sub-Total Habilidades** | **40** |
| Consulta 1 — Estadísticas por centro y escuela | 10 |
| Consulta 2 — Ranking de evaluados | 10 |
| Consulta 3 — Pregunta con menor aciertos | 10 |
| Pruebas en Postman | 30 |
| **Sub-Total Conocimiento** | **60** |
| **TOTAL** | **100** |

---

## 12. Penalizaciones Importantes

| Motivo | Penalización |
|---|---|
| Plagio o copia (total o parcial) | -100% (nota = 0) |
| Documentación sospechosamente similar a la de otro estudiante | -20% |
| Entrega tardía | -100% |
| Docker/Oracle no levantado al iniciar la calificación | -30% |
| Usar BD distinta a Oracle | -50% |
| No saber explicar el código o las consultas | -30% |

---

## 13. Checklist Final Antes de Entregar

- [ ] `docker-compose up` levanta todo sin errores
- [ ] El DDL se carga automáticamente (tablas visibles en DBeaver sin scripts manuales)
- [ ] Todos los endpoints CRUD responden correctamente en Postman
- [ ] Las 3 consultas estadísticas retornan los campos exactos pedidos
- [ ] El README explica cómo levantar el sistema paso a paso
- [ ] El README incluye capturas de pantalla de funcionamiento
- [ ] La colección de Postman está exportada como JSON en el repo
- [ ] El auxiliar fue agregado como colaborador en GitHub
- [ ] El `.env` está en `.gitignore` (nunca subir credenciales)
- [ ] Hay historial de commits (no un solo commit al final)
- [ ] Cámara y micrófono listos para la calificación virtual

---

## 14. Recursos Útiles

- [Video: Oracle 21c XE en Docker](https://www.youtube.com/watch?v=-UCwWSqcsCo)
- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [Documentación Express.js](https://expressjs.com/)
- [node-oracledb en npm](https://www.npmjs.com/package/oracledb)
- [Manual SQL Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/)
- [Postman — Exportar colecciones](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)

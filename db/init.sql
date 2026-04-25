-- ============================================================
-- SBD1 Proyecto 2 - DDL + Seed Data
-- Compatible con Oracle XE 21c & Docker gvenzl/oracle-xe
-- ============================================================

-- 1. LIMPIEZA (Orden inverso a dependencias)
DROP TABLE RESPUESTA_PRACTICO_USUARIO CASCADE CONSTRAINTS;
DROP TABLE RESPUESTA_USUARIO CASCADE CONSTRAINTS;
DROP TABLE PREGUNTA_PRACTICO CASCADE CONSTRAINTS;
DROP TABLE PREGUNTA CASCADE CONSTRAINTS;
DROP TABLE EXAMEN CASCADE CONSTRAINTS;
DROP TABLE CORRELATIVO CASCADE CONSTRAINTS;
DROP TABLE REGISTRO CASCADE CONSTRAINTS;
DROP TABLE UBICACION CASCADE CONSTRAINTS;
DROP TABLE ESCUELA_AUTOMOV CASCADE CONSTRAINTS;
DROP TABLE CENTRO_EVAL CASCADE CONSTRAINTS;
DROP TABLE MUNICIPIO CASCADE CONSTRAINTS;
DROP TABLE DEPARTAMENTO CASCADE CONSTRAINTS;
DROP TABLE LICENCIA CASCADE CONSTRAINTS;

-- 2. CREACIÓN DE TABLAS (PKs Autoincrementales + Tipos Corregidos)
CREATE TABLE LICENCIA (
    codigo      CHAR(1) PRIMARY KEY,
    descripcion VARCHAR2(100) NOT NULL
);

CREATE TABLE DEPARTAMENTO (
    id_departamento NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre          VARCHAR2(50) NOT NULL,
    codigo          VARCHAR2(2) NOT NULL
);

CREATE TABLE MUNICIPIO (
    id_municipio                 NUMBER GENERATED ALWAYS AS IDENTITY,
    departamento_id_departamento NUMBER NOT NULL,
    nombre                       VARCHAR2(50) NOT NULL,
    codigo                       VARCHAR2(2) NOT NULL,
    CONSTRAINT MUNICIPIO_PK PRIMARY KEY (id_municipio, departamento_id_departamento),
    CONSTRAINT MUNICIPIO_DEPARTAMENTO_FK FOREIGN KEY (departamento_id_departamento) REFERENCES DEPARTAMENTO(id_departamento)
);

CREATE TABLE CENTRO_EVAL (
    no_centro NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre    VARCHAR2(100) NOT NULL
);

CREATE TABLE ESCUELA_AUTOMOV (
    no_aut    NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre    VARCHAR2(100) NOT NULL,
    direccion VARCHAR2(150) NOT NULL,
    acuerdo   VARCHAR2(20) NOT NULL
);

CREATE TABLE UBICACION (
    escuela_id_escuela NUMBER NOT NULL,
    centro_id_centro   NUMBER NOT NULL,
    CONSTRAINT UBICACION_PK PRIMARY KEY (escuela_id_escuela, centro_id_centro),
    CONSTRAINT UBICACION_ESCUELA_FK FOREIGN KEY (escuela_id_escuela) REFERENCES ESCUELA_AUTOMOV(no_aut),
    CONSTRAINT UBICACION_CENTRO_FK FOREIGN KEY (centro_id_centro) REFERENCES CENTRO_EVAL(no_centro)
);

CREATE TABLE REGISTRO (
    id_registro                            NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ubicacion_escuela_id_escuela           NUMBER NOT NULL,
    ubicacion_centro_id_centro             NUMBER NOT NULL,
    municipio_id_municipio                 NUMBER NOT NULL,
    municipio_departamento_id_departamento NUMBER NOT NULL,
    fecha                                  DATE NOT NULL,
    tipo_tramite                           VARCHAR2(50) NOT NULL,
    tipo_licencia                          CHAR(1) NOT NULL,
    nombre_completo                        VARCHAR2(100) NOT NULL,
    genero                                 CHAR(1) NOT NULL,
    CONSTRAINT REGISTRO_UBICACION_FK FOREIGN KEY (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro) REFERENCES UBICACION(escuela_id_escuela, centro_id_centro),
    CONSTRAINT REGISTRO_MUNICIPIO_FK FOREIGN KEY (municipio_id_municipio, municipio_departamento_id_departamento) REFERENCES MUNICIPIO(id_municipio, departamento_id_departamento),
    CONSTRAINT REGISTRO_LICENCIA_FK FOREIGN KEY (tipo_licencia) REFERENCES LICENCIA(codigo)
);

CREATE TABLE CORRELATIVO (
    id_correlativo NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha          DATE NOT NULL,
    no_examen      NUMBER NOT NULL
);

CREATE TABLE EXAMEN (
    id_examen                                       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    registro_id_registro                            NUMBER NOT NULL,
    correlativo_id_correlativo                      NUMBER NOT NULL,
    registro_id_escuela                             NUMBER NOT NULL,
    registro_id_centro                              NUMBER NOT NULL,
    registro_municipio_id_municipio                 NUMBER NOT NULL,
    registro_municipio_departamento_id_departamento NUMBER NOT NULL,
    CONSTRAINT EXAMEN_REGISTRO_FK FOREIGN KEY (registro_id_registro) REFERENCES REGISTRO(id_registro),
    CONSTRAINT EXAMEN_CORRELATIVO_FK FOREIGN KEY (correlativo_id_correlativo) REFERENCES CORRELATIVO(id_correlativo)
);

CREATE TABLE PREGUNTA (
    id_pregunta        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pregunta_texto     VARCHAR2(300) NOT NULL,
    respuesta_a        VARCHAR2(200) NOT NULL,
    respuesta_b        VARCHAR2(200) NOT NULL,
    respuesta_c        VARCHAR2(200) NOT NULL,
    respuesta_d        VARCHAR2(200),
    respuesta_correcta VARCHAR2(1) NOT NULL
);

CREATE TABLE PREGUNTA_PRACTICO (
    id_pregunta_practico NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pregunta_texto       VARCHAR2(200) NOT NULL,
    punteo               NUMBER NOT NULL
);

CREATE TABLE RESPUESTA_USUARIO (
    id_respuesta_usuario NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pregunta_id_pregunta NUMBER NOT NULL,
    examen_id_examen     NUMBER NOT NULL,
    respuesta            VARCHAR2(1) NOT NULL,
    CONSTRAINT RESP_USU_PREGUNTA_FK FOREIGN KEY (pregunta_id_pregunta) REFERENCES PREGUNTA(id_pregunta),
    CONSTRAINT RESP_USU_EXAMEN_FK FOREIGN KEY (examen_id_examen) REFERENCES EXAMEN(id_examen)
);

CREATE TABLE RESPUESTA_PRACTICO_USUARIO (
    id_respuesta_practico                  NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pregunta_practico_id_pregunta_practico NUMBER NOT NULL,
    examen_id_examen                       NUMBER NOT NULL,
    nota                                   NUMBER NOT NULL,
    CONSTRAINT RESP_PRAC_PREGUNTA_FK FOREIGN KEY (pregunta_practico_id_pregunta_practico) REFERENCES PREGUNTA_PRACTICO(id_pregunta_practico),
    CONSTRAINT RESP_PRAC_EXAMEN_FK FOREIGN KEY (examen_id_examen) REFERENCES EXAMEN(id_examen)
);

-- 3. CARGA DE DATOS (Seed desde JSON, orden estricto por FKs)
-- LICENCIA (Faltaba en el JSON, requerida por REGISTRO)
INSERT INTO LICENCIA (codigo, descripcion) VALUES ('A', 'Motocicleta');
INSERT INTO LICENCIA (codigo, descripcion) VALUES ('B', 'Automóvil particular');
INSERT INTO LICENCIA (codigo, descripcion) VALUES ('C', 'Camión/Vehículo pesado');

-- DEPARTAMENTO
INSERT INTO DEPARTAMENTO (nombre, codigo) VALUES ('Guatemala', '01');
INSERT INTO DEPARTAMENTO (nombre, codigo) VALUES ('Sacatepéquez', '03');
INSERT INTO DEPARTAMENTO (nombre, codigo) VALUES ('Escuintla', '05');

-- MUNICIPIO
INSERT INTO MUNICIPIO (departamento_id_departamento, nombre, codigo) VALUES (1, 'Guatemala', '01');
INSERT INTO MUNICIPIO (departamento_id_departamento, nombre, codigo) VALUES (1, 'Mixco', '02');
INSERT INTO MUNICIPIO (departamento_id_departamento, nombre, codigo) VALUES (1, 'Villa Nueva', '03');
INSERT INTO MUNICIPIO (departamento_id_departamento, nombre, codigo) VALUES (3, 'Escuintla', '01');
INSERT INTO MUNICIPIO (departamento_id_departamento, nombre, codigo) VALUES (2, 'Antigua Guatemala', '01');

-- CENTRO_EVAL
INSERT INTO CENTRO_EVAL (nombre) VALUES ('Centro de Evaluación Zona 12');
INSERT INTO CENTRO_EVAL (nombre) VALUES ('Centro de Evaluación Antigua Guatemala');
INSERT INTO CENTRO_EVAL (nombre) VALUES ('Centro de Evaluación Escuintla');

-- ESCUELA_AUTOMOV
INSERT INTO ESCUELA_AUTOMOV (nombre, direccion, acuerdo) VALUES ('Escuela de Manejo AutoMaster', 'Avenida Reforma 15-45, Zona 10', 'ESC-AM-001');
INSERT INTO ESCUELA_AUTOMOV (nombre, direccion, acuerdo) VALUES ('Academia Vial GuateDrive', 'Boulevard Los Próceres 18-20, Zona 10', 'ESC-GD-002');
INSERT INTO ESCUELA_AUTOMOV (nombre, direccion, acuerdo) VALUES ('Instituto de Conducción Segura', 'Calzada Roosevelt 25-30, Zona 11', 'ESC-ICS-003');

-- UBICACION
INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (1, 1);
INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (1, 2);
INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (2, 1);
INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (3, 2);
INSERT INTO UBICACION (escuela_id_escuela, centro_id_centro) VALUES (3, 3);

-- REGISTRO
INSERT INTO REGISTRO (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro, municipio_id_municipio, municipio_departamento_id_departamento, fecha, tipo_tramite, tipo_licencia, nombre_completo, genero)
VALUES (1, 1, 1, 1, TO_DATE('2025-01-15', 'YYYY-MM-DD'), 'Licencia de Conducir', 'A', 'Juan Carlos López García', 'M');
INSERT INTO REGISTRO (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro, municipio_id_municipio, municipio_departamento_id_departamento, fecha, tipo_tramite, tipo_licencia, nombre_completo, genero)
VALUES (1, 2, 2, 1, TO_DATE('2025-01-15', 'YYYY-MM-DD'), 'Licencia de Conducir', 'B', 'María Elena Rodríguez Morales', 'F');
INSERT INTO REGISTRO (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro, municipio_id_municipio, municipio_departamento_id_departamento, fecha, tipo_tramite, tipo_licencia, nombre_completo, genero)
VALUES (2, 1, 3, 1, TO_DATE('2025-01-16', 'YYYY-MM-DD'), 'Licencia de Conducir', 'A', 'Carlos Alberto Méndez Castillo', 'M');
INSERT INTO REGISTRO (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro, municipio_id_municipio, municipio_departamento_id_departamento, fecha, tipo_tramite, tipo_licencia, nombre_completo, genero)
VALUES (3, 3, 4, 3, TO_DATE('2025-01-17', 'YYYY-MM-DD'), 'Licencia de Conducir', 'A', 'Ana Sofía Guerrero Díaz', 'F');
INSERT INTO REGISTRO (ubicacion_escuela_id_escuela, ubicacion_centro_id_centro, municipio_id_municipio, municipio_departamento_id_departamento, fecha, tipo_tramite, tipo_licencia, nombre_completo, genero)
VALUES (2, 2, 5, 2, TO_DATE('2025-01-18', 'YYYY-MM-DD'), 'Licencia de Conducir', 'B', 'Pedro José Hernández Ruiz', 'M');

-- CORRELATIVO
INSERT INTO CORRELATIVO (fecha, no_examen) VALUES (TO_DATE('2025-01-15', 'YYYY-MM-DD'), 1);
INSERT INTO CORRELATIVO (fecha, no_examen) VALUES (TO_DATE('2025-01-15', 'YYYY-MM-DD'), 2);
INSERT INTO CORRELATIVO (fecha, no_examen) VALUES (TO_DATE('2025-01-16', 'YYYY-MM-DD'), 3);
INSERT INTO CORRELATIVO (fecha, no_examen) VALUES (TO_DATE('2025-01-17', 'YYYY-MM-DD'), 4);
INSERT INTO CORRELATIVO (fecha, no_examen) VALUES (TO_DATE('2025-01-18', 'YYYY-MM-DD'), 5);

-- EXAMEN
INSERT INTO EXAMEN (registro_id_registro, correlativo_id_correlativo, registro_id_escuela, registro_id_centro, registro_municipio_id_municipio, registro_municipio_departamento_id_departamento)
VALUES (1, 1, 1, 1, 1, 1);
INSERT INTO EXAMEN (registro_id_registro, correlativo_id_correlativo, registro_id_escuela, registro_id_centro, registro_municipio_id_municipio, registro_municipio_departamento_id_departamento)
VALUES (2, 2, 1, 2, 2, 1);
INSERT INTO EXAMEN (registro_id_registro, correlativo_id_correlativo, registro_id_escuela, registro_id_centro, registro_municipio_id_municipio, registro_municipio_departamento_id_departamento)
VALUES (3, 3, 2, 1, 3, 1);
INSERT INTO EXAMEN (registro_id_registro, correlativo_id_correlativo, registro_id_escuela, registro_id_centro, registro_municipio_id_municipio, registro_municipio_departamento_id_departamento)
VALUES (4, 4, 3, 3, 4, 3);
INSERT INTO EXAMEN (registro_id_registro, correlativo_id_correlativo, registro_id_escuela, registro_id_centro, registro_municipio_id_municipio, registro_municipio_departamento_id_departamento)
VALUES (5, 5, 2, 2, 5, 2);

-- PREGUNTA
INSERT INTO PREGUNTA (pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta)
VALUES ('¿Cuál es la distancia mínima que debe mantener entre vehículos en carretera?', '2 metros', '3 segundos de distancia', '5 metros', '1 segundo de distancia', 'B');
INSERT INTO PREGUNTA (pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta)
VALUES ('¿Qué significa una señal de alto?', 'Reducir velocidad', 'Detenerse completamente', 'Ceder el paso', 'Continuar con precaución', 'B');
INSERT INTO PREGUNTA (pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta)
VALUES ('¿Cuál es el límite de velocidad en zona escolar?', '20 km/h', '30 km/h', '40 km/h', '50 km/h', 'A');
INSERT INTO PREGUNTA (pregunta_texto, respuesta_a, respuesta_b, respuesta_c, respuesta_d, respuesta_correcta)
VALUES ('¿Qué debe hacer al ver una ambulancia con sirena activada?', 'Mantener velocidad', 'Acelerar para salir del camino', 'Orillarse y detenerse', 'Ignorar la sirena', 'C');

-- PREGUNTA_PRACTICO
INSERT INTO PREGUNTA_PRACTICO (pregunta_texto, punteo) VALUES ('Realizar estacionamiento en paralelo en un espacio de 6 metros', 20);
INSERT INTO PREGUNTA_PRACTICO (pregunta_texto, punteo) VALUES ('Conducir en reversa por 50 metros manteniendo trayectoria recta', 15);
INSERT INTO PREGUNTA_PRACTICO (pregunta_texto, punteo) VALUES ('Maniobra de tres puntos en espacio reducido', 25);
INSERT INTO PREGUNTA_PRACTICO (pregunta_texto, punteo) VALUES ('Conducción en zona urbana respetando señales de tránsito', 30);

-- RESPUESTA_USUARIO
INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta) VALUES (1, 1, 'B');
INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta) VALUES (2, 1, 'B');
INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta) VALUES (3, 2, 'A');
INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta) VALUES (4, 2, 'C');
INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta) VALUES (1, 3, 'B');
INSERT INTO RESPUESTA_USUARIO (pregunta_id_pregunta, examen_id_examen, respuesta) VALUES (2, 3, 'A');

-- RESPUESTA_PRACTICO_USUARIO
INSERT INTO RESPUESTA_PRACTICO_USUARIO (pregunta_practico_id_pregunta_practico, examen_id_examen, nota) VALUES (1, 1, 18);
INSERT INTO RESPUESTA_PRACTICO_USUARIO (pregunta_practico_id_pregunta_practico, examen_id_examen, nota) VALUES (2, 1, 13);
INSERT INTO RESPUESTA_PRACTICO_USUARIO (pregunta_practico_id_pregunta_practico, examen_id_examen, nota) VALUES (3, 2, 22);
INSERT INTO RESPUESTA_PRACTICO_USUARIO (pregunta_practico_id_pregunta_practico, examen_id_examen, nota) VALUES (4, 2, 28);
INSERT INTO RESPUESTA_PRACTICO_USUARIO (pregunta_practico_id_pregunta_practico, examen_id_examen, nota) VALUES (1, 3, 15);

COMMIT;
# VigilApp

**Aplicación web full-stack con backend en Java/Spring Boot, base de datos PostgreSQL y despliegue con Docker.**

[![Java](https://img.shields.io/badge/Java-99%25-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Configuración](#️-configuración)
- [Levantar el Proyecto](#-levantar-el-proyecto)
- [Servicios Disponibles](#-servicios-disponibles)
- [Equipo](#-equipo)

---

## Descripción

**VigilApp** es una aplicación web desarrollada con arquitectura **backend + base de datos**, contenerizada completamente con Docker Compose para facilitar el despliegue en cualquier entorno.

El proyecto incluye:
- **Backend** construido con Java (Spring Boot)
- **Base de datos** PostgreSQL con inicialización automática vía `init.sql`
- **Panel de administración** de base de datos con pgAdmin
- **CI/CD** configurado con GitHub Actions

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Backend | Java · Spring Boot |
| Base de datos | PostgreSQL 15 |
| DB Admin | pgAdmin 4 |
| Contenedores | Docker · Docker Compose |
| CI/CD | GitHub Actions |

---

## Estructura del Proyecto

```
ProyectoWeb/
├── .github/
│   └── workflows/        # Pipelines de CI/CD
├── backend/
│   └── vigilapp/         # Código fuente Spring Boot
│       └── Dockerfile
├── docs/                 # Documentación adicional
├── frontend/             # (Interfaz de usuario)
├── .env.example          # Variables de entorno de ejemplo
├── .gitignore
├── compose.yml           # Configuración Docker Compose
├── init.sql              # Script de inicialización de la DB
└── rebuild.sh            # Script de reconstrucción rápida
```

---

## Requisitos Previos

Asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/)

---

## Configuración

1. **Clona el repositorio:**

```bash
git clone https://github.com/SalomonAvila/ProyectoWeb.git
cd ProyectoWeb
```

2. **Crea tu archivo de variables de entorno** a partir del ejemplo:

```bash
cp .env.example .env
```

3. **Edita el archivo `.env`** con tus valores:

```env
# PostgreSQL
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_contraseña_segura
POSTGRES_DB=vigilapp_db
POSTGRES_PORT=5432

# pgAdmin
PGADMIN_EMAIL=admin@ejemplo.com
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050

# Spring Boot
SPRING_PORT=8080
SPRING_PROFILES_ACTIVE=dev
```

---

## Levantar el Proyecto

**Construir y levantar todos los servicios:**

```bash
docker compose up --build
```

**Levantar en segundo plano:**

```bash
docker compose up --build -d
```

**Reconstruir rápidamente (usando el script incluido):**

```bash
bash rebuild.sh
```

**Detener todos los servicios:**

```bash
docker compose down
```

**Detener y eliminar volúmenes (limpieza total):**

```bash
docker compose down -v
```

---

## Servicios Disponibles

Una vez levantados los contenedores, puedes acceder a:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Backend API | `http://localhost:${SPRING_PORT}` | API REST de Spring Boot |
| pgAdmin | `http://localhost:${PGADMIN_PORT}` | Administrador visual de PostgreSQL |
| PostgreSQL | `localhost:${POSTGRES_PORT}` | Base de datos (acceso directo) |

> Los puertos dependen de los valores definidos en tu archivo `.env`.

---

## Equipo

Desarrollado por:

| Integrante | GitHub |
|-----------|--------|
| Salomon Avila | [@SalomonAvila](https://github.com/SalomonAvila) |
| Gabriel Jaramillo | [@GabrielJaramilloCuberos](https://github.com/GabrielJaramilloCuberos) |
| Valeria Herrera | [@valerrera](https://github.com/valerrera) |
| Ana Maria Romero | [@romerocana](https://github.com/romerocana) |

---

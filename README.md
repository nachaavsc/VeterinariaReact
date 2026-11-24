# Veterinaria San Marcos

Sistema web para la gestión de una clínica veterinaria. El frontend está hecho en React + TypeScript (Vite) y el backend se divide en 6 microservicios Spring Boot que comparten una base de datos MySQL (`veterinaria_db`). La autenticación usa JWT: el microservicio de Usuarios emite el token y el resto lo valida con la misma clave.

## Servicios

| Servicio | Carpeta | Puerto | Swagger UI |
|----------|---------|--------|------------|
| Frontend | `frontend` | 5173 | - |
| Usuarios | `backend/Usuarios` | 8081 | http://localhost:8081/swagger-ui.html |
| Mascotas | `backend/Mascotas` | 8082 | http://localhost:8082/swagger-ui.html |
| Servicios | `backend/Servicios` | 8083 | http://localhost:8083/swagger-ui.html |
| Equipo | `backend/Equipo` | 8084 | http://localhost:8084/swagger-ui.html |
| Mensajería | `backend/Mensajeria` | 8085 | http://localhost:8085/swagger-ui.html |
| Historial | `backend/Historial` | 8086 | http://localhost:8086/swagger-ui.html |

Cada microservicio crea sus tablas al iniciar (`ddl-auto=update`) y carga datos de ejemplo solo si su tabla está vacía, por lo que reiniciar no duplica registros.

## Ejecución local con Laragon

### Requisitos

- Java 17 o superior (cada microservicio incluye Maven Wrapper, no hace falta instalar Maven).
- Node.js 22.12 o superior.
- MySQL en el puerto 3306 con usuario `root` sin contraseña (configuración por defecto de Laragon).

La base `veterinaria_db` no se crea a mano: la crea el primer microservicio que se conecta.

### Pasos

1. Iniciar MySQL desde Laragon.
2. Ejecutar `iniciar-todo.bat` en la raíz del proyecto. Abre una ventana por cada microservicio y otra para el frontend (si falta `node_modules`, instala las dependencias primero).
3. Abrir http://localhost:5173.

Para detener todo se usa `detener-todo.bat`.

Si se prefiere levantar el frontend por separado:

```bash
cd frontend
npm install
npm run dev
```

## Ejecución con Docker

Requiere Docker Desktop. Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto levanta MySQL 8, los 6 microservicios y el frontend servido con Nginx en http://localhost:5173. Los microservicios reciben la conexión a la base por variables de entorno, así que los `application.properties` siguen apuntando a `localhost:3306` para el uso con Laragon.

| Detalle | Valor |
|---------|-------|
| MySQL del contenedor desde el host | `localhost:3307` (para no chocar con Laragon) |
| Contraseña de `root` | `veterinaria`, o la definida en la variable `MYSQL_ROOT_PASSWORD` |
| Borrar los datos y partir de cero | `docker compose down -v` |

## Credenciales de prueba

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Administrador | `admin@sanmarcos.cl` | `1234` |
| Cliente | `tengosueno@gmail.com` | `1234` |

El administrador tiene acceso al panel de administración (mascotas, mensajes, servicios y equipo) y puede registrar atenciones en el historial. El cliente puede registrar mascotas y ver el directorio. También se pueden crear cuentas nuevas desde la opción "Registrarse", que quedan con rol de cliente.

## Tests

Frontend (Vitest + Testing Library):

```bash
cd frontend
npm test
```

Backend, dentro de la carpeta de cada microservicio:

```bash
mvn test
```

En Windows sin Maven instalado se usa el wrapper: `mvnw.cmd test`. El test `contextLoads` de cada microservicio levanta la aplicación completa, por lo que necesita MySQL encendido.

## Estructura

```
backend/
  Usuarios/      registro, login y emisión de JWT
  Mascotas/      CRUD de mascotas
  Servicios/     catálogo de servicios y precios
  Equipo/        veterinarios del equipo médico
  Mensajeria/    mensajes del formulario de contacto
  Historial/     atenciones clínicas por mascota
frontend/
  src/
    components/  átomos, moléculas y organismos (atomic design)
    pages/       vistas de cada ruta
    services/    cliente HTTP y acceso a cada microservicio
    hooks/       carga de datos y manejo de acciones
    context/     sesión y autenticación
```

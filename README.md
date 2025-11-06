# hierarchical-organization

## Para correr el proyecto
1. Descargar el repositorio
2. Instalar dependencias tanto en la carpera `backend` como en la carpeta `frontend` con `npm install`
3. Crear una base de datos
4. Crear un archivo .env dentro de backend, copiando la información de `.env.example`. La variable `JWT_SECRET` puede ser cualquier string válido, tal como en el archivo de ejemplo
5. Ejecutar los siguientes comandos:
- `npm run migration:generate`
- `npm run migration:run`
- `npm run seed`
O en su defecto: `npm run prepare-db`, que agrupa los comandos anteriores (este no lo probé en su momento, pero debería funcionar igual)

## Ejecutando el proyecto
Estas son las credenciales de prueba para iniciar sesión como el usuario administrador, sólo está disponible el módulo de los niveles de la organización:
admin@admin.com,
123456
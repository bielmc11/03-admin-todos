# Development
Pasos para levantar la app en desarrollo:

1. Levantar la base de datos

```
docker-compose up -d
```

2. Renombrar el archivo .env.template a .env
3. Remplazar las variables de entorno en el archivo .env
4. Ejecutar ```npm insatll```
5. Ejecutar ```npm run dev```
6. Ejecutar los siguientes comandos de primsa:
```
    npx prisma migrate dev
    npx primsa generate
```
7. Ejecutar el seed [para crear la BD](localhost:3000/api/seed) (locahost:3000/api/seed)

## Nota: Usuario por defecto
__usuario__: usuraio@gmail.com
__password__: 123456

# Prisma comands

```
    npx prisma init
    npx prisma migrate dev
    npx primsa generate
```

Si ya has ejecutado `npx prisma migrate dev` y quieres cambiar la BD debes ejecutar `npx prisma migrate reset`

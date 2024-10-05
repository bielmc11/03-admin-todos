# Development
Pasos para levantar la app en desarrollo:

1. Levantar la base de datos

```
docker-compose up -d
```

2. Renombrar el archivo .env.template a .env
3. Remplazar las variables de entorno en el archivo .env

# Prisma comands

```
    npx prisma init
    npx prisma migrate dev
    npx primsa generate
```

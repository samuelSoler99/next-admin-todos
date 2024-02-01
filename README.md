# Descripcion
Aplicacion RESTful api con next 14 (Postgres, Prisma, Docker, Typescript)

# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
``` 
docker compose up -d
```

2. Renombrar el .env.template a .env 
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate

```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota:
__usuario:__ test1@gmail.com
__password:__ 123456

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate

```

# Explicaciones

la pagina rest TODOS no es funcional, fue parte del curso pero transiciono a lo que es la pagina server actions (debido a que utilizan los mismos componentes, estaria bien crear unos componentes individuales para cada una)

la pagina Server Actions usa un sleep en el toggle, para asi dar sentido y comprobar la funcionalidad de usar el hook useOptimistic

# Enlaces de docs
 validacion para api https://www.npmjs.com/package/yup
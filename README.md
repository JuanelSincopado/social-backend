# README

Este proyecto utiliza Node.js, Mongoose y Express.

## Requisitos

Asegúrate de tener instalado Node.js en tu máquina.

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las siguientes variables de entorno:

- `MONGO_URI`: La URL de conexión a la base de datos MongoDB.
- `SIGN_JWT`: La firma secreta de los jwt.

> [!NOTE]
> la firma del JWT es "secret". Siempre manejo las firmas de forma privada en los archivos .env pero por motivos de la prueba lo hago público.

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando:

```
npm run dev

```

> [!NOTE]
> Por falta de tiempo la aplicación tendrá bugs y errores. Me enfoqué en la funcionalidad y poco a poco refactorizar.

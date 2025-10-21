# Proyecto Final Backend 2

## Descripción

Este proyecto corresponde al curso de **Diseño y Arquitectura Backend 2** de Coderhouse. Se trata de una API RESTful desarrollada con **Node.js** y **Express**, diseñada para gestionar usuarios, productos y órdenes en un sistema de comercio electrónico.

## Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript.
* **Express**: Framework minimalista para aplicaciones web.
* **MongoDB**: Base de datos NoSQL.
* **Mongoose**: ODM para MongoDB.
* **JWT**: Autenticación basada en tokens.
* **bcryptjs**: Encriptación de contraseñas.

## Estructura del Proyecto

```plaintext
src/
├── controllers/
│   ├── authController.js
│   ├── orderController.js
│   └── productController.js
├── models/
│   ├── userModel.js
│   ├── orderModel.js
│   └── productModel.js
├── routes/
│   ├── cart.router.js
│   ├── custom.router.js
│   ├── index.router.js
│   ├── product.router.js
│   └── user-router.js
├── middlewares/
    ├── verifyTokenPass.js
│   └── cehckRoles.js
└── utils/
    ├── custom-error.js
    ├── mailer.js
    ├── random-string.js
    ├── user-bcrypt-utils.js
    └── user.jwt.js
```

* **controllers/**: Contiene la lógica de negocio para cada recurso.
* **models/**: Define los esquemas y modelos de datos.
* **routes/**: Define las rutas y los controladores asociados.
* **middlewares/**: Funciones intermedias para procesar las solicitudes.
* **utils/**: Funciones auxiliares y utilitarias.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/julio-urquiza/Proyecto-Final-BackEnd-2.git
   cd Proyecto-Final-BackEnd-2
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

4. Configura las variables de entorno en el archivo `.env`.

5. Inicia el servidor:

   ```bash
   npm start
   ```

El servidor estará corriendo en `http://localhost:3000`.

## Endpoints Principales

### Autenticación

* **POST** `/api/auth/register`: Registra un nuevo usuario.
* **POST** `/api/auth/login`: Inicia sesión y obtiene un token JWT.

### Productos

* **GET** `/api/products`: Obtiene todos los productos.
* **GET** `/api/products/:id`: Obtiene un producto por su ID.
* **POST** `/api/products`: Crea un nuevo producto.
* **PUT** `/api/products/:id`: Actualiza un producto existente.
* **DELETE** `/api/products/:id`: Elimina un producto.

### Órdenes

* **GET** `/api/orders`: Obtiene todas las órdenes.
* **GET** `/api/orders/:id`: Obtiene una orden por su ID.
* **POST** `/api/orders`: Crea una nueva orden.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

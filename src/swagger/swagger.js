import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Products API",
            version: "1.0.0",
            description: "This project corresponds to the course of **Design and Architecture Backend 2** from Coderhouse. It is a RESTful API developed with **Node.js** and **Express**, designed to manage users, products, and orders in an e-commerce system.",
        }
    },
    apis: ['./src/swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;

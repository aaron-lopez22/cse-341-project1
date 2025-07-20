const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'User Api',
    description: 'User Api'
    },
    host: "localhost:3000",
    schemes: ["http", 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);




